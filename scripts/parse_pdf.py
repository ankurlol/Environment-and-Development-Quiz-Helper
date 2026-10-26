import os
import sys
import re
import json
from pypdf import PdfReader

def extract_text_from_pdf(pdf_path):
    reader = PdfReader(pdf_path)
    full_text = []
    for idx, page in enumerate(reader.pages):
        text = page.extract_text() or ""
        full_text.append(text)
    return "\n".join(full_text)

def parse_nptel_text(text, default_week=1, filename=""):
    # Attempt to detect week number from filename or text
    week = default_week
    week_match = re.search(r'(?:week|assignment|asst)[-_ ]*(\d+)', filename, re.IGNORECASE)
    if not week_match:
        week_match = re.search(r'(?:week|assignment)[-_ ]*(\d+)', text, re.IGNORECASE)
    if week_match:
        try:
            week = int(week_match.group(1))
        except ValueError:
            pass

    # Normalize line breaks and remove weird spacing
    clean_text = text.replace('\r\n', '\n').replace('\r', '\n')
    
    # Split text by questions (e.g., "1.", "1)", "Q1.", "Question 1", etc.)
    # Look for question boundaries
    pattern = r'(?=(?:^|\n)\s*(?:Q(?:uestion)?\.?\s*\d+|\d+[\.\)])\s+)'
    raw_blocks = re.split(pattern, clean_text, flags=re.MULTILINE)
    
    questions = []
    
    for block in raw_blocks:
        block = block.strip()
        if not block:
            continue
        
        # Check if block looks like a question
        q_header = re.match(r'^(?:Q(?:uestion)?\.?\s*(\d+)|\b(\d+)[\.\)])\s*(.+)', block, re.DOTALL)
        if not q_header:
            continue
            
        q_num = q_header.group(1) or q_header.group(2)
        content = q_header.group(3).strip()
        
        # Look for options (a) / a. / A) / A.
        # Split options
        opt_pattern = r'(?=(?:^|\n)\s*(?:[\(\[]?[a-dA-D][\)\].]\s+))'
        parts = re.split(opt_pattern, content)
        
        question_text = parts[0].strip()
        
        # Clean question text from trailing labels or metadata
        question_text = re.sub(r'\s*\b(?:1 point|2 points|Marks?:\s*\d+)\s*$', '', question_text, flags=re.IGNORECASE)
        
        options = []
        answer_idx = 0
        explanation = ""
        
        # Check for accepted answer pattern inside block
        # Pattern like: Accepted Answers:\na) ... or Correct Answer: b or Answer: C
        ans_match = re.search(r'(?:Correct\s*Answer|Accepted\s*Answers?|Answer|Ans)\s*[:\-]?\s*([a-dA-D0-9,\s]+)', block, re.IGNORECASE)
        if ans_match:
            ans_str = ans_match.group(1).strip()
            # extract first letter a-d
            letter_match = re.search(r'([a-dA-D])', ans_str)
            if letter_match:
                answer_idx = ord(letter_match.group(1).lower()) - ord('a')
        
        # Check for explanation
        exp_match = re.search(r'(?:Explanation|Detailed\s*Solution|Solution)\s*[:\-]?\s*(.+)', block, re.IGNORECASE | re.DOTALL)
        if exp_match:
            explanation = exp_match.group(1).strip()
            # Trim from explanation any following question or footer
            explanation = re.split(r'\n\s*(?:Q\d+|\d+[\.\)])', explanation)[0].strip()
        
        # Process option parts
        for part in parts[1:]:
            part = part.strip()
            if not part:
                continue
            # Remove option letter prefix like "a)" or "A." or "(a)"
            clean_opt = re.sub(r'^[\(\[]?[a-dA-D][\)\].]\s*', '', part).strip()
            # Clean answer or explanation trailers from option if present
            clean_opt = re.split(r'\n\s*(?:Correct\s*Answer|Accepted\s*Answers?|Answer|Ans|Explanation)\s*[:\-]', clean_opt, flags=re.IGNORECASE)[0].strip()
            if clean_opt:
                options.append(clean_opt)
        
        # If options are found
        if len(options) >= 2:
            questions.append({
                "id": f"w{week}_q{len(questions)+1}",
                "week": week,
                "assignment": f"Assignment {week} (Week {week})",
                "question": question_text,
                "options": options,
                "correctAnswer": min(answer_idx, len(options) - 1),
                "explanation": explanation or "NPTEL Verified Assignment Answer",
                "type": "mcq",
                "marks": 1
            })
            
    return questions, week

def process_all_pdfs(search_dir=".", output_json="src/data/courseData.json"):
    pdf_files = [f for f in os.listdir(search_dir) if f.lower().endswith('.pdf')]
    if not pdf_files:
        print(f"No PDF files found in {search_dir}")
        return
        
    print(f"Found {len(pdf_files)} PDF file(s): {pdf_files}")
    
    # Load existing course data if available
    course_info = {
        "title": "NPTEL Online Certification Course",
        "courseName": "NPTEL Certification Course",
        "courseCode": "NPTEL-EXAM",
        "instructor": "NPTEL / Swayam",
        "totalWeeks": 12,
        "description": "Comprehensive week-wise assignment practice and grand full-length mock exam simulator."
    }
    
    existing_questions = []
    if os.path.exists(output_json):
        try:
            with open(output_json, 'r', encoding='utf-8') as f:
                data = json.load(f)
                course_info = data.get("courseInfo", course_info)
                # optionally keep or replace
        except Exception as e:
            print(f"Notice: {e}")

    all_parsed_questions = []
    max_week = 1
    
    for idx, pdf_name in enumerate(sorted(pdf_files), start=1):
        full_path = os.path.join(search_dir, pdf_name)
        print(f"Parsing: {pdf_name}...")
        try:
            text = extract_text_from_pdf(full_path)
            q_list, wk = parse_nptel_text(text, default_week=idx, filename=pdf_name)
            print(f"  Extracted {len(q_list)} question(s) for Week {wk}")
            all_parsed_questions.extend(q_list)
            if wk > max_week:
                max_week = wk
        except Exception as e:
            print(f"Error parsing {pdf_name}: {e}")
            
    if all_parsed_questions:
        course_info["totalWeeks"] = max(max_week, course_info.get("totalWeeks", 12))
        final_data = {
            "courseInfo": course_info,
            "questions": all_parsed_questions
        }
        with open(output_json, 'w', encoding='utf-8') as f:
            json.dump(final_data, f, indent=2, ensure_ascii=False)
        print(f"\nSuccessfully wrote {len(all_parsed_questions)} questions to {output_json}")
    else:
        print("Could not extract structured questions. Please verify PDF layout.")

if __name__ == "__main__":
    target_dir = sys.argv[1] if len(sys.argv) > 1 else "."
    process_all_pdfs(target_dir)
