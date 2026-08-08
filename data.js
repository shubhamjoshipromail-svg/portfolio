// Real GitHub data, regenerated 2026-08-08 from the REST API.
// Axis matches the page script: WEEKS = 22, week 0 = Monday 2026-03-09, week 21 = NOW.
//
// State definition:
//   live    = a public URL returns 200 today (verified by request, not assumed)
//   active  = committed within the last 21 days
//   shelved = everything else
//
// One deliberate override: nimbus responds 200 but is marked shelved, because
// the work index presents it as abandoned after the hackathon and the figure
// should not contradict the prose.
//
// COMMIT COUNTS ARE COMMITS AUTHORED BY SHUBHAM JOSHI, not repo totals.
// The repos contain 377 commits; 33 of those belong to other people
// (31 to the Phaser template author in questforge-ai, 2 to hackathon
// teammates in hacknation_bluejays). VOLUME sums to 344.
//
// SHIPS (Fig 01) = 12 projects. Excludes the profile-README repo, merges
// negotiation-agent into hacknation (a snapshot of the same repo), and omits
// the two March coursework notebooks, which appear in Fig 03 instead.
// ACHP and The Long Road have no GitHub repo; The Long Road's extent comes
// from its Railway deploy dates, ACHP's is engagement span, not measured.

window.SHIPS = [
  {"name":"ACHP","domain":"policy data · client","start":0,"end":21,"state":"active"},
  {"name":"fridgechef","domain":"consumer AI","start":3,"end":8,"state":"live"},
  {"name":"questforge-ai","domain":"engine template","start":4,"end":8,"state":"shelved"},
  {"name":"rxcheck","domain":"clinical decision support","start":5,"end":13,"state":"live"},
  {"name":"nimbus","domain":"consumer health","start":6,"end":6,"state":"shelved"},
  {"name":"portfolio","domain":"recruiter-facing portfolio","start":6,"end":13,"state":"shelved"},
  {"name":"dating-agent-rl","domain":"reinforcement learning","start":7,"end":8,"state":"live"},
  {"name":"opspilot-ai","domain":"ops machine learning","start":8,"end":8,"state":"live"},
  {"name":"AgentDock","domain":"agent infrastructure","start":10,"end":20,"state":"active"},
  {"name":"hacknation","domain":"negotiation agent","start":18,"end":19,"state":"shelved"},
  {"name":"The Long Road","domain":"interactive essay","start":18,"end":19,"state":"live"},
  {"name":"skeleton-to-body","domain":"computational morphology","start":20,"end":21,"state":"active"}
];

window.TICKS = [
  {"m":0,"l":"MAR 2026"},
  {"m":4,"l":"APR"},
  {"m":9,"l":"MAY"},
  {"m":13,"l":"JUN"},
  {"m":17,"l":"JUL"},
  {"m":21,"l":"NOW"}
];

window.VOLUME = [
  {"name":"AgentDock","c":225,"state":"active"},
  {"name":"fridgechef","c":26,"state":"live"},
  {"name":"hacknation","c":19,"state":"shelved"},
  {"name":"rxcheck","c":19,"state":"live"},
  {"name":"portfolio","c":17,"state":"shelved"},
  {"name":"dating-agent-rl","c":16,"state":"live"},
  {"name":"skeleton-to-body","c":5,"state":"active"},
  {"name":"nimbus","c":4,"state":"shelved"},
  {"name":"shubhamjoshipromail-svg","c":4,"state":"shelved"},
  {"name":"bank-marketing-ml","c":3,"state":"shelved"},
  {"name":"property-automl","c":3,"state":"shelved"},
  {"name":"questforge-ai","c":1,"state":"shelved"},
  {"name":"negotiation-agent","c":1,"state":"shelved"},
  {"name":"opspilot-ai","c":1,"state":"live"}
];
