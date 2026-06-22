/* ==========================================================================
   Ascend — seed data
   --------------------------------------------------------------------------
   This is mock/crowd-sourced-style content used to power the MVP. In a real
   build this would come from a backend + database. Keeping it in one file
   makes it easy to edit, extend, and eventually swap for an API.
   ========================================================================== */

const DATA = {
  // ----- Fields used on the landing page to "browse by industry" -----------
  fields: [
    { id: 'finance', name: 'Finance', icon: '📈', blurb: 'IB, S&T, PE, asset mgmt, equity research' },
    { id: 'tech', name: 'Software', icon: '💻', blurb: 'SWE, data, infra, ML' },
    { id: 'consulting', name: 'Consulting', icon: '🧭', blurb: 'Strategy & management' },
    { id: 'accounting', name: 'Accounting', icon: '🧮', blurb: 'Audit, tax, advisory' },
  ],

  companies: [
    /* ===================== MORGAN STANLEY ============================== */
    {
      id: 'morgan-stanley',
      name: 'Morgan Stanley',
      logo: 'MS',
      domain: 'morganstanley.com',
      field: 'finance',
      industry: 'Investment Banking & Wealth Management',
      hq: 'New York, NY',
      blurb: 'Global financial services firm spanning investment banking, sales & trading, and wealth management.',
      roles: [
        {
          id: 'financial-analyst',
          title: 'Financial Analyst',
          level: 'Entry / Analyst',
          summary:
            'Build financial models, prepare client materials, and support deal/portfolio teams. Strong Excel, accounting, and valuation fundamentals are table stakes.',
          stats: { difficulty: 'Hard', applicants: '8,400+', interviews: 5, offerRate: '3%' },

          // ----- TAB 1: Roadmap (NeetCode-style topic tree) --------------
          roadmap: [
            {
              section: 'Accounting Foundations',
              nodes: [
                { id: 'three-statements', title: 'The 3 Financial Statements', difficulty: 'Easy',
                  desc: 'How the income statement, balance sheet & cash flow statement link together.',
                  resources: [
                    { label: 'How the 3 statements link (video)', url: 'https://www.youtube.com/results?search_query=how+the+three+financial+statements+are+linked' },
                    { label: 'WSP accounting crash course', url: 'https://www.wallstreetprep.com/knowledge/the-three-financial-statements/' },
                  ] },
                { id: 'accrual', title: 'Accrual vs. Cash Accounting', difficulty: 'Easy',
                  desc: 'Revenue recognition, matching principle, working capital basics.',
                  resources: [{ label: 'Accrual accounting explained', url: 'https://www.youtube.com/results?search_query=accrual+vs+cash+accounting' }] },
              ],
            },
            {
              section: 'Valuation',
              nodes: [
                { id: 'dcf', title: 'Discounted Cash Flow (DCF)', difficulty: 'Medium',
                  desc: 'Unlevered FCF, WACC, terminal value, sensitivity tables.',
                  resources: [
                    { label: 'DCF in 10 minutes', url: 'https://www.youtube.com/results?search_query=dcf+valuation+explained' },
                    { label: 'Breaking Into Wall Street DCF', url: 'https://breakingintowallstreet.com/biws/dcf-analysis/' },
                  ] },
                { id: 'comps', title: 'Comparable Company Analysis', difficulty: 'Medium',
                  desc: 'Trading multiples (EV/EBITDA, P/E), choosing a peer set, calendarization.',
                  resources: [{ label: 'Trading comps tutorial', url: 'https://www.youtube.com/results?search_query=comparable+company+analysis+tutorial' }] },
                { id: 'precedent', title: 'Precedent Transactions', difficulty: 'Medium',
                  desc: 'Transaction multiples, control premiums, when to use vs. comps.',
                  resources: [{ label: 'Precedent transactions', url: 'https://www.youtube.com/results?search_query=precedent+transactions+analysis' }] },
              ],
            },
            {
              section: 'Modeling',
              nodes: [
                { id: 'three-statement-model', title: '3-Statement Model', difficulty: 'Hard',
                  desc: 'Build a fully integrated, dynamic model from a blank sheet.',
                  resources: [{ label: '3-statement modeling', url: 'https://www.youtube.com/results?search_query=3+statement+financial+model+tutorial' }] },
                { id: 'lbo', title: 'LBO Modeling', difficulty: 'Hard',
                  desc: 'Sources & uses, debt schedule, returns (IRR/MOIC). The classic "paper LBO".',
                  resources: [{ label: 'Paper LBO walkthrough', url: 'https://www.youtube.com/results?search_query=paper+lbo+walkthrough' }] },
              ],
            },
            {
              section: 'Markets & Behavioral',
              nodes: [
                { id: 'markets', title: 'Know the Markets', difficulty: 'Easy',
                  desc: 'Have a market view, follow a stock, know where rates / indices are.',
                  resources: [{ label: 'WSJ markets', url: 'https://www.wsj.com/market-data' }] },
                { id: 'behavioral', title: 'Behavioral / "Tell me about yourself"', difficulty: 'Easy',
                  desc: 'Your story, "why banking", "why Morgan Stanley", deal/club discussion.',
                  resources: [{ label: 'STAR method', url: 'https://www.youtube.com/results?search_query=star+method+behavioral+interview' }] },
              ],
            },
          ],

          // ----- TAB 2: Crowd-sourced interview questions ---------------
          questions: [
            { q: 'Walk me through a DCF.', difficulty: 'Medium', tags: ['Valuation', 'Technical'], votes: 312, round: 'Superday', date: '2023-11-04' },
            { q: 'How are the three financial statements connected?', difficulty: 'Easy', tags: ['Accounting'], votes: 287, round: 'Phone screen', date: '2024-02-18' },
            { q: 'If you could only use one statement to value a company, which and why?', difficulty: 'Medium', tags: ['Accounting'], votes: 154, round: 'Superday', date: '2025-09-12' },
            { q: 'Walk me through a paper LBO.', difficulty: 'Hard', tags: ['Modeling', 'PE'], votes: 201, round: 'Superday', date: '2024-07-22' },
            { q: 'Why Morgan Stanley over other banks?', difficulty: 'Easy', tags: ['Behavioral', 'Fit'], votes: 176, round: 'All rounds', date: '2026-04-30' },
            { q: 'Pitch me a stock.', difficulty: 'Medium', tags: ['Markets'], votes: 142, round: 'Final', date: '2026-05-15' },
            { q: 'What happens to FCF if depreciation increases by $10?', difficulty: 'Medium', tags: ['Accounting'], votes: 98, round: 'Phone screen', date: '2022-10-08' },
            { q: 'Tell me about a time you worked on a team under a tight deadline.', difficulty: 'Easy', tags: ['Behavioral'], votes: 67, round: 'HireVue', date: '2026-03-02' },
          ],

          // ----- TAB 3: Networking (people to reach out to) -------------
          people: [
            { name: 'Jordan Avery', title: 'Financial Analyst', team: 'Global Capital Markets', tenure: '1 yr', school: 'NYU Stern', note: 'Recent grad — likely receptive to coffee chats.' },
            { name: 'Priya Nathan', title: 'Associate', team: 'M&A', tenure: '3 yrs', school: 'Univ. of Michigan', note: 'Was an analyst here; good for "path" questions.' },
            { name: 'Marcus Lee', title: 'VP', team: 'Equity Research', tenure: '7 yrs', school: 'Wharton', note: 'Senior — keep outreach short and specific.' },
            { name: 'Sofia Reyes', title: 'Campus Recruiter', team: 'Talent Acquisition', tenure: '4 yrs', school: 'Boston College', note: 'Owns analyst pipeline — worth a polite intro.' },
          ],

          // ----- TAB 4: Compensation ------------------------------------
          comp: {
            currency: 'USD',
            note: 'Self-reported ranges for NY-based Analyst roles. Bonus is highly variable.',
            bands: [
              { label: 'Base salary', low: 100000, mid: 110000, high: 120000 },
              { label: 'Signing bonus', low: 10000, mid: 15000, high: 20000 },
              { label: 'Year-end bonus', low: 30000, mid: 55000, high: 90000 },
            ],
          },

          // ----- TAB 5: Skills & Requirements ---------------------------
          requirements: {
            mustHave: ['Advanced Excel (no mouse)', 'Financial statement analysis', 'Valuation (DCF/Comps)', 'Attention to detail', 'PowerPoint / pitch decks'],
            niceToHave: ['SQL or Python', 'Bloomberg Terminal', 'Prior IB/PE internship', 'Capital IQ / FactSet'],
            certs: [
              { name: 'CFA Level I', why: 'Signals commitment; common for research/AM tracks.', url: 'https://www.cfainstitute.org/programs/cfa' },
              { name: 'Series 7 & 63', why: 'Sponsored after you join; required to be licensed.', url: 'https://www.finra.org/registration-exams-ce/qualification-exams/series7' },
              { name: 'WSP / BIWS Modeling', why: 'Practical modeling certification many candidates list.', url: 'https://www.wallstreetprep.com/' },
            ],
          },
        },
      ],
    },

    /* ===================== GOLDMAN SACHS =============================== */
    {
      id: 'goldman-sachs',
      name: 'Goldman Sachs',
      logo: 'GS',
      domain: 'goldmansachs.com',
      field: 'finance',
      industry: 'Investment Banking',
      hq: 'New York, NY',
      blurb: 'Premier global investment bank known for M&A advisory, trading, and asset management.',
      roles: [
        {
          id: 'investment-banking-analyst',
          title: 'Investment Banking Analyst',
          level: 'Entry / Analyst',
          summary: 'Execute M&A and capital-raising transactions: modeling, pitch books, and due diligence.',
          stats: { difficulty: 'Hard', applicants: '12,000+', interviews: 4, offerRate: '2%' },
          roadmap: [
            { section: 'Accounting & Valuation', nodes: [
              { id: 'gs-3stmt', title: '3 Statements & Linkages', difficulty: 'Easy', desc: 'Core accounting fluency.', resources: [{ label: 'Crash course', url: 'https://www.wallstreetprep.com/knowledge/the-three-financial-statements/' }] },
              { id: 'gs-val', title: 'Valuation Toolkit', difficulty: 'Medium', desc: 'DCF, comps, precedents.', resources: [{ label: 'Valuation overview', url: 'https://www.youtube.com/results?search_query=valuation+methods+investment+banking' }] },
            ]},
            { section: 'Modeling', nodes: [
              { id: 'gs-lbo', title: 'LBO & Paper LBO', difficulty: 'Hard', desc: 'Returns math under pressure.', resources: [{ label: 'Paper LBO', url: 'https://www.youtube.com/results?search_query=paper+lbo' }] },
              { id: 'gs-merger', title: 'Merger Model (Accretion/Dilution)', difficulty: 'Hard', desc: 'EPS impact of a deal.', resources: [{ label: 'Accretion/dilution', url: 'https://www.youtube.com/results?search_query=accretion+dilution+merger+model' }] },
            ]},
            { section: 'Fit', nodes: [
              { id: 'gs-why', title: 'Why Goldman / Why Banking', difficulty: 'Easy', desc: 'Tight, sincere narrative.', resources: [{ label: 'Behavioral prep', url: 'https://www.youtube.com/results?search_query=investment+banking+behavioral+questions' }] },
            ]},
          ],
          questions: [
            { q: 'Walk me through an accretion / dilution analysis.', difficulty: 'Hard', tags: ['Modeling'], votes: 188, round: 'Superday', date: '2024-09-10' },
            { q: 'What makes a good LBO candidate?', difficulty: 'Medium', tags: ['PE'], votes: 121, round: 'Superday', date: '2025-12-01' },
            { q: 'Why Goldman Sachs?', difficulty: 'Easy', tags: ['Fit'], votes: 205, round: 'All rounds', date: '2026-05-20' },
            { q: 'Walk me through your resume.', difficulty: 'Easy', tags: ['Behavioral'], votes: 144, round: 'HireVue', date: '2023-08-15' },
          ],
          people: [
            { name: 'Daniel Cho', title: 'Analyst', team: 'TMT', tenure: '2 yrs', school: 'Cornell', note: 'Active on alumni networks.' },
            { name: 'Aisha Khan', title: 'Associate', team: 'Healthcare', tenure: '4 yrs', school: 'Columbia', note: 'Mentors incoming analysts.' },
            { name: 'Tom Becker', title: 'Campus Recruiter', team: 'TA', tenure: '5 yrs', school: 'Rutgers', note: 'Owns the analyst funnel.' },
          ],
          comp: { currency: 'USD', note: 'Street-standard analyst comp, NY.', bands: [
            { label: 'Base salary', low: 100000, mid: 110000, high: 115000 },
            { label: 'Signing bonus', low: 10000, mid: 15000, high: 20000 },
            { label: 'Year-end bonus', low: 35000, mid: 60000, high: 95000 },
          ]},
          requirements: {
            mustHave: ['Excel modeling', 'Valuation', 'Resilience / long hours', 'Communication'],
            niceToHave: ['Prior IB internship', 'Python', 'Capital IQ'],
            certs: [
              { name: 'Series 79 & 63', why: 'Investment banking representative license (post-hire).', url: 'https://www.finra.org/registration-exams-ce/qualification-exams/series79' },
              { name: 'BIWS Modeling', why: 'Common practical modeling cert.', url: 'https://breakingintowallstreet.com/' },
            ],
          },
        },
      ],
    },

    /* ===================== JPMORGAN =================================== */
    {
      id: 'jpmorgan',
      name: 'JPMorgan Chase',
      logo: 'JPM',
      domain: 'jpmorganchase.com',
      field: 'finance',
      industry: 'Banking & Markets',
      hq: 'New York, NY',
      blurb: 'Largest U.S. bank with leading investment banking, markets, and quant research divisions.',
      roles: [
        {
          id: 'quant-analyst',
          title: 'Quantitative Analyst',
          level: 'Entry / Analyst',
          summary: 'Develop pricing models, risk analytics, and trading strategies. Heavy math, stats, and coding.',
          stats: { difficulty: 'Hard', applicants: '6,200+', interviews: 5, offerRate: '2%' },
          roadmap: [
            { section: 'Math & Probability', nodes: [
              { id: 'q-prob', title: 'Probability & Brainteasers', difficulty: 'Medium', desc: 'Expected value, conditional probability, classic puzzles.', resources: [{ label: 'Quant brainteasers', url: 'https://www.youtube.com/results?search_query=quant+interview+brainteasers' }] },
              { id: 'q-stoch', title: 'Stochastic Calculus', difficulty: 'Hard', desc: 'Brownian motion, Itô’s lemma, Black-Scholes derivation.', resources: [{ label: 'Stochastic calc intro', url: 'https://www.youtube.com/results?search_query=stochastic+calculus+for+finance' }] },
            ]},
            { section: 'Programming', nodes: [
              { id: 'q-python', title: 'Python / C++ for Quants', difficulty: 'Medium', desc: 'NumPy, pandas, vectorization, complexity.', resources: [{ label: 'Python for finance', url: 'https://www.youtube.com/results?search_query=python+for+quantitative+finance' }] },
              { id: 'q-ds', title: 'Data Structures & Algorithms', difficulty: 'Medium', desc: 'The "LeetCode" portion — arrays, DP, graphs.', resources: [{ label: 'LeetCode', url: 'https://leetcode.com/' }] },
            ]},
            { section: 'Derivatives', nodes: [
              { id: 'q-options', title: 'Options & the Greeks', difficulty: 'Hard', desc: 'Pricing, delta/gamma/vega, hedging.', resources: [{ label: 'Options pricing', url: 'https://www.youtube.com/results?search_query=options+greeks+explained' }] },
            ]},
          ],
          questions: [
            { q: 'A fair coin is flipped until two heads in a row. Expected number of flips?', difficulty: 'Hard', tags: ['Probability'], votes: 233, round: 'Technical', date: '2025-03-19' },
            { q: 'Derive the Black-Scholes PDE.', difficulty: 'Hard', tags: ['Derivatives'], votes: 167, round: 'Onsite', date: '2024-01-27' },
            { q: 'Implement an LRU cache.', difficulty: 'Medium', tags: ['Coding'], votes: 142, round: 'Coding', date: '2026-05-28' },
            { q: 'What is delta hedging and why do it?', difficulty: 'Medium', tags: ['Derivatives'], votes: 101, round: 'Onsite', date: '2023-06-11' },
          ],
          people: [
            { name: 'Wei Zhang', title: 'Quant Analyst', team: 'QR – Rates', tenure: '1 yr', school: 'MIT', note: 'PhD-to-industry; helpful on prep.' },
            { name: 'Elena Ivanova', title: 'Executive Director', team: 'Quant Research', tenure: '9 yrs', school: 'Princeton', note: 'Senior — concise, specific outreach only.' },
            { name: 'Raj Patel', title: 'Quant Recruiter', team: 'TA', tenure: '3 yrs', school: 'UIUC', note: 'Screens quant pipeline.' },
          ],
          comp: { currency: 'USD', note: 'Quant comp skews higher than generalist analyst.', bands: [
            { label: 'Base salary', low: 125000, mid: 140000, high: 160000 },
            { label: 'Signing bonus', low: 20000, mid: 30000, high: 40000 },
            { label: 'Year-end bonus', low: 40000, mid: 70000, high: 120000 },
          ]},
          requirements: {
            mustHave: ['Probability & statistics', 'Python or C++', 'Stochastic calculus', 'Linear algebra'],
            niceToHave: ['Kaggle / ML projects', 'Publications', 'KDB/q'],
            certs: [
              { name: 'CQF', why: 'Certificate in Quantitative Finance — practical quant credential.', url: 'https://www.cqf.com/' },
              { name: 'CFA', why: 'Less common for quants but signals finance breadth.', url: 'https://www.cfainstitute.org/programs/cfa' },
            ],
          },
        },
      ],
    },

    /* ===================== BLACKROCK ================================== */
    {
      id: 'blackrock',
      name: 'BlackRock',
      logo: 'BLK',
      domain: 'blackrock.com',
      field: 'finance',
      industry: 'Asset Management',
      hq: 'New York, NY',
      blurb: 'World’s largest asset manager, home of the Aladdin risk platform.',
      roles: [
        {
          id: 'risk-analyst',
          title: 'Risk Analyst',
          level: 'Entry / Analyst',
          summary: 'Measure and monitor portfolio risk across asset classes using analytics and the Aladdin platform.',
          stats: { difficulty: 'Medium', applicants: '4,100+', interviews: 4, offerRate: '4%' },
          roadmap: [
            { section: 'Risk Foundations', nodes: [
              { id: 'r-var', title: 'VaR & Risk Metrics', difficulty: 'Medium', desc: 'Value-at-Risk, stress testing, tracking error.', resources: [{ label: 'VaR explained', url: 'https://www.youtube.com/results?search_query=value+at+risk+explained' }] },
              { id: 'r-fixed', title: 'Fixed Income & Duration', difficulty: 'Medium', desc: 'Duration, convexity, credit spreads.', resources: [{ label: 'Duration & convexity', url: 'https://www.youtube.com/results?search_query=bond+duration+convexity' }] },
            ]},
            { section: 'Tools', nodes: [
              { id: 'r-python', title: 'Python / SQL', difficulty: 'Easy', desc: 'Data wrangling and analytics.', resources: [{ label: 'Python data analysis', url: 'https://www.youtube.com/results?search_query=python+data+analysis' }] },
            ]},
          ],
          questions: [
            { q: 'What is Value-at-Risk and what are its limitations?', difficulty: 'Medium', tags: ['Risk'], votes: 96, round: 'Onsite', date: '2026-04-05' },
            { q: 'Explain duration and convexity.', difficulty: 'Medium', tags: ['Fixed Income'], votes: 74, round: 'Technical', date: '2024-11-30' },
            { q: 'Why BlackRock / why risk?', difficulty: 'Easy', tags: ['Fit'], votes: 81, round: 'All rounds', date: '2025-10-14' },
          ],
          people: [
            { name: 'Hannah Park', title: 'Risk Analyst', team: 'RQA', tenure: '2 yrs', school: 'UCLA', note: 'Approachable for coffee chats.' },
            { name: 'Omar Haddad', title: 'Director', team: 'Aladdin Client Services', tenure: '8 yrs', school: 'Georgia Tech', note: 'Great for platform-side roles.' },
          ],
          comp: { currency: 'USD', note: 'Asset-management comp, NY.', bands: [
            { label: 'Base salary', low: 85000, mid: 95000, high: 110000 },
            { label: 'Signing bonus', low: 5000, mid: 10000, high: 15000 },
            { label: 'Year-end bonus', low: 15000, mid: 25000, high: 45000 },
          ]},
          requirements: {
            mustHave: ['Statistics', 'Fixed income basics', 'Python or SQL', 'Communication'],
            niceToHave: ['CFA progress', 'Aladdin familiarity', 'R / MATLAB'],
            certs: [
              { name: 'FRM', why: 'Financial Risk Manager — gold standard for risk roles.', url: 'https://www.garp.org/frm' },
              { name: 'CFA Level I', why: 'Broad investment knowledge.', url: 'https://www.cfainstitute.org/programs/cfa' },
            ],
          },
        },
      ],
    },
  ],
};

/* ---- tiny helpers shared by pages ---------------------------------------- */
function findCompany(companyId) {
  return DATA.companies.find((c) => c.id === companyId);
}
function findRole(companyId, roleId) {
  const c = findCompany(companyId);
  return c ? c.roles.find((r) => r.id === roleId) : null;
}
