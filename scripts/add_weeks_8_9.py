import json

with open("src/data/courseData.json", "r", encoding="utf-8") as f:
    data = json.load(f)

week_8_9_questions = [
    # --- WEEK 8 ---
    {
      "id": "w8_q1",
      "week": 8,
      "assignment": "Week 8: Assignment 8",
      "question": "When was the Land Acquisition Act (LAA) amended?",
      "options": [
        "1970",
        "1980",
        "1984",
        "1986"
      ],
      "correctAnswer": 2,
      "explanation": "The colonial Land Acquisition Act of 1894 underwent major comprehensive amendments in 1984 to streamline compensation timelines and acquisition procedures.",
      "type": "mcq",
      "marks": 1
    },
    {
      "id": "w8_q2",
      "week": 8,
      "assignment": "Week 8: Assignment 8",
      "question": "When was the Coal Bearing Areas (Acquisition and Development) Act passed in India?",
      "options": [
        "1950",
        "1957",
        "1960",
        "1965"
      ],
      "correctAnswer": 1,
      "explanation": "The Coal Bearing Areas (Acquisition and Development) Act was passed in India in 1957 to establish state control and acquisition over coal-bearing lands.",
      "type": "mcq",
      "marks": 1
    },
    {
      "id": "w8_q3",
      "week": 8,
      "assignment": "Week 8: Assignment 8",
      "question": "What is the main issue at stake regarding the construction of large dams?",
      "options": [
        "Resettlement and rehabilitation",
        "Migration and resettlement",
        "Rehabilitation and reconstruction",
        "None of these"
      ],
      "correctAnswer": 0,
      "explanation": "The central socioeconomic and human rights dispute surrounding mega-dams (such as Sardar Sarovar and Tehri) is the Resettlement and Rehabilitation (R&R) of displaced river valley communities.",
      "type": "mcq",
      "marks": 1
    },
    {
      "id": "w8_q4",
      "week": 8,
      "assignment": "Week 8: Assignment 8",
      "question": "What is the primary concern surrounding the construction of huge dams?",
      "options": [
        "Migration and resettlement",
        "Rehabilitation and reconstruction",
        "Resettlement and rehabilitation",
        "All of these"
      ],
      "correctAnswer": 2,
      "explanation": "Resettlement and rehabilitation (R&R) remains the primary critical concern due to inadequate compensation, loss of common property resources, and social uprooting.",
      "type": "mcq",
      "marks": 1
    },
    {
      "id": "w8_q5",
      "week": 8,
      "assignment": "Week 8: Assignment 8",
      "question": "Who is the author of the book The Greater Common Good?",
      "options": [
        "A.P.J. Abdul Kalam",
        "Arundhati Roy",
        "Pt. Jawaharlal Nehru",
        "Vandana Shiva"
      ],
      "correctAnswer": 1,
      "explanation": "Renowned writer and activist Arundhati Roy authored 'The Greater Common Good' in 1999, powerfully critiquing the Sardar Sarovar Dam and the human cost of big dams in India.",
      "type": "mcq",
      "marks": 1
    },
    {
      "id": "w8_q6",
      "week": 8,
      "assignment": "Week 8: Assignment 8",
      "question": "Who among the following argued that “the general good of all humankind could be pursued by the attainment of knowledge that is useful in life so as to make ourselves the masters and possessors of nature”?",
      "options": [
        "Rene Descartes",
        "Michel Foucault",
        "Simone de Beauvoir",
        "Karl Marx"
      ],
      "correctAnswer": 0,
      "explanation": "French philosopher René Descartes famously wrote in 'Discourse on the Method' (1637) that practical science could make humans the 'masters and possessors of nature' (maîtres et possesseurs de la nature).",
      "type": "mcq",
      "marks": 1
    },
    {
      "id": "w8_q7",
      "week": 8,
      "assignment": "Week 8: Assignment 8",
      "question": "When was the Mapithel dam project approved?",
      "options": [
        "1980",
        "1985",
        "1990",
        "2000"
      ],
      "correctAnswer": 0,
      "explanation": "The Mapithel Dam (Thoubal Multipurpose Project) in Manipur was approved by the Planning Commission in 1980.",
      "type": "mcq",
      "marks": 1
    },
    {
      "id": "w8_q8",
      "week": 8,
      "assignment": "Week 8: Assignment 8",
      "question": "What effects does resettlement have on indigenous people?",
      "options": [
        "Loss of access to common resources",
        "Loss of civil and human rights",
        "Both ‘loss of access to common resources’ and ‘loss of civil and human rights’",
        "Profit in terms of land"
      ],
      "correctAnswer": 2,
      "explanation": "Involuntary resettlement of indigenous communities leads to both severe loss of access to customary common property resources (CPR) and systemic violations of civil and human rights.",
      "type": "mcq",
      "marks": 1
    },
    {
      "id": "w8_q9",
      "week": 8,
      "assignment": "Week 8: Assignment 8",
      "question": "When was the MoU regarding the setting up of Alumina complex signed by SIIL and Government of Orissa?",
      "options": [
        "1998",
        "2000",
        "2003",
        "2005"
      ],
      "correctAnswer": 2,
      "explanation": "The Memorandum of Understanding (MoU) for the Alumina complex in Lanjigarh/Niyamgiri was signed in 2003.",
      "type": "mcq",
      "marks": 1
    },
    {
      "id": "w8_q10",
      "week": 8,
      "assignment": "Week 8: Assignment 8",
      "question": "Mining-induced displacement and resettlement is primarily _________ issue.",
      "options": [
        "Psychological",
        "Social",
        "Human rights",
        "Economic"
      ],
      "correctAnswer": 3,
      "explanation": "While mining displacement has multifaceted dimensions, development economists and policy analysts primarily categorize it as an economic issue tied to livelihood, compensation, and resource extraction.",
      "type": "mcq",
      "marks": 1
    },

    # --- WEEK 9 ---
    {
      "id": "w9_q1",
      "week": 9,
      "assignment": "Week 9: Assignment 9",
      "question": "What does gender equality refers to?",
      "options": [
        "Equal opportunities and special outcomes for women",
        "Equal opportunities and special outcomes for men",
        "Equal opportunities and special outcomes for the family",
        "Equal opportunities and outcomes for both women and men"
      ],
      "correctAnswer": 3,
      "explanation": "Gender equality means that women and men enjoy equal rights, opportunities, resources, voice, and substantive outcomes across all spheres of life.",
      "type": "mcq",
      "marks": 1
    },
    {
      "id": "w9_q2",
      "week": 9,
      "assignment": "Week 9: Assignment 9",
      "question": "What does the term ‘feminism’ mean?",
      "options": [
        "Symbolizing collective identity of men sharing similar experiences of oppression",
        "Symbolizing collective identity of women sharing similar experiences of oppression",
        "Symbolizing collective identity of women suppressed by men",
        "Symbolizing collective identity of men suppressed by women experiences of oppression."
      ],
      "correctAnswer": 1,
      "explanation": "In sociological development theory, feminism symbolizes the collective identity and solidarity of women sharing structural experiences of gender-based subordination and oppression.",
      "type": "mcq",
      "marks": 1
    },
    {
      "id": "w9_q3",
      "week": 9,
      "assignment": "Week 9: Assignment 9",
      "question": "What does the WID (Women in development) work plan of UN bodies sought to?",
      "options": [
        "Make ‘men’ invisible from workforce",
        "Make ‘men’ and ‘women’ both invisible from workforce",
        "Make ‘women’ visible from being invisible workforce",
        "Make ‘women’ being out of the workforce"
      ],
      "correctAnswer": 2,
      "explanation": "The Women in Development (WID) framework, pioneered in the 1970s, aimed explicitly to make women visible from being an uncounted and invisible workforce in national accounts and development projects.",
      "type": "mcq",
      "marks": 1
    },
    {
      "id": "w9_q4",
      "week": 9,
      "assignment": "Week 9: Assignment 9",
      "question": "The central goal of all the Sustainable Development Goals (SDGs) is _____________.",
      "options": [
        "Community development",
        "Development of women",
        "Gender equality",
        "All of these"
      ],
      "correctAnswer": 2,
      "explanation": "In UN sustainability policy, Gender Equality (SDG 5) is recognized as a vital foundational accelerator and cross-cutting central prerequisite across all Sustainable Development Goals.",
      "type": "mcq",
      "marks": 1
    },
    {
      "id": "w9_q5",
      "week": 9,
      "assignment": "Week 9: Assignment 9",
      "question": "What does the GED (Gender, Environment, and Development) approach talk about?",
      "options": [
        "Gender and women development",
        "Gender and environment",
        "Overall development of the community",
        "Social construction of gender and the assignment of specific roles to women and men"
      ],
      "correctAnswer": 3,
      "explanation": "The GED (Gender, Environment, and Development) perspective examines how gender is socially constructed and how differential division of labor and power relations mediate human-environment interactions.",
      "type": "mcq",
      "marks": 1
    },
    {
      "id": "w9_q6",
      "week": 9,
      "assignment": "Week 9: Assignment 9",
      "question": "What does the 1992 Rio Declaration on Environment and Development, stress on?",
      "options": [
        "Women’s role in community management",
        "Men’s role in community management",
        "Women’s role in environmental management and development to achieve sustainable development",
        "Men and women role in family planning"
      ],
      "correctAnswer": 2,
      "explanation": "Principle 20 of the 1992 Rio Declaration explicitly declares: 'Women have a vital role in environmental management and development. Their full participation is therefore essential to achieve sustainable development.'",
      "type": "mcq",
      "marks": 1
    },
    {
      "id": "w9_q7",
      "week": 9,
      "assignment": "Week 9: Assignment 9",
      "question": "Which approach acknowledges women’s productive as well as reproductive roles?",
      "options": [
        "Welfare approach",
        "Development approach",
        "Gender approach",
        "Equity approach"
      ],
      "correctAnswer": 3,
      "explanation": "The Equity Approach (introduced during the 1976–1985 UN Decade for Women) recognized women's dual active participation: both productive economic work and unpaid social reproduction.",
      "type": "mcq",
      "marks": 1
    },
    {
      "id": "w9_q8",
      "week": 9,
      "assignment": "Week 9: Assignment 9",
      "question": "What questions are tackled by Gendered Approach to Development (GAD)?",
      "options": [
        "Equalities in power sharing",
        "Equal sharing of household works",
        "Equal economic independence",
        "Inequalities in power"
      ],
      "correctAnswer": 3,
      "explanation": "Unlike WID which focused solely on women's integration, the Gender and Development (GAD) approach directly interrogates structural inequalities in power between men and women.",
      "type": "mcq",
      "marks": 1
    },
    {
      "id": "w9_q9",
      "week": 9,
      "assignment": "Week 9: Assignment 9",
      "question": "Which approach is an extension from ‘welfare’ to ‘development’ to ‘empowerment’?",
      "options": [
        "Development approach",
        "Welfare approach",
        "State and welfare approach",
        "Feminist approach"
      ],
      "correctAnswer": 1,
      "explanation": "In Caroline Moser's development planning taxonomy, the historical evolution of policy approaches moved sequentially starting as an extension from the residual Welfare approach through antipoverty/efficiency and culminating in Empowerment.",
      "type": "mcq",
      "marks": 1
    },
    {
      "id": "w9_q10",
      "week": 9,
      "assignment": "Week 9: Assignment 9",
      "question": "Who argued that “the process of economic modernization, marginalized women economically and socially and increased their dependence on men”?",
      "options": [
        "Ester Boserup",
        "Georgina Waylen",
        "Caroline Moser",
        "Fred Rogers"
      ],
      "correctAnswer": 0,
      "explanation": "Danish economist Ester Boserup in her groundbreaking 1970 work 'Woman's Role in Economic Development' demonstrated that colonial and modernization policies marginalized women's traditional farming and intensified male dominance.",
      "type": "mcq",
      "marks": 1
    }
]

# Append week 8 and 9 questions
existing_weeks = set(q["id"] for q in data["questions"])
added_count = 0
for q in week_8_9_questions:
    if q["id"] not in existing_weeks:
        data["questions"].append(q)
        added_count += 1

with open("src/data/courseData.json", "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print(f"Added {added_count} questions. Total questions now: {len(data['questions'])}")
