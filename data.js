// ╔══════════════════════════════════════════════════════════════╗
// ║           PORTFOLIO QUEST — DATA FILE                        ║
// ║   ✏️  ALL your info lives here. Edit and save, then         ║
// ║       refresh index.html to see your changes!               ║
// ╚══════════════════════════════════════════════════════════════╝
//
// HOW TO EDIT:
//   1. Change any text between the quote marks  "like this"
//   2. Put photos in the  images/  subfolders
//   3. Put certificates in  images/certificates/
//   4. Update the imagePath / certificatePath values below
//   5. Open (or refresh) index.html in your browser

const PORTFOLIO = {

  // ══════════════════════════════════════════════════════════════
  // EDIT HERE: Student personal information
  // ══════════════════════════════════════════════════════════════
  profile: {
    name:            "Yael",
    school:          "[School Name Here]",
    level:           "[Student Level / Year Here]",      // e.g. "Secondary 4"
    class:           "[Career Aspiration Here]",          // e.g. "Future AI Researcher"
    tagline:         "[Short tagline here]",              // e.g. "Building tomorrow, one line at a time"
    introduction:    "[Write a short introduction about yourself here. Tell visitors who you are, what you love doing, and what drives you. Keep it friendly and genuine — 2 to 4 sentences.]",
    profilePhoto:    "images/profile-placeholder.png",   // replace filename when ready
    email:           "[your.email@example.com]",          // optional
    github:          "[github.com/yourusername]",         // optional — leave "" to hide
    linkedin:        "[linkedin.com/in/yourname]",        // optional — leave "" to hide
  },

  // ══════════════════════════════════════════════════════════════
  // EDIT HERE: RPG skills (1–5 stars each)
  // ══════════════════════════════════════════════════════════════
  skills: [
    { name: "Problem Solving",  stars: 5 },
    { name: "Robotics",         stars: 5 },
    { name: "Programming",      stars: 4 },
    { name: "Leadership",       stars: 4 },
    { name: "Communication",    stars: 4 },
    { name: "Creativity",       stars: 4 },
    { name: "Teamwork",         stars: 5 },
    // Add more rows if you like ↓
  ],

  // ══════════════════════════════════════════════════════════════
  // EDIT HERE: XP statistics (animated counters on the page)
  // ══════════════════════════════════════════════════════════════
  xpStats: [
    { label: "Competitions",       value: 0,  icon: "🏆" },
    { label: "Projects",           value: 0,  icon: "🔬" },
    { label: "Volunteer Hours",    value: 0,  icon: "🌱" },
    { label: "Leadership Roles",   value: 0,  icon: "👑" },
    { label: "Certificates",       value: 0,  icon: "📜" },
    { label: "Coding Languages",   value: 0,  icon: "💻" },
    // Change the 0s to your real numbers ↑
  ],

  // ══════════════════════════════════════════════════════════════
  // EDIT HERE: Interests / tags shown on the hero card
  // ══════════════════════════════════════════════════════════════
  interests: [
    "[Interest 1]",
    "[Interest 2]",
    "[Interest 3]",
    "[Interest 4]",
    "[Interest 5]",
  ],

  // ══════════════════════════════════════════════════════════════
  // EDIT HERE: Add achievements
  // ══════════════════════════════════════════════════════════════
  // EDIT HERE: Add achievement photos  → imagePath
  // EDIT HERE: Add certificate file paths → certificatePath
  //
  // Categories: "robotics" | "coding" | "olympiad" | "leadership"
  //             "community" | "innovation" | "sports" | "arts"
  // ══════════════════════════════════════════════════════════════
  achievements: [
    {
      title:           "[Achievement Title Here]",
      category:        "robotics",
      date:            "[Month Year]",
      organisation:    "[Organising Body Here]",
      description:     "[Describe what the achievement is, what competition or event it came from, and what placing or recognition you received.]",
      reflection:      "[Insert Reflection Here — what did this achievement mean to you?]",
      learningOutcome: "[What skill, habit, or mindset did you gain from this experience?]",
      imagePath:       "images/achievements/achievement-1.png",  // EDIT HERE: Add achievement photo
      certificatePath: "images/certificates/certificate-1.pdf",  // EDIT HERE: Add certificate file path
    },
    {
      title:           "[Achievement Title Here]",
      category:        "coding",
      date:            "[Month Year]",
      organisation:    "[Organising Body Here]",
      description:     "[Describe what the achievement is.]",
      reflection:      "[Insert Reflection Here]",
      learningOutcome: "[What did you learn?]",
      imagePath:       "images/achievements/achievement-2.png",  // EDIT HERE: Add achievement photo
      certificatePath: "",   // leave "" if no certificate yet
    },
    // ↓ Copy and paste a block above to add more achievements
  ],

  // ══════════════════════════════════════════════════════════════
  // EDIT HERE: Add projects (Innovation Lab)
  // ══════════════════════════════════════════════════════════════
  projects: [
    {
      title:            "[Project Title Here]",
      category:         "innovation",
      problem:          "[What problem or challenge did this project address?]",
      solution:         "[How did you solve it? What did you build or create?]",
      myRole:           "[What was your specific role? e.g. Lead Developer, Designer, Team Captain]",
      technologiesUsed: "[e.g. Python, Arduino, Figma, Firebase]",
      journey:          "[Describe the process from start to finish — planning, building, testing, improving.]",
      outcome:          "[What was the final result? What impact did it have?]",
      lessonsLearned:   "[What did you learn from this project?]",
      imagePath:        "images/projects/project-1.png",   // EDIT HERE: Add project photo
      videoLink:        "",  // paste a YouTube/video URL, or leave "" to hide
      awards:           "[Any awards this project won — or leave blank]",
    },
    {
      title:            "[Project Title Here]",
      category:         "app",
      problem:          "[Problem statement]",
      solution:         "[Your solution]",
      myRole:           "[Your role]",
      technologiesUsed: "[Technologies]",
      journey:          "[Development journey]",
      outcome:          "[Final outcome]",
      lessonsLearned:   "[Lessons learned]",
      imagePath:        "images/projects/project-2.png",
      videoLink:        "",
      awards:           "",
    },
    // ↓ Copy and paste a block above to add more projects
  ],

  // ══════════════════════════════════════════════════════════════
  // EDIT HERE: Add robotics experiences
  // ══════════════════════════════════════════════════════════════
  robotics: [
    {
      title:          "[Robotics Competition / Project Title Here]",
      competition:    "[e.g. First Lego League, WRO, NRC, RCAP]",
      year:           "[Year]",
      teamRole:       "[Your role in the team]",
      robotDesign:    "[Describe the robot design — what mechanisms, sensors, or features did it have?]",
      missionStrategy:"[How did you plan and execute the mission runs?]",
      programmingApproach: "[How did you approach coding the robot?]",
      challengesFaced:"[What went wrong? How did you fix it?]",
      outcome:        "[Result — e.g. Regional Champions, 3rd Place, Innovation Award]",
      reflection:     "[Insert Reflection Here]",
      imagePath:      "images/robots/robot-1.png",  // EDIT HERE: Add robot photo
    },
    // ↓ Copy and paste a block above to add more robotics entries
  ],

  // ══════════════════════════════════════════════════════════════
  // EDIT HERE: Add coding projects
  // ══════════════════════════════════════════════════════════════
  coding: [
    {
      title:       "[Coding Project Title Here]",
      language:    "[e.g. Python, Scratch, JavaScript, Swift]",
      category:    "[e.g. Game, App, AI, Web, Automation]",
      story:       "[What inspired you to build this? What is the project about?]",
      features:    "[List the key features of your project]",
      challenges:  "[What was the hardest part to code?]",
      reflection:  "[Insert Reflection Here]",
      imagePath:   "images/projects/project-1.png",  // reuse or add a new image
      codeLink:    "",  // e.g. github.com link, or leave "" to hide
    },
    // ↓ Copy and paste a block above to add more coding projects
  ],

  // ══════════════════════════════════════════════════════════════
  // EDIT HERE: Add volunteer experiences
  // ══════════════════════════════════════════════════════════════
  volunteer: [
    {
      title:        "[Volunteer Activity Title Here]",
      role:         "[Your role, e.g. Volunteer Tutor, Event Coordinator]",
      organisation: "[Organisation or School Name]",
      date:         "[Date or period, e.g. Jan 2024 – Mar 2024]",
      hours:        0,   // number of hours
      description:  "[Describe what you did and who you helped.]",
      impact:       "[What difference did your work make?]",
      reflection:   "[Insert Reflection Here]",
      imagePath:    "",  // leave "" to use placeholder
    },
    // ↓ Copy and paste a block above to add more volunteer entries
  ],

  // ══════════════════════════════════════════════════════════════
  // EDIT HERE: Add leadership roles
  // ══════════════════════════════════════════════════════════════
  leadership: [
    {
      title:            "[Leadership Role Title Here]",
      organisation:     "[CCA, Club, School, or Organisation Name]",
      duration:         "[e.g. Jan 2023 – Dec 2023]",
      responsibilities: "[What were your key responsibilities and duties?]",
      impact:           "[What did you achieve or change in this role?]",
      reflection:       "[Insert Reflection Here]",
      imagePath:        "",  // leave "" to use placeholder
    },
    // ↓ Copy and paste a block above to add more leadership entries
  ],

  // ══════════════════════════════════════════════════════════════
  // EDIT HERE: Boss Battles — challenges you overcame
  // ══════════════════════════════════════════════════════════════
  bossBattles: [
    {
      title:       "[Challenge Title Here]",
      icon:        "⚔️",   // emoji to display
      problem:     "[Describe the challenge or setback you faced.]",
      whatHappened:"[What actually happened — be honest and specific.]",
      howISolved:  "[How did you respond and solve the problem?]",
      whatILearnt: "[What did this teach you about yourself or your work?]",
    },
    // ↓ Copy and paste a block above to add more boss battles
  ],

  // ══════════════════════════════════════════════════════════════
  // EDIT HERE: Add future goals
  // ══════════════════════════════════════════════════════════════
  futureGoals: {
    desiredCourse:  "[e.g. Diploma in Information Technology at Ngee Ann Poly]",
    careerVision:   "[Describe your career goal in 1–2 sentences.]",
    longTermDream:  "[What do you hope to contribute to the world one day?]",
    skillsToGain: [
      "[Skill or area you want to develop 1]",
      "[Skill or area you want to develop 2]",
      "[Skill or area you want to develop 3]",
    ],
    questItems: [
      "[Short-term goal — next 1–2 years]",
      "[Medium-term goal — 3–5 years]",
      "[Long-term goal — 5–10 years]",
    ],
  },

};
// ── End of PORTFOLIO data object ──────────────────────────────
