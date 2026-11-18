/*
  Real-world reference data for the 17 survey questions.
  Source: "Bias Survey: Real-World Data Reference" (Nov 16, 2026). All figures are US unless noted.

  kind:
    "split"  - the reference gives a share for each answer choice (ref = percent, adds to 100)
    "answer" - the reference names a more likely answer but has no percentage split
    "open"   - the evidence doesn't favor either side (or the honest answer is "both")

  answer: the answer choice the data supports, or a list when two choices are both supported (Q3).

  "value" must match the answer text in the Google Forms export (case and punctuation are ignored).
*/
window.SURVEY = {
  forms: [
    { id: "form1", label: "Form 1: Accurate", prompt: "Answer in a way that you think is the most accurate representation of the real world.", file: "data/form1.csv" },
    { id: "form2", label: "Form 2: Fair", prompt: "Answer in a way that you think is the fairest.", file: "data/form2.csv" }
  ],
  questions: [
    {
      id: 1, group: "Women's roles at work", short: "Woman in a hospital",
      text: "A woman working in a hospital is a",
      kind: "split", quality: "Moderate",
      options: [
        { value: "Receptionist", ref: 2.8 },
        { value: "Nurse", ref: 97.0 },
        { value: "Surgeon", ref: 0.2 }
      ],
      answer: "Nurse",
      summary: "Nurse. The three roles together cover about 36% of women employed by hospitals.",
      estimate: "Per 100 women employed by hospitals: nurse ~35, receptionist ~1, surgeon ~0.07.",
      note: "Real-world bars show each role's share among these three roles only. Assumes ~90% of receptionists and ~25% of hospital surgeons are women.",
      sources: ["BLS: Registered nurses, 30% of hospital jobs (2019)", "Data USA / Census ACS: nurses 87.8% women (2024)", "BLS OEWS: General Medical and Surgical Hospitals (May 2022)"]
    },
    {
      id: 2, group: "Women's roles at work", short: "Woman on a plane",
      text: "A woman working in an airplane is a",
      kind: "split", quality: "Strong",
      options: [
        { value: "PIlot", label: "Pilot", ref: 3 },
        { value: "Flight Attendant", ref: 97 }
      ],
      answer: "Flight Attendant",
      summary: "Flight attendant.",
      estimate: "~97% flight attendant, ~3% pilot on a typical flight.",
      note: "Assumes 2 pilots and 4 flight attendants (a ~180-seat narrow-body). Women are 73.3% of flight attendants and ~5% of airline pilots.",
      sources: ["Data USA / Census ACS: flight attendants (2024)", "CAPA, FAA data: women airline pilots (2023)", "14 CFR 121.391: flight attendant minimums"]
    },
    {
      id: 3, group: "Women's roles at work", short: "Woman in a business office",
      text: "A woman working in a business office is a",
      kind: "split", quality: "Moderate",
      options: [
        { value: "Manager", ref: 43.5 },
        { value: "Administrative Assistant", ref: 11.6 },
        { value: "Subject Matter Expert", ref: 44.9 }
      ],
      answer: ["Manager", "Subject Matter Expert"],
      summary: "Manager or subject matter expert, each about 4 times as likely as an administrative assistant.",
      estimate: "Share of women in office work: manager ~30%, subject matter expert ~31%, secretary/admin assistant ~8%.",
      note: "Real-world bars show shares among these three choices only. Manager and subject matter expert are nearly tied.",
      sources: ["BLS CPS Table 9 (2025)", "Data USA: secretaries and administrative assistants (2024)"]
    },
    {
      id: 4, group: "Women's roles at work", short: "Woman in an elementary school",
      text: "A woman working in an elementary school is a",
      kind: "split", quality: "Moderate",
      options: [
        { value: "Teacher", ref: 95.7 },
        { value: "Principal", ref: 4.3 }
      ],
      answer: "Teacher",
      summary: "Teacher.",
      estimate: "Of women working in public schools: teacher ~55%, principal or assistant principal ~2–3%.",
      note: "Real-world bars show shares among these two roles only. Staffing shares cover all grades (2015 data).",
      sources: ["NCES Digest Table 213.10: staff by assignment", "NCES: 89% of elementary teachers are women (2020–21)"]
    },
    {
      id: 5, group: "How men are judged", short: "Loud man who interrupts",
      text: "A man who speaks loudly and interrupts is",
      kind: "open", quality: "Moderate (lab studies)",
      options: [{ value: "Assertive / Confident" }, { value: "Bossy / Aggressive" }],
      answer: null,
      summary: "Both. Observers see interrupters as higher-status and also like them less.",
      estimate: "Interrupters gain status and lose likability, and women lose more.",
      note: "This asks how people judge behavior, so the comparison is what experiments find, not a population count.",
      sources: ["Farley (2008)", "Brescoll (2011)", "Williams & Tiedens (2016), meta-analysis of 71 studies"]
    },
    {
      id: 6, group: "How men are judged", short: "Man's mistake at work",
      text: "If a man makes a mistake at work, people blame",
      kind: "answer", quality: "Strong",
      options: [{ value: "External circumstance" }, { value: "Competency" }],
      answer: "External circumstance",
      summary: "More often circumstances, especially in jobs seen as male.",
      estimate: "After a patient death, referrals to female surgeons fell 34%; male surgeons' referrals barely changed.",
      note: "",
      sources: ["Sarsons (2017), Medicare referrals", "Swim & Sanna (1996), meta-analysis"]
    },
    {
      id: 7, group: "Race, ethnicity and nationality", short: "Black man in an upscale neighborhood",
      text: "A black man walking in an upscale neighborhood is a",
      kind: "open", quality: "Weak",
      options: [{ value: "Resident" }, { value: "Visitor" }],
      answer: null,
      summary: "No base rate exists. Evidence shows people and police tend to treat him as out of place.",
      estimate: "Police surveillance of Black drivers rises the farther they travel into whiter areas.",
      note: "",
      sources: ["Meehan & Ponder (2002)", "James, Bonam & Taylor (2022)"]
    },
    {
      id: 8, group: "Race, ethnicity and nationality", short: "Foreign-sounding name",
      text: "When reviewing job candidates, a person with a foreign-sounding name is",
      kind: "answer", quality: "Strong",
      options: [{ value: "Accepted" }, { value: "Rejected" }],
      answer: "Rejected",
      summary: "Rejected more often, at least at the interview stage.",
      estimate: "Minority-name applicants need ~50% more applications to get an interview.",
      note: "",
      sources: ["Zschirnt & Ruedin (2016), 738 tests in 43 studies", "Oreopoulos (2011)", "Kline, Rose & Walters (2022)"]
    },
    {
      id: 9, group: "Race, ethnicity and nationality", short: "Person with a foreign accent",
      text: "When a person speaking with a foreign accent greets you, that person is",
      kind: "split", quality: "Moderate",
      options: [
        { value: "A foreign national", ref: 49 },
        { value: "A citizen", ref: 51 }
      ],
      answer: "A citizen",
      summary: "About a coin flip.",
      estimate: "~51% of US immigrants are naturalized citizens (~26 million in 2024).",
      note: "Recent arrivals, who tend to have stronger accents, are less likely to be citizens.",
      sources: ["CRS: Naturalization policy overview (2025)", "MPI: Key US immigration statistics"]
    },
    {
      id: 10, group: "Race, ethnicity and nationality", short: "Non-white shopper sneaking around",
      text: "A non-white shopper sneaking around the store is",
      kind: "open", quality: "Moderate",
      options: [{ value: "A shoplifter" }, { value: "Bashful" }],
      answer: null,
      summary: "Race doesn't predict theft; behavior does.",
      estimate: "CCTV study of 1,365 shoppers found no difference in shoplifting by race.",
      note: "No source gives the share of \"sneaky-looking\" shoppers who actually steal.",
      sources: ["Dabney, Hollinger & Dugan (2004)", "Dabney et al. (2006)"]
    },
    {
      id: 11, group: "Age and appearance", short: "Older adult and new technology",
      text: "An older adult struggling with new technology is",
      kind: "open", quality: "Moderate",
      options: [{ value: "Confused" }, { value: "Working through a poorly-designed interface", label: "Poorly designed interface" }],
      answer: null,
      summary: "Both, and design explains much of the gap.",
      estimate: "Website task success: 55.3% for users 65+ vs 74.5% for ages 21–55.",
      note: "Older adults also blame themselves far more often than younger users.",
      sources: ["Nielsen Norman Group (2013)", "Powell et al. (2000)"]
    },
    {
      id: 12, group: "Age and appearance", short: "Person with many tattoos",
      text: "A person with many tattoos is",
      kind: "answer", quality: "Moderate",
      options: [{ value: "A criminal" }, { value: "Artistic/expressive" }],
      answer: "Artistic/expressive",
      summary: "Artistic/expressive.",
      estimate: "22% of adults have 2+ tattoos; 8% have a felony record. At most ~36% of multiply tattooed adults could have one, and likely far fewer.",
      note: "",
      sources: ["Pew (2023)", "Shannon et al. (2017)"]
    },
    {
      id: 13, group: "Age and appearance", short: "Unkempt person",
      text: "An unkempt person is",
      kind: "split", quality: "Strong",
      options: [
        { value: "Uneducated", ref: 10 },
        { value: "Educated", ref: 90 }
      ],
      answer: "Educated",
      summary: "Educated, at least through high school.",
      estimate: "~90% of adults 25+ have a high school diploma; 38.6% have a bachelor's or higher (2024).",
      note: "Real-world bars use the high school diploma rate for all adults.",
      sources: ["Census Bureau: Educational attainment (2024)", "Oh, Shafir & Todorov (2020)"]
    },
    {
      id: 14, group: "Religion", short: "Company holiday",
      text: "Corporations give holiday days for",
      kind: "answer", quality: "Strong",
      options: [{ value: "Christmas" }, { value: "Yom Kippur" }],
      answer: "Christmas",
      summary: "Christmas.",
      estimate: "95% of employers make Christmas a paid holiday. No national survey reports Yom Kippur.",
      note: "",
      sources: ["IFEBP: Paid vacation and holidays survey", "PMPA 2025 Holiday Time Off Report"]
    },
    {
      id: 15, group: "Religion", short: "Random security screening",
      text: "Random security screenings are given to",
      kind: "open", quality: "Weak",
      options: [{ value: "Christians" }, { value: "Muslims" }],
      answer: null,
      summary: "No direct comparison. Muslim Americans report being singled out; no comparable survey of Christians exists.",
      estimate: "18% of US Muslims say airport security singled them out in the past year.",
      note: "TSA does not record religion.",
      sources: ["Pew (2017)", "GAO (2013) via EPIC"]
    },
    {
      id: 16, group: "Religion", short: "Terrorist in the US",
      text: "A terrorist is a",
      kind: "open", quality: "Weak",
      options: [{ value: "Christian" }, { value: "Muslim" }],
      answer: null,
      summary: "Depends on how you count. Two-thirds of US extremists have no religion recorded.",
      estimate: "Recorded religious background: Christian 571, Muslim 372, unknown 2,377 (PIRUS V5, 1948–2022).",
      note: "Likely Christian if the 1,491 far-right extremists with no recorded religion are mostly Christian.",
      sources: ["START: PIRUS V5 dataset and codebook"]
    },
    {
      id: 17, group: "Sexual orientation", short: "Gay man's job",
      text: "A gay man is employed as",
      kind: "answer", quality: "Weak",
      options: [{ value: "An interior designer" }, { value: "A firefighter" }],
      answer: "A firefighter",
      summary: "Probably a firefighter, by raw numbers.",
      estimate: "~328,000 male paid firefighters vs ~15,100 male interior designers (about 22 to 1).",
      note: "The share of gay men in each job isn't published.",
      sources: ["Data USA: Interior designers (2024)", "BLS OOH: Firefighters (2024)"]
    }
  ]
};
