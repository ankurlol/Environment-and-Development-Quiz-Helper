import json

with open("src/data/courseData.json", "r", encoding="utf-8") as f:
    data = json.load(f)

data["courseInfo"]["instructor"] = "Indian Institute of Technology Guwahati (IIT Guwahati)"

new_questions = [
    # --- WEEK 4 ---
    {
      "id": "w4_q1",
      "week": 4,
      "assignment": "Week 4: Assignment 4",
      "question": "Who among the following authored the book Wilderness and the American Mind, published in 1967?",
      "options": [
        "Lynn White",
        "Roderick Nash",
        "Murray Bookchin",
        "Rachel Carson"
      ],
      "correctAnswer": 1,
      "explanation": "Roderick Nash published the influential intellectual history 'Wilderness and the American Mind' in 1967, analyzing changing American attitudes toward wilderness.",
      "type": "mcq",
      "marks": 1
    },
    {
      "id": "w4_q2",
      "week": 4,
      "assignment": "Week 4: Assignment 4",
      "question": "What is the Judeo-Christian belief about human-nature interactions?",
      "options": [
        "Man was meant to dominate nature",
        "Nature was meant to dominate man",
        "Man was meant to pacify nature",
        "Nature was meant to pacify man"
      ],
      "correctAnswer": 0,
      "explanation": "Historically, Lynn White and environmental historians noted that traditional Western Judeo-Christian theology interpreted Genesis as granting humans dominion and command over nature ('Man was meant to dominate nature').",
      "type": "mcq",
      "marks": 1
    },
    {
      "id": "w4_q3",
      "week": 4,
      "assignment": "Week 4: Assignment 4",
      "question": "What is the dominant environmental tradition in North America?",
      "options": [
        "Free flowing rivers and natural forests are cherished by environmentalists for their beauty and commercial value",
        "Free flowing rivers and natural forests are cherished by environmentalists for cultural and commercial value",
        "Free flowing rivers and natural forests are cherished by environmentalists for their beauty and ecological value",
        "None of these"
      ],
      "correctAnswer": 2,
      "explanation": "In North America, the preservationist tradition cherishes free-flowing rivers and untouched natural forests for their intrinsic beauty and ecological value.",
      "type": "mcq",
      "marks": 1
    },
    {
      "id": "w4_q4",
      "week": 4,
      "assignment": "Week 4: Assignment 4",
      "question": "Gandhian concept of environmentalism relies on ________________.",
      "options": [
        "Social and religious viewpoints",
        "Moral and religious viewpoints",
        "Moral and cultural viewpoints",
        "Political and religious viewpoints"
      ],
      "correctAnswer": 1,
      "explanation": "Mahatma Gandhi's environmental philosophy is fundamentally grounded in moral and religious/spiritual viewpoints—emphasizing non-violence (Ahimsa), self-restraint (Swaraj), and limitation of wants.",
      "type": "mcq",
      "marks": 1
    },
    {
      "id": "w4_q5",
      "week": 4,
      "assignment": "Week 4: Assignment 4",
      "question": "What does Sarvodaya signifies?",
      "options": [
        "The awakening or liberation of one and all without exception",
        "The awakening of humanity along with other species in the earth",
        "Protection of nature",
        "All of these"
      ],
      "correctAnswer": 3,
      "explanation": "Sarvodaya (universal uplift) encompasses the liberation and welfare of all humans without exception, extending compassion to other living species and protecting nature.",
      "type": "mcq",
      "marks": 1
    },
    {
      "id": "w4_q6",
      "week": 4,
      "assignment": "Week 4: Assignment 4",
      "question": "What does social ecology claim?",
      "options": [
        "The environmental crisis is a result of the non-hierarchical organization of power and the authoritarian mentality rooted in the structures of our society",
        "The environmental crisis is a result of the hierarchical organization of power and the authoritarian mentality rooted in the structures of our society",
        "The environmental crisis is a result of the non-hierarchical organization of power and the colonial mentality rooted in the structures of our society",
        "The environmental crisis is a result of the hierarchical organization of power and the colonial mentality rooted in the structures of our society"
      ],
      "correctAnswer": 1,
      "explanation": "Murray Bookchin's Social Ecology claims that ecological problems stem directly from deep-seated social problems—specifically the hierarchical organization of power and the authoritarian mindset of human domination over human, which is then projected onto nature.",
      "type": "mcq",
      "marks": 1
    },
    {
      "id": "w4_q7",
      "week": 4,
      "assignment": "Week 4: Assignment 4",
      "question": "Some people from the Third World express a suspicion that deep ecology is a new variant of Western domination and ______________.",
      "options": [
        "Modernism",
        "Post-modernism",
        "Colonialism",
        "Neocolonialism"
      ],
      "correctAnswer": 3,
      "explanation": "Ramachandra Guha and Third World scholars famously critiqued deep ecology's wilderness obsession as a form of green neocolonialism that disenfranchises poor rural peasants in developing nations.",
      "type": "mcq",
      "marks": 1
    },
    {
      "id": "w4_q8",
      "week": 4,
      "assignment": "Week 4: Assignment 4",
      "question": "Which of the following tribes, guided by their shamans, make use of various myths and rituals that prevent over-hunting and over-fishing?",
      "options": [
        "Red Indians",
        "Tukano Indians",
        "Ayoreo",
        "Yanomami"
      ],
      "correctAnswer": 1,
      "explanation": "The Tukano Indians of the Northwest Amazon, studied by anthropologists like Gerardo Reichel-Dolmatoff, rely on shamans and cultural taboos/rituals to manage resources and prevent over-hunting and over-fishing.",
      "type": "mcq",
      "marks": 1
    },
    {
      "id": "w4_q9",
      "week": 4,
      "assignment": "Week 4: Assignment 4",
      "question": "Arne Naess’s concept of human self-realization refers to ______________.",
      "options": [
        "The ecological others",
        "The ecological community",
        "The ecological self",
        "None of these"
      ],
      "correctAnswer": 2,
      "explanation": "Arne Naess (founder of Deep Ecology) defined Self-realization not as narrow ego fulfillment, but as expanding human consciousness to encompass the 'ecological Self' (Self with a capital S), identifying with all living beings.",
      "type": "mcq",
      "marks": 1
    },
    {
      "id": "w4_q10",
      "week": 4,
      "assignment": "Week 4: Assignment 4",
      "question": "Which of the following best characterizes shallow ecology?",
      "options": [
        "It is anthropocentric, or human centered",
        "It views humans as above or outside of nature, as the source of all value",
        "It ascribes only instrumental, or ‘use’, value to nature",
        "All of these"
      ],
      "correctAnswer": 3,
      "explanation": "Shallow ecology is anthropocentric, views humans as superior/outside nature, and values natural resources strictly for their instrumental and economic utility to humanity.",
      "type": "mcq",
      "marks": 1
    },

    # --- WEEK 5 ---
    {
      "id": "w5_q1",
      "week": 5,
      "assignment": "Week 5: Assignment 5",
      "question": "Which of the following was acknowledged by the World Commission on Environment and Development (WCED) to reconcile human affairs with natural law?",
      "options": [
        "Our cultural heritages can reinforce our economic interests and survival imperatives",
        "Our cultural and spiritual heritages can reinforce our economic interests and survival imperatives",
        "Our spiritual heritages can reinforce our economic interests and survival imperatives",
        "None of these"
      ],
      "correctAnswer": 1,
      "explanation": "The WCED acknowledged that 'our cultural and spiritual heritages can reinforce our economic interests and survival imperatives' in reconciling human actions with natural ecology.",
      "type": "mcq",
      "marks": 1
    },
    {
      "id": "w5_q2",
      "week": 5,
      "assignment": "Week 5: Assignment 5",
      "question": "What have religion taught us historically?",
      "options": [
        "To perceive and to act on human nature in terms of particular human interests, beliefs, and social structures",
        "To perceive and to act on human nature in terms of particular human beliefs, values and political structures",
        "To perceive and to act on nonhuman nature in terms of particular human interests, beliefs, and social structures",
        "To perceive and to act on nonhuman nature in terms of particular human beliefs, values and political structures"
      ],
      "correctAnswer": 2,
      "explanation": "Historically, world religions shaped human cosmology to perceive and act on nonhuman nature through the filter of particular human interests, beliefs, and social institutions.",
      "type": "mcq",
      "marks": 1
    },
    {
      "id": "w5_q3",
      "week": 5,
      "assignment": "Week 5: Assignment 5",
      "question": "What is the general consensus in Western monotheistic religions about religion and ecology?",
      "options": [
        "We should never forget that nature was human’s creation, and ultimately not God’s property",
        "We should never forget that nature was God’s creation, and ultimately God’s property, not our own",
        "We should forget that nature was God's creation, and ultimately man's property",
        "None of these"
      ],
      "correctAnswer": 1,
      "explanation": "In monotheistic theology (Judaism, Christianity, Islam), nature is God’s creation and sovereign property, positioning humans as trustees and stewards rather than absolute owners.",
      "type": "mcq",
      "marks": 1
    },
    {
      "id": "w5_q4",
      "week": 5,
      "assignment": "Week 5: Assignment 5",
      "question": "Which of the following is a Buddhist text?",
      "options": [
        "Vedas",
        "Agamas",
        "Sutta-Nipata",
        "Torah"
      ],
      "correctAnswer": 2,
      "explanation": "The Sutta-Nipata is an ancient Buddhist scripture within the Khuddaka Nikaya of the Pali Canon containing core discourses of the Buddha.",
      "type": "mcq",
      "marks": 1
    },
    {
      "id": "w5_q5",
      "week": 5,
      "assignment": "Week 5: Assignment 5",
      "question": "In which of the following Vedas does the idea of the Divine Being as the one underlying power of unity is expressed?",
      "options": [
        "Atharvaveda",
        "Rigveda",
        "Samaveda",
        "Yajurveda"
      ],
      "correctAnswer": 3,
      "explanation": "In Vedic traditions, the Yajurveda explicitly articulates the Divine Being (Ishvara/Brahman) as the unified underlying spiritual reality pervading all cosmos and natural elements.",
      "type": "mcq",
      "marks": 1
    },
    {
      "id": "w5_q6",
      "week": 5,
      "assignment": "Week 5: Assignment 5",
      "question": "Who among the following founded the Bishnoi sect?",
      "options": [
        "Guru Ramakrishna Paramhansa",
        "Guru Maharaj Jambaji",
        "Raja Ram Mohan Roy",
        "Iswar Chandra Vidyasagar"
      ],
      "correctAnswer": 1,
      "explanation": "Guru Maharaj Jambaji (Guru Jambheshwar) founded the Bishnoi sect in 1485 in Rajasthan, instituting 29 principles including strict prohibitions against killing animals and cutting green trees (especially Khejri).",
      "type": "mcq",
      "marks": 1
    },
    {
      "id": "w5_q7",
      "week": 5,
      "assignment": "Week 5: Assignment 5",
      "question": "Which of the following centuries marks the emergence of the ‘scientific revolution’?",
      "options": [
        "16th century",
        "17th century",
        "18th century",
        "19th century"
      ],
      "correctAnswer": 1,
      "explanation": "Historians date the high period of the Scientific Revolution (Galileo, Bacon, Descartes, Newton) to the 17th century.",
      "type": "mcq",
      "marks": 1
    },
    {
      "id": "w5_q8",
      "week": 5,
      "assignment": "Week 5: Assignment 5",
      "question": "Which of the following is viewed as being cast in a Christian theological matrix?",
      "options": [
        "Orthodox Western science",
        "Modern Western science",
        "Traditional Eastern Science",
        "Traditional ecological knowledge"
      ],
      "correctAnswer": 1,
      "explanation": "Historian Lynn White Jr. argued that Modern Western science was cast in a matrix of Christian theology, inheriting its dualistic framework of human separation and mastery over nature.",
      "type": "mcq",
      "marks": 1
    },
    {
      "id": "w5_q9",
      "week": 5,
      "assignment": "Week 5: Assignment 5",
      "question": "The essay ‘The Historical Roots of our Ecological Crisis’ was written by ___________.",
      "options": [
        "Lynn White",
        "Rachel Carson",
        "Christophe Munier",
        "None of these"
      ],
      "correctAnswer": 0,
      "explanation": "Lynn White Jr. published the landmark 1967 essay 'The Historical Roots of our Ecological Crisis' in Science, linking modern environmental degradation to religious worldviews.",
      "type": "mcq",
      "marks": 1
    },
    {
      "id": "w5_q10",
      "week": 5,
      "assignment": "Week 5: Assignment 5",
      "question": "Which of the following period marks the emergence of ‘industrial revolution’?",
      "options": [
        "16th century",
        "17th century",
        "18th century",
        "19th century"
      ],
      "correctAnswer": 2,
      "explanation": "The Industrial Revolution emerged in Great Britain during the mid-to-late 18th century (c. 1760 onwards) with mechanization and steam power.",
      "type": "mcq",
      "marks": 1
    },

    # --- WEEK 6 ---
    {
      "id": "w6_q1",
      "week": 6,
      "assignment": "Week 6: Assignment 6",
      "question": "What comes under the state property regime, under natural resource management?",
      "options": [
        "National forest/national park",
        "Hospitals",
        "Shopping malls",
        "All of these"
      ],
      "correctAnswer": 0,
      "explanation": "Under natural resource property regimes (res publicae), national forests, protected wildlife reserves, and national parks are held and managed by the state.",
      "type": "mcq",
      "marks": 1
    },
    {
      "id": "w6_q2",
      "week": 6,
      "assignment": "Week 6: Assignment 6",
      "question": "What does ‘conservation of natural resources’ mean?",
      "options": [
        "Wise use of economic resources",
        "Wise use of financial resources",
        "Wise use of economic and financial resources",
        "Wise use of the earth’s resources by humanity"
      ],
      "correctAnswer": 3,
      "explanation": "Conservation of natural resources is fundamentally defined as the wise, prudent, and sustainable management of the earth’s natural resources by humanity.",
      "type": "mcq",
      "marks": 1
    },
    {
      "id": "w6_q3",
      "week": 6,
      "assignment": "Week 6: Assignment 6",
      "question": "What is/are the methods of soil conservation?",
      "options": [
        "Crop rotation",
        "Mulching",
        "Strip cropping",
        "All of these"
      ],
      "correctAnswer": 3,
      "explanation": "Standard agronomic soil conservation practices include crop rotation (restoring soil nitrogen), mulching (retaining moisture and preventing erosion), and strip cropping (controlling runoff).",
      "type": "mcq",
      "marks": 1
    },
    {
      "id": "w6_q4",
      "week": 6,
      "assignment": "Week 6: Assignment 6",
      "question": "The book ‘Governing the Commons’ was authored by __________.",
      "options": [
        "Warder Clyde",
        "Sonia Altizer",
        "John Alcock",
        "Elinor Ostrom"
      ],
      "correctAnswer": 3,
      "explanation": "Nobel Laureate Elinor Ostrom authored 'Governing the Commons: The Evolution of Institutions for Collective Action' in 1990, demonstrating how local communities successfully manage common-pool resources without state or market privatization.",
      "type": "mcq",
      "marks": 1
    },
    {
      "id": "w6_q5",
      "week": 6,
      "assignment": "Week 6: Assignment 6",
      "question": "Which of the following statement is true about sustainable development?",
      "options": [
        "Sustainable development leads to equitable distribution of resources",
        "Sustainable development leads to inequitable distribution of resources",
        "Sustainable natural resource management leads to controlled exploitation of resources",
        "None of these"
      ],
      "correctAnswer": 2,
      "explanation": "Sustainable natural resource management operates by controlling and regulating resource harvesting/exploitation within sustainable ecological yield limits.",
      "type": "mcq",
      "marks": 1
    },
    {
      "id": "w6_q6",
      "week": 6,
      "assignment": "Week 6: Assignment 6",
      "question": "What does ‘dwelling perspective’ of Tim Ingold refers?",
      "options": [
        "Practical engagement of humans with others of the dwelt-in ecosystem",
        "Engagement of women in the ecosystem",
        "Engagement of families in the ecosystem",
        "Engagement of communities in the ecosystem"
      ],
      "correctAnswer": 0,
      "explanation": "Social anthropologist Tim Ingold introduced the 'dwelling perspective', arguing that human knowledge and culture arise from practical, immersive bodily engagement with others in the lived-in ecosystem.",
      "type": "mcq",
      "marks": 1
    },
    {
      "id": "w6_q7",
      "week": 6,
      "assignment": "Week 6: Assignment 6",
      "question": "The community-based natural resource management (CBNRM) approach combines conservation objectives with",
      "options": [
        "The generation of economic benefits",
        "The generation of social benefits",
        "The generation of psychological benefits",
        "The generation of political benefits"
      ],
      "correctAnswer": 0,
      "explanation": "CBNRM pairs ecological conservation with sustainable local economic incentives and livelihood generation for community custodians.",
      "type": "mcq",
      "marks": 1
    },
    {
      "id": "w6_q8",
      "week": 6,
      "assignment": "Week 6: Assignment 6",
      "question": "What are the example/s of tragedy of the commons?",
      "options": [
        "Shared common grazing pasture",
        "Over fishing",
        "Deforestation",
        "All of these"
      ],
      "correctAnswer": 3,
      "explanation": "Garrett Hardin's 'Tragedy of the Commons' illustrates how open-access shared resources (pastures, fisheries, forests, atmosphere) are degraded when individual users maximize personal extraction.",
      "type": "mcq",
      "marks": 1
    },
    {
      "id": "w6_q9",
      "week": 6,
      "assignment": "Week 6: Assignment 6",
      "question": "The terms ‘resource management’ or ‘environmental management’ first appeared in",
      "options": [
        "Late 1950s",
        "Early 1960s",
        "Late 1960s",
        "Early 1970s"
      ],
      "correctAnswer": 1,
      "explanation": "The formal nomenclature and discipline of 'environmental management' and 'resource management' originated in the early 1960s alongside post-war industrial resource concerns.",
      "type": "mcq",
      "marks": 1
    },
    {
      "id": "w6_q10",
      "week": 6,
      "assignment": "Week 6: Assignment 6",
      "question": "When did Environment Protection Act (Environmental Impact Assessment) came into existence?",
      "options": [
        "1974",
        "1980",
        "1986",
        "1990"
      ],
      "correctAnswer": 2,
      "explanation": "In India, the umbrella Environment (Protection) Act was passed in 1986 in the immediate aftermath of the 1984 Bhopal gas tragedy.",
      "type": "mcq",
      "marks": 1
    },

    # --- WEEK 7 ---
    {
      "id": "w7_q1",
      "week": 7,
      "assignment": "Week 7: Assignment 7",
      "question": "Who proposed the concept of ‘primitive accumulation’?",
      "options": [
        "Philip Lake",
        "Karl Marx",
        "E.R. Roe Thompson",
        "Alfred Lothar Wegener"
      ],
      "correctAnswer": 1,
      "explanation": "Karl Marx conceptualized 'primitive accumulation' (ursprüngliche Akkumulation) in Das Kapital to describe the historical process of divorcing producers from their means of production and land.",
      "type": "mcq",
      "marks": 1
    },
    {
      "id": "w7_q2",
      "week": 7,
      "assignment": "Week 7: Assignment 7",
      "question": "Where is the Sariska Tiger Reserve situated?",
      "options": [
        "Madhya Pradesh",
        "Rajasthan",
        "Kerala",
        "Uttar Pradesh"
      ],
      "correctAnswer": 1,
      "explanation": "Sariska Tiger Reserve is located in the Alwar district of Rajasthan.",
      "type": "mcq",
      "marks": 1
    },
    {
      "id": "w7_q3",
      "week": 7,
      "assignment": "Week 7: Assignment 7",
      "question": "What is the hypothesis behind people’s relocation from PAs (Protected Areas)?",
      "options": [
        "Human use of their resources causes their degradation over time",
        "People and wildlife cannot coexist",
        "If natural areas are to be safeguarded, people will have to be removed",
        "All of these"
      ],
      "correctAnswer": 3,
      "explanation": "Fortress conservation policies assume that human presence degrades habitats, humans and wildlife cannot coexist, and inviolate protected zones require forced displacement of local dwellers.",
      "type": "mcq",
      "marks": 1
    },
    {
      "id": "w7_q4",
      "week": 7,
      "assignment": "Week 7: Assignment 7",
      "question": "Who developed the concept of ‘accumulation by dispossession’?",
      "options": [
        "David Harvey",
        "Karl Marx",
        "Max Webber",
        "None of these"
      ],
      "correctAnswer": 0,
      "explanation": "Geographer David Harvey formulated the concept of 'accumulation by dispossession' in 2003 ('The New Imperialism') to describe modern neoliberal wealth extraction via land acquisition, privatization, and forced evictions.",
      "type": "mcq",
      "marks": 1
    },
    {
      "id": "w7_q5",
      "week": 7,
      "assignment": "Week 7: Assignment 7",
      "question": "Who has authored the book In Dispossession without Development?",
      "options": [
        "David Harvey",
        "Michael Levien",
        "Jim Glassman",
        "Karl Marx"
      ],
      "correctAnswer": 1,
      "explanation": "Sociologist Michael Levien authored 'Dispossession without Development: Land Grabs in Neoliberal India' (2018), documenting Special Economic Zones (SEZs) in Rajasthan.",
      "type": "mcq",
      "marks": 1
    },
    {
      "id": "w7_q6",
      "week": 7,
      "assignment": "Week 7: Assignment 7",
      "question": "The Right to Fair Compensation and Transparency in Land Acquisition, Rehabilitation and Resettlement Act was passed in _____.",
      "options": [
        "2010",
        "2012",
        "2013",
        "2015"
      ],
      "correctAnswer": 2,
      "explanation": "The landmark LARR Act (replacing the colonial 1894 Land Acquisition Act) was passed by the Indian Parliament in 2013.",
      "type": "mcq",
      "marks": 1
    },
    {
      "id": "w7_q7",
      "week": 7,
      "assignment": "Week 7: Assignment 7",
      "question": "When was the ‘Water Act’ implemented in India?",
      "options": [
        "1974",
        "1969",
        "1980",
        "1985"
      ],
      "correctAnswer": 0,
      "explanation": "The Water (Prevention and Control of Pollution) Act was enacted in India in 1974.",
      "type": "mcq",
      "marks": 1
    },
    {
      "id": "w7_q8",
      "week": 7,
      "assignment": "Week 7: Assignment 7",
      "question": "Air prevention and control of pollution act was implemented in _____.",
      "options": [
        "1981",
        "1995",
        "2000",
        "2010"
      ],
      "correctAnswer": 0,
      "explanation": "The Air (Prevention and Control of Pollution) Act was enacted in India in 1981 to implement decisions taken at the 1972 Stockholm Conference.",
      "type": "mcq",
      "marks": 1
    },
    {
      "id": "w7_q9",
      "week": 7,
      "assignment": "Week 7: Assignment 7",
      "question": "Where does the Van Gujjars belong to?",
      "options": [
        "Central part of the Indian Himalayas",
        "South India",
        "North-east",
        "Jammu and Kashmir"
      ],
      "correctAnswer": 0,
      "explanation": "The Van Gujjars are a nomadic pastoralist forest community inhabiting the central part of the Indian Himalayas (Uttarakhand and Himachal Pradesh).",
      "type": "mcq",
      "marks": 1
    },
    {
      "id": "w7_q10",
      "week": 7,
      "assignment": "Week 7: Assignment 7",
      "question": "What is Environmental Impact Assessment (EIA)?",
      "options": [
        "Used to identify the environmental, social and economic impacts of a project prior to decision-making.",
        "Aims to predict environmental impacts at an early stage in project planning and design",
        "Find ways and means to reduce adverse impacts, shape projects to suit the local environment",
        "All of these"
      ],
      "correctAnswer": 3,
      "explanation": "EIA is a comprehensive statutory planning tool used to predict impacts, assess socioeconomic consequences prior to project clearance, and design mitigation and environmental management plans.",
      "type": "mcq",
      "marks": 1
    }
]

# Keep week 1-3 questions and append new ones
filtered_existing = [q for q in data["questions"] if q["week"] in [1, 2, 3]]
data["questions"] = filtered_existing + new_questions
data["courseInfo"]["totalWeeks"] = 12

with open("src/data/courseData.json", "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print(f"Total questions in courseData.json: {len(data['questions'])}")
