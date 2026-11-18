/*
  Real-world reference data for the 17 survey questions.
  Source: "Bias Survey: Real-World Data Reference" (Nov 16, 2026). All figures are US unless noted.

  kind:
    "split"  - the reference gives a share for each answer choice (ref = percent, adds to 100)
    "answer" - the reference names a more likely answer but has no percentage split
    "open"   - the evidence doesn't favor either side (or the honest answer is "both")

  answer: the answer choice the data supports, or a list when two choices are both supported (Q3).

  sources: { title, url } pairs from the reference document's appendix. Links open in a new tab.

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
      sources: [
        { title: "BLS: Registered nurses made up 30 percent of hospital employment, May 2019", url: "https://www.bls.gov/opub/ted/2020/registered-nurses-made-up-30-percent-of-hospital-employment-in-may-2019.htm" },
        { title: "Data USA: Registered nurses (87.8% women, 2024)", url: "https://datausa.io/profile/soc/registered-nurses" },
        { title: "BLS: Women in health care and social assistance, 2021 (hospitals 75.0% women)", url: "https://www.bls.gov/opub/ted/2022/over-16-million-women-worked-in-health-care-and-social-assistance-in-2021.htm" },
        { title: "BLS OEWS: General Medical and Surgical Hospitals, May 2022", url: "https://www.bls.gov/oes/2022/may/naics4_622100.htm" },
        { title: "BLS OEWS: Surgeons, All Other, May 2022", url: "https://www.bls.gov/oes/2022/may/oes291249.htm" },
        { title: "Becker's ASC: AAMC 2022 Physician Specialty Data", url: "https://www.beckersasc.com/asc-news/10-specialties-with-the-lowest-female-provider-representation" }
      ]
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
      sources: [
        { title: "Data USA: Flight attendants (73.3% women, 2024)", url: "https://datausa.io/profile/soc/flight-attendants" },
        { title: "CAPA: Women airline pilot numbers stay low", url: "https://centreforaviation.com/analysis/reports/women-airline-pilot-numbers-stay-low-aspiration-and-career-structures-are-key-692356" },
        { title: "14 CFR § 121.391 Flight attendants", url: "https://www.law.cornell.edu/cfr/text/14/121.391" }
      ]
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
      sources: [
        { title: "BLS CPS Table 9: Employed persons by occupation, sex, and age (2025)", url: "https://www.bls.gov/cps/cpsaat09.htm" },
        { title: "Data USA: Executive secretaries and executive administrative assistants", url: "https://datausa.io/profile/soc/executive-secretaries-and-executive-administrative-assistants" },
        { title: "Data USA: Secretaries and administrative assistants, except legal, medical, and executive", url: "https://datausa.io/profile/soc/secretaries-and-administrative-assistants-except-legal-medical-and-executive" },
        { title: "Altrata: Gender diversity in corporate America in 2025", url: "https://altrata.com/reports/gender-diversity-in-corporate-america-in-2025" }
      ]
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
      sources: [
        { title: "NCES Digest Table 213.10: Staff by type of assignment", url: "https://nces.ed.gov/programs/digest/d17/tables/dt17_213.10.asp" },
        { title: "NCES: Characteristics of public school teachers (11% of elementary teachers male)", url: "https://nces.ed.gov/programs/coe/indicator/clr" },
        { title: "Women in Academia Report: Women as school principals, 2020–21", url: "https://wiareport.com/?p=65467" }
      ]
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
      sources: [
        { title: "Farley (2008), Attaining Status at the Expense of Likeability", url: "https://mdsoar.org/handle/11603/4034?show=full" },
        { title: "Harvard Gender Action Portal: Brescoll (2011), Who Takes the Floor and Why", url: "https://gap.hks.harvard.edu/who-takes-floor-and-why-gender-power-and-volubility-organizations" },
        { title: "Williams & Tiedens (2016), The Subtle Suspension of Backlash", url: "https://pubmed.ncbi.nlm.nih.gov/26689089/" },
        { title: "Emory Magazine: Banning 'Bossy'", url: "https://magazine.emory.edu/issues/2016/autumn/register/coda/index.html" },
        { title: "Stanford News: Hilton on perceptions of interruption", url: "https://news.stanford.edu/?p=20602" }
      ]
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
      sources: [
        { title: "Sarsons (2017), Interpreting Signals in the Labor Market", url: "https://wpcarey.asu.edu/sites/default/files/documents/sarsons_jmp.pdf" },
        { title: "Swim & Sanna (1996), He's Skilled, She's Lucky", url: "https://pure.psu.edu/en/publications/hes-skilled-shes-lucky-a-meta-analysis-of-observers-attributions-/" },
        { title: "Brescoll, Dawson & Uhlmann (2010), Hard Won and Easily Lost", url: "https://gap.hks.harvard.edu/hard-won-and-easily-lost-fragile-status-leaders-gender-stereotype-incongruent-occupations" }
      ]
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
      sources: [
        { title: "Meehan & Ponder (2002), Race and Place (NCJRS)", url: "https://www.ojp.gov/ncjrs/virtual-library/abstracts/race-and-place-ecology-racial-profiling-african-american-motorists" },
        { title: "James, Bonam & Taylor (2022), \"Crime\" in Context", url: "https://ifp.nyu.edu/?p=1622834" },
        { title: "Krysan neighborhood video study (summary)", url: "https://legallysociable.com/2015/07/24/viewing-a-neighborhood-differently-with-white-vs-black-residents/" },
        { title: "TheGrio: Ohio State study on Black youth in white neighborhoods", url: "https://thegrio.com/2018/08/15/new-ohio-state-university-study-confirms-black-boys-feel-less-safe-in-white-neighborhoods/" },
        { title: "Boston Fed: Separate and Unequal", url: "https://www.bostonfed.org/-/media/Documents/events/2021/racial-disparities-in-todays-economy/Separate-and-Unequal-Race-and-the-Geography-of-the-American-Housing-Market.pdf?la=en" }
      ]
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
      sources: [
        { title: "Zschirnt & Ruedin (2016), Ethnic discrimination in hiring decisions", url: "https://libra.unine.ch/bitstreams/207b4bc5-5e2b-4e2d-90ad-536b7bd9379a/download" },
        { title: "JEMS special issue citing the 50% figure", url: "https://informahealthcare.com/doi/full/10.1080/1369183X.2019.1622744" },
        { title: "Oreopoulos (2011), NBER w15036", url: "https://papers.nber.org/papers/w15036" },
        { title: "Kline, Rose & Walters (2022), NBER w29053", url: "https://www.nber.org/index%2Ephp/papers/w29053" }
      ]
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
      sources: [
        { title: "CRS: Naturalization policy overview (2025)", url: "https://www.everycrsreport.com/files/2025-09-16_IF12322_42b1a898aecd778ae52b06eab04bcc9fc2d453d7.html" },
        { title: "MPI: Key US immigration statistics, 2026", url: "https://www.migrationpolicy.org/news/frequently-requested-us-immigration-statistics-2026" },
        { title: "Devos & Banaji (2005), American = White?", url: "https://dash.harvard.edu/entities/publication/d3dda11f-ce3a-4418-a6a3-64f8f4745136" },
        { title: "Morehouse et al. (2025), Who is American?", url: "https://library.kab.ac.ug/Record/doaj-art-e6499bf631e2476192c580ec984fab41/Description" },
        { title: "Lev-Ari & Keysar (2010)", url: "https://pure.mpg.de/pubman/item/item_1837436_6/component/file_1837698/LevAriKeysar.pdf" },
        { title: "Failed replication of Lev-Ari & Keysar (2010)", url: "https://escholarship.org/content/qt8hd9v4ff/qt8hd9v4ff.pdf" }
      ]
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
      sources: [
        { title: "Blanco et al. (2008), Prevalence and correlates of shoplifting", url: "https://searchworks.jioinstitute.edu.in/articles/cmedm__18381900" },
        { title: "UF / Phys.org: Shoplifters identified by behavior, not race", url: "https://phys.org/news/2005-08-shoplifters-readily-behavior.amp" },
        { title: "Review citing Dabney et al. (2004)", url: "https://law-journals-books.vlex.com/vid/public-opinion-on-the-874267136" },
        { title: "Dabney et al. (2006), Implicit stereotyping and offender profiling (NCJRS)", url: "https://www.ojp.gov/ncjrs/virtual-library/abstracts/impact-implicit-stereotyping-offender-profiling-unexpected-results" }
      ]
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
      sources: [
        { title: "Econsultancy on NN/g 2013 senior usability study", url: "https://econsultancy.com/six-design-tips-for-making-your-website-senior-friendly/" },
        { title: "NN/g: Usability for Senior Citizens", url: "https://www.nngroup.com/articles/usability-seniors-improvements/" },
        { title: "Evaluating Websites for Older Adults (2008)", url: "https://portfolio.erau.edu/en/publications/evaluating-websites-for-older-adults-adherence-to-senior-friendly/" },
        { title: "Powell et al. (2000), Equipment malfunctions and attribution", url: "https://pubmed.ncbi.nlm.nih.gov/10769881/" },
        { title: "SLI Systems blog citing NN/g self-blame figures", url: "https://blog.sli-systems.com/blog/tag/seniors" },
        { title: "Mariano et al. (2021), Too old for technology?", url: "https://repositorio.iscte-iul.pt/bitstream/10071/22600/1/article_79394.pdf" }
      ]
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
      sources: [
        { title: "Pew (2023): 32% of Americans have a tattoo", url: "https://www.pewresearch.org/short-reads/2023/08/17/32-of-americans-have-a-tattoo-including-22-who-have-more-than-one/" },
        { title: "Shannon et al. (2017), People with felony records", url: "https://pubmed.ncbi.nlm.nih.gov/28895078/" },
        { title: "Broussard & Harton (2018), Tattoo or Taboo?", url: "https://scholarworks.uni.edu/facpub/674" },
        { title: "Funk & Todorov (2013), Criminal stereotypes in the courtroom", url: "https://collaborate.princeton.edu/en/publications/criminal-stereotypes-in-the-courtroom-facial-tattoos-affect-guilt/" }
      ]
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
      sources: [
        { title: "Census Bureau: Educational attainment, 2024", url: "https://www.census.gov/newsroom/press-releases/2025/educational-attainment-data.html" },
        { title: "College Transitions summary (38.6% bachelor's+)", url: "https://www.collegetransitions.com/blog/percentage-of-americans-with-college-degrees/" },
        { title: "Perryman Group: ~89.9% high school graduates", url: "https://www.perrymangroup.com/publications/column/2026/3/2/a-little-progress/" },
        { title: "TLNT: Grooming wage premium", url: "https://www.tlnt.com/hiring-wisdom-why-dress-for-success-really-matters-on-the-job/" },
        { title: "Princeton SPIA: Oh, Shafir & Todorov (2020)", url: "https://spia.princeton.edu/news/split-second-clothes-make-man-more-competent-eyes-others" }
      ]
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
      sources: [
        { title: "IFEBP: Paid vacation and holidays survey", url: "https://blog.ifebp.org/paid-vacation-holidays/" },
        { title: "PMPA 2025 Holiday Time Off Report", url: "https://www.pmpa.org/wp-content/uploads/2023/12/PMPA-2025-Holiday-Time-Off-Report-10HR.pdf" },
        { title: "EEOC: Religious discrimination and accommodation", url: "https://www.eeoc.gov/religious-discrimination?lv=true" }
      ]
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
      sources: [
        { title: "Pew (2017): American Muslims concerned but satisfied", url: "https://pewresearch.org/?p=11768" },
        { title: "Pew: Muslim Americans singled out by airport security", url: "https://www.pewresearch.org/?p=18330" },
        { title: "Skift: TSA officers allege racial profiling at Logan", url: "https://skift.com/?p=12822" },
        { title: "EPIC: GAO finds TSA behavioral program ineffective", url: "https://epic.org/2013/11/government-audit-finds-tsas-be.html" }
      ]
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
      sources: [
        { title: "Axios: CSIS domestic terrorism study", url: "https://www.axios.com/2025/09/28/left-wing-terrorism-far-right-violence-research?stream=top" },
        { title: "Just Security: Critique of the CSIS study", url: "https://www.justsecurity.org/122278/correctlyassessing-left-wing-terrorism-and-political-violence-in-the-united-states" },
        { title: "START: PIRUS data release", url: "https://www.start.umd.edu/news/start-releases-new-data-radicalization-united-states" },
        { title: "PIRUS overview (category definitions)", url: "https://www.SLATT.org/Documents/Resources/Profiles%20of%20Individual%20Radicalization%20in%20the%20United%20States%20(PIRUS).pdf" },
        { title: "Pew Religious Landscape Study 2023–24", url: "https://www.pewresearch.org/religion/2025/02/26/religious-landscape-study-executive-summary/" },
        { title: "The Week: RLS religious shares (1.2% Muslim)", url: "https://theweek.com/religion/us-christianity-decline-halts-pew-research" },
        { title: "Vision of Humanity: Global Terrorism Index 2026", url: "https://www.visionofhumanity.org/?p=17580" },
        { title: "START: PIRUS, comparing violent and non-violent offenders", url: "https://www.start.umd.edu/sites/default/files/publications/local_attachments/PIRUS-Comparing%20Violent%20and%20Non-Violent%20Offenders.pdf" },
        { title: "START: PIRUS update, 2019–2021 (32.2% far-right in 2015; ~90% in 2021)", url: "https://start.umd.edu/node/36619" },
        { title: "PIRUS V5 Codebook (includes a Religious Background variable)", url: "https://start.umd.edu/sites/default/files/files/research/PIRUS%20V5%20Codebook.pdf" },
        { title: "New America: What is the threat to the United States? (449 jihadist cases)", url: "https://www.newamerica.org/insights/jihadist-terrorism-17-years-after-911/what-is-the-threat-to-the-united-states/" },
        { title: "START: PIRUS dataset (V5 file tabulated for Q16)", url: "https://start.umd.edu/data-tools/profiles-individual-radicalization-united-states-pirus" },
        { title: "PIRUS V5 Codebook (Religious_Background, Convert and ideology codes)", url: "https://www.start.umd.edu/sites/default/files/files/research/PIRUS%20V5%20Codebook.pdf" }
      ]
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
      sources: [
        { title: "Data USA: Interior designers (15.8% men, 2024)", url: "https://la.datausa.io/profile/soc/271025" },
        { title: "BLS OOH: Firefighters (344,900 jobs, 2024)", url: "https://www.bls.gov/ooh/protective-service/firefighters.htm" },
        { title: "USFA: Recruitment and retention (NFPA data)", url: "https://www.usfa.fema.gov/downloads/pdf/summit/2023-factsheets/recruitment-and-retention.pdf" },
        { title: "LSE Business Review: Anteby, Knight & Tilcsik", url: "https://blogs.lse.ac.uk/businessreview/?p=3756" }
      ]
    }
  ]
};
