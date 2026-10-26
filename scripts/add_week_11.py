import json

with open("src/data/courseData.json", "r", encoding="utf-8") as f:
    data = json.load(f)

week_11_questions = [
    {
      "id": "w11_q1",
      "week": 11,
      "assignment": "Week 11: Assignment 11",
      "question": "What advantage/s do indigenous knowledge offer?",
      "options": [
        "Cost-effective",
        "Participatory and sustainable development process",
        "Promotes community engagement",
        "All of these"
      ],
      "correctAnswer": 3,
      "explanation": "Indigenous knowledge systems offer multiple advantages: they are low-cost, rooted in local biocultural realities, highly participatory, sustainable, and promote local community empowerment.",
      "type": "mcq",
      "marks": 1
    },
    {
      "id": "w11_q2",
      "week": 11,
      "assignment": "Week 11: Assignment 11",
      "question": "Which of the following attributes of ‘formal knowledge’ systems is a disadvantage?",
      "options": [
        "Arises from biophysical understanding of ecosystem dynamicity both in space and time",
        "Deficient in addressing resilience and adaptive capacity of socioecological systems",
        "Structural and functional attributes of ecosystem have been well studied and elaborated",
        "Addresses a whole range of ecosystem management-related issues"
      ],
      "correctAnswer": 1,
      "explanation": "A major critique of top-down formal technocratic knowledge is that it is often compartmentalized and deficient in addressing the dynamic resilience and adaptive capacity of linked socio-ecological systems.",
      "type": "mcq",
      "marks": 1
    },
    {
      "id": "w11_q3",
      "week": 11,
      "assignment": "Week 11: Assignment 11",
      "question": "Which of the following is not an example of traditional management systems?",
      "options": [
        "Construction of dams and embankments",
        "Balance in utilization and regeneration of the natural resource base",
        "Equity and social integrity to achieve the ultimate goal of sustainable livelihood",
        "All of these"
      ],
      "correctAnswer": 0,
      "explanation": "Large-scale construction of concrete dams and embankments is a modern engineering intervention, not a traditional community-based ecological management system.",
      "type": "mcq",
      "marks": 1
    },
    {
      "id": "w11_q4",
      "week": 11,
      "assignment": "Week 11: Assignment 11",
      "question": "Kuki tribal religious beliefs and practices use are influenced by their ________.",
      "options": [
        "Natural environment",
        "Social milieu",
        "Psychological space",
        "Political institution"
      ],
      "correctAnswer": 0,
      "explanation": "Indigenous Kuki cosmological rituals, agricultural ceremonies, and taboos are directly shaped and influenced by their immediate natural forest environment in Northeast India.",
      "type": "mcq",
      "marks": 1
    },
    {
      "id": "w11_q5",
      "week": 11,
      "assignment": "Week 11: Assignment 11",
      "question": "What do the sacred groves represent?",
      "options": [
        "Modern means of biodiversity",
        "Natural vegetation dedicated by local communities to ancestral spirit or deities",
        "Natural vegetation dedicated by local communities to the industries",
        "All of these"
      ],
      "correctAnswer": 1,
      "explanation": "Sacred groves are patches of communal climax forest vegetation protected by local indigenous communities through traditional religious taboos and dedicated to ancestral spirits or deities.",
      "type": "mcq",
      "marks": 1
    },
    {
      "id": "w11_q6",
      "week": 11,
      "assignment": "Week 11: Assignment 11",
      "question": "What distinguishes ‘formal knowledge’ from ‘traditional ecological knowledge’?",
      "options": [
        "Formal knowledge is based on experiential process, while traditional ecological knowledge is textbook-based",
        "Both formal knowledge and traditional ecological knowledge are based on experiences",
        "Formal knowledge is based on textbooks, while the traditional ecological knowledge derived through an experiential process",
        "Both formal knowledge and traditional knowledge are textbook-based"
      ],
      "correctAnswer": 2,
      "explanation": "Formal scientific knowledge is codified, institutionalized, and textbook-based, whereas Traditional Ecological Knowledge (TEK) is intergenerationally transmitted through hands-on experiential processes.",
      "type": "mcq",
      "marks": 1
    },
    {
      "id": "w11_q7",
      "week": 11,
      "assignment": "Week 11: Assignment 11",
      "question": "What do traditional practices and beliefs suggest?",
      "options": [
        "Symbiotic relationship of humans and nature",
        "Social relationship of humans and nature",
        "Scientific relationship of humans and nature",
        "Economical relationship of humans and nature"
      ],
      "correctAnswer": 0,
      "explanation": "Traditional tribal knowledge and belief systems emphasize a mutually beneficial, reciprocal, and symbiotic relationship between humans and the natural environment.",
      "type": "mcq",
      "marks": 1
    },
    {
      "id": "w11_q8",
      "week": 11,
      "assignment": "Week 11: Assignment 11",
      "question": "Which among the following practice/s of the indigenous Kuki people serve as a valuable tool in conserving biodiversity?",
      "options": [
        "Their ecological knowledge",
        "Pre-Christian ancestral worship",
        "Animism",
        "All of these"
      ],
      "correctAnswer": 3,
      "explanation": "Kuki biodiversity conservation is sustained collectively through indigenous ethno-botanical knowledge, ancestral worship revering nature, and animistic traditions forbidding resource over-extraction.",
      "type": "mcq",
      "marks": 1
    },
    {
      "id": "w11_q9",
      "week": 11,
      "assignment": "Week 11: Assignment 11",
      "question": "What distinguishes ‘traditional ecological knowledge’ from ‘formal knowledge’?",
      "options": [
        "Formal knowledge is based on experiential process while TEK is textbook-based",
        "Both formal and traditional ecological knowledge are based on experiences",
        "Formal knowledge is based on textbooks, while the traditional ecological knowledge (TEK) derived through an experiential process",
        "Both formal and traditional knowledge are textbook-based"
      ],
      "correctAnswer": 2,
      "explanation": "Formal knowledge relies on academic codification and textbook instruction, whereas TEK is grounded in oral transmission and direct living experience with local ecosystems.",
      "type": "mcq",
      "marks": 1
    },
    {
      "id": "w11_q10",
      "week": 11,
      "assignment": "Week 11: Assignment 11",
      "question": "What plays a significant role in promoting sustainable utilization and conservation of flora and fauna in the hills?",
      "options": [
        "The sacredness related to forests",
        "The religious beliefs and taboos of the local communities",
        "Both ‘The sacredness related to forests’ and ‘The religious beliefs and taboos of the local communities’",
        "None of these"
      ],
      "correctAnswer": 2,
      "explanation": "In hilly tribal regions, community conservation succeeds through both customary sacred forest institutions and cultural taboos that regulate seasonal harvesting of plants and animals.",
      "type": "mcq",
      "marks": 1
    }
]

existing_ids = set(q["id"] for q in data["questions"])
for q in week_11_questions:
    if q["id"] not in existing_ids:
        data["questions"].append(q)

# Sort all questions by week, then by id number
def sort_key(q):
    wk = q.get("week", 1)
    q_id = q.get("id", "")
    try:
        num = int(q_id.split("_q")[-1])
    except Exception:
        num = 0
    return (wk, num)

data["questions"].sort(key=sort_key)
data["courseInfo"]["totalWeeks"] = 12

with open("src/data/courseData.json", "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print(f"COMPLETE! All 12 weeks loaded. Total questions in database: {len(data['questions'])}")
