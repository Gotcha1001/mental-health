export const questions = [
  // ADHD (ASRS-6, 6 questions)
  {
    id: 1,
    text: "How often do you have trouble wrapping up the final details of a project, once the challenging parts have been done?",
    options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"],
    type: "ADHD",
  },
  {
    id: 2,
    text: "How often do you have difficulty getting things in order when you have to do a task that requires organization?",
    options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"],
    type: "ADHD",
  },
  {
    id: 3,
    text: "How often do you have problems remembering appointments or obligations?",
    options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"],
    type: "ADHD",
  },
  {
    id: 4,
    text: "When you have a task that requires a lot of thought, how often do you avoid or delay getting started?",
    options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"],
    type: "ADHD",
  },
  {
    id: 5,
    text: "How often do you fidget or squirm with your hands or feet when you have to sit down for a long time?",
    options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"],
    type: "ADHD",
  },
  {
    id: 6,
    text: "How often do you feel overly active and compelled to do things, like you were driven by a motor?",
    options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"],
    type: "ADHD",
  },

  // Autism (AQ-10, 10 questions)
  {
    id: 7,
    text: "I prefer to do things with others rather than on my own.",
    options: [
      "Definitely agree",
      "Slightly agree",
      "Slightly disagree",
      "Definitely disagree",
    ],
    type: "Autism",
  },
  {
    id: 8,
    text: "I prefer to do things the same way over and over again.",
    options: [
      "Definitely agree",
      "Slightly agree",
      "Slightly disagree",
      "Definitely disagree",
    ],
    type: "Autism",
  },
  {
    id: 9,
    text: "If I try to imagine something, I find it very easy to create a picture in my mind.",
    options: [
      "Definitely agree",
      "Slightly agree",
      "Slightly disagree",
      "Definitely disagree",
    ],
    type: "Autism",
  },
  {
    id: 10,
    text: "I frequently get so strongly absorbed in one thing that I lose sight of other things.",
    options: [
      "Definitely agree",
      "Slightly agree",
      "Slightly disagree",
      "Definitely disagree",
    ],
    type: "Autism",
  },
  {
    id: 11,
    text: "I often notice small sounds when others do not.",
    options: [
      "Definitely agree",
      "Slightly agree",
      "Slightly disagree",
      "Definitely disagree",
    ],
    type: "Autism",
  },
  {
    id: 12,
    text: "I usually notice car number plates or similar strings of information.",
    options: [
      "Definitely agree",
      "Slightly agree",
      "Slightly disagree",
      "Definitely disagree",
    ],
    type: "Autism",
  },
  {
    id: 13,
    text: "Other people frequently tell me that what I've said is impolite, even though I think it is polite.",
    options: [
      "Definitely agree",
      "Slightly agree",
      "Slightly disagree",
      "Definitely disagree",
    ],
    type: "Autism",
  },
  {
    id: 14,
    text: "I am fascinated by numbers.",
    options: [
      "Definitely agree",
      "Slightly agree",
      "Slightly disagree",
      "Definitely disagree",
    ],
    type: "Autism",
  },
  {
    id: 15,
    text: "When I'm reading a story, I can feel the emotions the characters are feeling.",
    options: [
      "Definitely agree",
      "Slightly agree",
      "Slightly disagree",
      "Definitely disagree",
    ],
    type: "Autism",
  },
  {
    id: 16,
    text: "I am able to make up stories.",
    options: [
      "Definitely agree",
      "Slightly agree",
      "Slightly disagree",
      "Definitely disagree",
    ],
    type: "Autism",
  },

  // Anxiety (GAD-7, 7 questions)
  {
    id: 17,
    text: "Over the last 2 weeks, how often have you been bothered by feeling nervous, anxious, or on edge?",
    options: [
      "Not at all",
      "Several days",
      "More than half the days",
      "Nearly every day",
    ],
    type: "Anxiety",
  },
  {
    id: 18,
    text: "Over the last 2 weeks, how often have you been bothered by not being able to stop or control worrying?",
    options: [
      "Not at all",
      "Several days",
      "More than half the days",
      "Nearly every day",
    ],
    type: "Anxiety",
  },
  {
    id: 19,
    text: "Over the last 2 weeks, how often have you been bothered by worrying too much about different things?",
    options: [
      "Not at all",
      "Several days",
      "More than half the days",
      "Nearly every day",
    ],
    type: "Anxiety",
  },
  {
    id: 20,
    text: "Over the last 2 weeks, how often have you been bothered by trouble relaxing?",
    options: [
      "Not at all",
      "Several days",
      "More than half the days",
      "Nearly every day",
    ],
    type: "Anxiety",
  },
  {
    id: 21,
    text: "Over the last 2 weeks, how often have you been bothered by being so restless that it's hard to sit still?",
    options: [
      "Not at all",
      "Several days",
      "More than half the days",
      "Nearly every day",
    ],
    type: "Anxiety",
  },
  {
    id: 22,
    text: "Over the last 2 weeks, how often have you been bothered by becoming easily annoyed or irritable?",
    options: [
      "Not at all",
      "Several days",
      "More than half the days",
      "Nearly every day",
    ],
    type: "Anxiety",
  },
  {
    id: 23,
    text: "Over the last 2 weeks, how often have you been bothered by feeling afraid as if something awful might happen?",
    options: [
      "Not at all",
      "Several days",
      "More than half the days",
      "Nearly every day",
    ],
    type: "Anxiety",
  },

  // Depression (PHQ-9, 9 questions)
  {
    id: 24,
    text: "Little interest or pleasure in doing things",
    options: [
      "Not at all",
      "Several days",
      "More than half the days",
      "Nearly every day",
    ],
    type: "Depression",
  },
  {
    id: 25,
    text: "Feeling down, depressed, or hopeless",
    options: [
      "Not at all",
      "Several days",
      "More than half the days",
      "Nearly every day",
    ],
    type: "Depression",
  },
  {
    id: 26,
    text: "Trouble falling or staying asleep, or sleeping too much",
    options: [
      "Not at all",
      "Several days",
      "More than half the days",
      "Nearly every day",
    ],
    type: "Depression",
  },
  {
    id: 27,
    text: "Feeling tired or having little energy",
    options: [
      "Not at all",
      "Several days",
      "More than half the days",
      "Nearly every day",
    ],
    type: "Depression",
  },
  {
    id: 28,
    text: "Poor appetite or overeating",
    options: [
      "Not at all",
      "Several days",
      "More than half the days",
      "Nearly every day",
    ],
    type: "Depression",
  },
  {
    id: 29,
    text: "Feeling bad about yourself — or that you are a failure or have let yourself or your family down",
    options: [
      "Not at all",
      "Several days",
      "More than half the days",
      "Nearly every day",
    ],
    type: "Depression",
  },
  {
    id: 30,
    text: "Trouble concentrating on things, such as reading the newspaper or watching television",
    options: [
      "Not at all",
      "Several days",
      "More than half the days",
      "Nearly every day",
    ],
    type: "Depression",
  },
  {
    id: 31,
    text: "Moving or speaking so slowly that other people could have noticed. Or the opposite — being so fidgety or restless that you have been moving around a lot more than usual",
    options: [
      "Not at all",
      "Several days",
      "More than half the days",
      "Nearly every day",
    ],
    type: "Depression",
  },
  {
    id: 32,
    text: "Thoughts that you would be better off dead or of hurting yourself in some way",
    options: [
      "Not at all",
      "Several days",
      "More than half the days",
      "Nearly every day",
    ],
    type: "Depression",
  },
];
