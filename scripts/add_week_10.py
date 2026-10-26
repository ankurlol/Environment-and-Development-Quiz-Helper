import json

with open("src/data/courseData.json", "r", encoding="utf-8") as f:
    data = json.load(f)

week_10_questions = [
    {
      "id": "w10_q1",
      "week": 10,
      "assignment": "Week 10: Assignment 10",
      "question": "What is the definition of climate change as per the Working Group II of the Intergovernmental Panel on Climate Change (IPCC)?",
      "options": [
        "It refers to any change in the climate over time to natural variability",
        "It refers to any change in the climate over time as a result of human activity",
        "It refers to any change in the climate over time, whether due to natural variability or as a result of human activity",
        "None of these"
      ],
      "correctAnswer": 2,
      "explanation": "IPCC Working Group II defines climate change as any change in climate over time, whether due to natural variability or as a result of anthropogenic activity.",
      "type": "mcq",
      "marks": 1
    },
    {
      "id": "w10_q2",
      "week": 10,
      "assignment": "Week 10: Assignment 10",
      "question": "Which of the following statement/s best characterizes global climate change?",
      "options": [
        "It is the identifiable change in the climate of earth as a whole that lasts for an extended period of time",
        "Due to natural process, it is usually referred to as global climate variability",
        "It refers to changes forced by human activities that change the atmosphere",
        "All of these"
      ],
      "correctAnswer": 3,
      "explanation": "Global climate change encompasses multi-decadal identifiable planetary changes, natural background climate variability, and anthropogenic forcing altering atmospheric composition.",
      "type": "mcq",
      "marks": 1
    },
    {
      "id": "w10_q3",
      "week": 10,
      "assignment": "Week 10: Assignment 10",
      "question": "Which of the following process leads to cooling of the earth?",
      "options": [
        "When incoming energy from the sun is absorbed by the earth",
        "When the sun's energy is reflected back into space",
        "When absorbed energy is released back into space",
        "None of these"
      ],
      "correctAnswer": 2,
      "explanation": "The earth cools down when thermal energy absorbed by the surface and atmosphere is re-radiated and released back out into space as longwave infrared radiation.",
      "type": "mcq",
      "marks": 1
    },
    {
      "id": "w10_q4",
      "week": 10,
      "assignment": "Week 10: Assignment 10",
      "question": "What was agreed at the First Conference of the Parties (COP 1)?",
      "options": [
        "To negotiate emission reduction targets for SARC countries",
        "To negotiate emission reduction targets for G77 countries",
        "To negotiate emission reduction targets for BASIC countries",
        "To negotiate emission reduction targets for industrialized countries"
      ],
      "correctAnswer": 3,
      "explanation": "At COP 1 (1995 in Berlin), parties agreed upon the 'Berlin Mandate', deciding to negotiate legally binding quantified emission limitation and reduction objectives specifically for developed/industrialized countries (Annex I).",
      "type": "mcq",
      "marks": 1
    },
    {
      "id": "w10_q5",
      "week": 10,
      "assignment": "Week 10: Assignment 10",
      "question": "The earth's temperature depends on _________.",
      "options": [
        "Incoming energy from the sun",
        "Released energy from the earth",
        "The balance between energy entering and leaving the planet's system",
        "All of these"
      ],
      "correctAnswer": 2,
      "explanation": "Fundamental planetary thermodynamics dictates that the earth's global mean equilibrium temperature depends on the radiative balance between incoming solar radiation and outgoing terrestrial infrared energy.",
      "type": "mcq",
      "marks": 1
    },
    {
      "id": "w10_q6",
      "week": 10,
      "assignment": "Week 10: Assignment 10",
      "question": "Which of the following national plan/mission focused on sustainable agriculture?",
      "options": [
        "National Mission on Sustainable Habitats",
        "National Mission for Sustainable Agriculture",
        "National Mission for Sustaining the Himalayan Ecosystem",
        "None of these"
      ],
      "correctAnswer": 1,
      "explanation": "Under India's National Action Plan on Climate Change (NAPCC), the National Mission for Sustainable Agriculture (NMSA) was established to enhance agricultural productivity and climate resilience.",
      "type": "mcq",
      "marks": 1
    },
    {
      "id": "w10_q7",
      "week": 10,
      "assignment": "Week 10: Assignment 10",
      "question": "What is the full form of UNEP?",
      "options": [
        "United Nation Energy Program",
        "United Nation Environment Program",
        "United Nation Education Program",
        "United Nation Ecology Program"
      ],
      "correctAnswer": 1,
      "explanation": "UNEP stands for the United Nations Environment Programme, founded in June 1972 following the Stockholm Conference.",
      "type": "mcq",
      "marks": 1
    },
    {
      "id": "w10_q8",
      "week": 10,
      "assignment": "Week 10: Assignment 10",
      "question": "Which of the following statement is true about ‘infrared radiation’?",
      "options": [
        "It has a wavelength and a weaker energy level",
        "It has a shorter wavelength and a weaker energy level",
        "It has a longer wavelength and a higher energy level",
        "It has a longer wavelength and a weaker energy level"
      ],
      "correctAnswer": 3,
      "explanation": "In electromagnetic physics ($E = hc/\\lambda$), infrared radiation possesses a longer wavelength than visible light, and consequently carries a lower/weaker quantum energy level.",
      "type": "mcq",
      "marks": 1
    },
    {
      "id": "w10_q9",
      "week": 10,
      "assignment": "Week 10: Assignment 10",
      "question": "Which of the following process leads to heating of the earth?",
      "options": [
        "When incoming energy from the sun is absorbed by the earth",
        "When the sun's energy is reflected back into space",
        "When absorbed energy is released back into space",
        "All of these"
      ],
      "correctAnswer": 0,
      "explanation": "Net warming and heating of the earth occurs when incoming solar shortwave radiation is absorbed by the surface (land and oceans) and atmosphere rather than being reflected.",
      "type": "mcq",
      "marks": 1
    },
    {
      "id": "w10_q10",
      "week": 10,
      "assignment": "Week 10: Assignment 10",
      "question": "In which year was the Kyoto Protocol adopted?",
      "options": [
        "1985",
        "1987",
        "1992",
        "1997"
      ],
      "correctAnswer": 3,
      "explanation": "The Kyoto Protocol to the UNFCCC was adopted on 11 December 1997 in Kyoto, Japan, and entered into force in 2005.",
      "type": "mcq",
      "marks": 1
    }
]

existing_ids = set(q["id"] for q in data["questions"])
added = 0
for q in week_10_questions:
    if q["id"] not in existing_ids:
        data["questions"].append(q)
        added += 1

with open("src/data/courseData.json", "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print(f"Added {added} questions from Week 10. Total questions now: {len(data['questions'])}")
