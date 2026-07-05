export type Capability = {
  id: string;
  name: string;
  category: string;
  description: string;
  permissions: string[];
  dependencies: string[];
  authRequired: boolean;
  risk: "Low" | "Medium" | "High";
};

export const capabilities: Capability[] = [
  {
    id: "cap.guide",
    name: "Guide Customer",
    category: "Assistance",
    description: "Walk the customer through any digital banking journey step by step.",
    permissions: ["read:journey.state"],
    dependencies: [],
    authRequired: false,
    risk: "Low",
  },
  {
    id: "cap.explain",
    name: "Explain Banking",
    category: "Assistance",
    description: "Explain banking concepts, product terms, and disclosures in the user's language.",
    permissions: ["read:knowledge.base"],
    dependencies: ["cap.guide"],
    authRequired: false,
    risk: "Low",
  },
  {
    id: "cap.fd",
    name: "Open Fixed Deposit",
    category: "Deposits",
    description: "Initiate an FD booking against an eligible savings account.",
    permissions: ["read:accounts", "write:fd.booking"],
    dependencies: ["cap.explain"],
    authRequired: true,
    risk: "Medium",
  },
  {
    id: "cap.cards",
    name: "Manage Cards",
    category: "Cards",
    description: "Block, replace, and re-issue debit / credit cards.",
    permissions: ["read:cards", "write:cards.block"],
    dependencies: [],
    authRequired: true,
    risk: "High",
  },
  {
    id: "cap.upi",
    name: "UPI Services",
    category: "Payments",
    description: "Register VPA, set limits, and troubleshoot UPI failures.",
    permissions: ["read:upi", "write:upi.limit"],
    dependencies: [],
    authRequired: true,
    risk: "Medium",
  },
  {
    id: "cap.kyc",
    name: "KYC Update",
    category: "Compliance",
    description: "Re-KYC via Aadhaar-verified flow with consent capture.",
    permissions: ["read:kyc", "write:kyc.update"],
    dependencies: [],
    authRequired: true,
    risk: "High",
  },
  {
    id: "cap.nominee",
    name: "Nominee Management",
    category: "Compliance",
    description: "Add / update nominees on deposit accounts.",
    permissions: ["write:nominee"],
    dependencies: ["cap.kyc"],
    authRequired: true,
    risk: "Medium",
  },
  {
    id: "cap.appt",
    name: "Branch Appointments",
    category: "Assistance",
    description: "Book branch visits with the nearest RM.",
    permissions: ["write:appointment"],
    dependencies: [],
    authRequired: false,
    risk: "Low",
  },
  {
    id: "cap.fraud",
    name: "Fraud Protection",
    category: "Security",
    description: "Detect suspicious intent, freeze accounts, escalate to fraud desk.",
    permissions: ["read:txn", "write:freeze"],
    dependencies: ["cap.cards"],
    authRequired: true,
    risk: "High",
  },
  {
    id: "cap.recovery",
    name: "Journey Recovery",
    category: "Assistance",
    description: "Resume abandoned digital journeys where the customer left off.",
    permissions: ["read:journey.state", "write:journey.resume"],
    dependencies: ["cap.guide"],
    authRequired: false,
    risk: "Low",
  },
];

export type Policy = {
  id: string;
  name: string;
  category: string;
  description: string;
  default: boolean;
};

export const policies: Policy[] = [
  { id: "pol.tee", name: "TEE Enabled", category: "Execution", description: "Run inside a Trusted Execution Environment.", default: true },
  { id: "pol.session", name: "Session-only Memory", category: "Memory", description: "Wipe context at end of session.", default: true },
  { id: "pol.zero", name: "Zero Retention", category: "Memory", description: "No customer data persists after journey.", default: true },
  { id: "pol.consent", name: "Consent Required", category: "Consent", description: "Explicit consent before any capability that reads PII.", default: true },
  { id: "pol.otp", name: "OTP Required", category: "Authentication", description: "OTP challenge before high-risk actions.", default: true },
  { id: "pol.auth", name: "Authentication Required", category: "Authentication", description: "Must be an authenticated YONO session.", default: true },
  { id: "pol.multi", name: "Multilingual", category: "Experience", description: "Respond in the language the customer speaks.", default: true },
  { id: "pol.risk", name: "Risk Threshold", category: "Risk", description: "Reject actions above configured risk score.", default: false },
  { id: "pol.audit", name: "Full Audit", category: "Audit", description: "Every intent, capability, and decision is logged.", default: true },
];

export type DigitalEmployee = {
  id: string;
  name: string;
  role: string;
  department: string;
  branch: string;
  status: "Active" | "Draft" | "Suspended" | "Coming Soon";
  avatar: string;
  capabilities: string[];
  policies: string[];
  journeys: number;
  completion: number;
  deployedAt?: string;
};

export const employees: DigitalEmployee[] = [
  {
    id: "DBO-001",
    name: "Aarav — Digital Banking Officer",
    role: "Digital Banking Officer",
    department: "Retail Banking",
    branch: "Digital Branch · Mumbai",
    status: "Active",
    avatar: "A",
    capabilities: ["cap.guide", "cap.explain", "cap.fd", "cap.cards", "cap.upi", "cap.recovery"],
    policies: ["pol.tee", "pol.session", "pol.zero", "pol.consent", "pol.otp", "pol.auth", "pol.multi", "pol.audit"],
    journeys: 128420,
    completion: 87,
    deployedAt: "2026-05-14",
  },
  {
    id: "DBO-002",
    name: "Meera — Digital KYC Officer",
    role: "Digital KYC Officer",
    department: "Compliance",
    branch: "Digital Branch · Bengaluru",
    status: "Coming Soon",
    avatar: "M",
    capabilities: ["cap.kyc", "cap.nominee", "cap.explain"],
    policies: ["pol.tee", "pol.session", "pol.zero", "pol.consent", "pol.otp", "pol.auth", "pol.audit"],
    journeys: 0,
    completion: 0,
  },
  {
    id: "DBO-003",
    name: "Rohan — Digital Fraud Officer",
    role: "Digital Fraud Officer",
    department: "Risk & Fraud",
    branch: "Digital Branch · Delhi",
    status: "Coming Soon",
    avatar: "R",
    capabilities: ["cap.fraud", "cap.cards"],
    policies: ["pol.tee", "pol.session", "pol.zero", "pol.otp", "pol.auth", "pol.risk", "pol.audit"],
    journeys: 0,
    completion: 0,
  },
  {
    id: "DBO-004",
    name: "Ishita — Digital Loan Officer",
    role: "Digital Loan Officer",
    department: "Lending",
    branch: "Digital Branch · Hyderabad",
    status: "Coming Soon",
    avatar: "I",
    capabilities: ["cap.explain", "cap.guide"],
    policies: ["pol.tee", "pol.consent", "pol.auth", "pol.audit"],
    journeys: 0,
    completion: 0,
  },
  {
    id: "DBO-005",
    name: "Kabir — Digital Teller",
    role: "Digital Teller",
    department: "Retail Banking",
    branch: "Digital Branch · Kolkata",
    status: "Coming Soon",
    avatar: "K",
    capabilities: ["cap.guide", "cap.upi", "cap.recovery"],
    policies: ["pol.tee", "pol.session", "pol.zero", "pol.auth", "pol.audit"],
    journeys: 0,
    completion: 0,
  },
];

export const dashboardMetrics = {
  employees: 12,
  journeys: 214839,
  completion: 87.4,
  deployments: 34,
  violations: 3,
  health: 99.98,
};

export const journeyTrend = [
  { day: "Mon", completed: 21400, started: 24800 },
  { day: "Tue", completed: 23100, started: 26200 },
  { day: "Wed", completed: 24880, started: 27300 },
  { day: "Thu", completed: 22990, started: 25100 },
  { day: "Fri", completed: 26120, started: 28800 },
  { day: "Sat", completed: 19230, started: 21200 },
  { day: "Sun", completed: 17040, started: 18900 },
];

export const capabilityUsage = [
  { name: "Guide", value: 41200 },
  { name: "Explain", value: 33810 },
  { name: "FD", value: 18420 },
  { name: "Cards", value: 15980 },
  { name: "UPI", value: 24660 },
  { name: "KYC", value: 9210 },
  { name: "Recovery", value: 12780 },
];

export const auditEvents = [
  { ts: "12:04:22", employee: "DBO-001", intent: "open_fd", capability: "cap.fd", policy: "pol.otp", status: "ALLOWED" },
  { ts: "12:04:19", employee: "DBO-001", intent: "block_card", capability: "cap.cards", policy: "pol.auth", status: "ALLOWED" },
  { ts: "12:04:14", employee: "DBO-001", intent: "explain_upi", capability: "cap.explain", policy: "pol.consent", status: "ALLOWED" },
  { ts: "12:04:08", employee: "DBO-001", intent: "high_value_txfr", capability: "cap.upi", policy: "pol.risk", status: "BLOCKED" },
  { ts: "12:03:59", employee: "DBO-001", intent: "recover_journey", capability: "cap.recovery", policy: "pol.session", status: "ALLOWED" },
  { ts: "12:03:41", employee: "DBO-001", intent: "book_appointment", capability: "cap.appt", policy: "pol.audit", status: "ALLOWED" },
];

export type AgentStep = {
  t: number; // seconds from start
  officer?: string;
  customer?: string;
  intent?: string;
  capability?: string;
  policy?: string;
  screen: "home" | "intent" | "eligibility" | "policy" | "capability" | "form" | "confirm" | "done";
  status: string;
};

export const agentScriptFD: AgentStep[] = [
  { t: 0, screen: "home", status: "Idle · TEE Session Open" },
  { t: 1, customer: "Mujhe Fixed Deposit kholna hai.", screen: "home", status: "Listening" },
  { t: 2, intent: "open_fd", screen: "intent", status: "Intent Detected: open_fd" },
  { t: 3, screen: "eligibility", capability: "cap.fd", status: "Checking Eligibility" },
  { t: 4, screen: "policy", policy: "pol.otp", status: "Policy Validation · OTP Required" },
  { t: 5, screen: "capability", capability: "cap.fd", status: "Invoking Capability · cap.fd" },
  {
    t: 6,
    officer: "Aap ₹1,25,000 tak ki FD kholne ke eligible hain. Main aapke liye form ready kar raha hoon.",
    screen: "form",
    status: "Form Ready",
  },
  { t: 9, screen: "form", status: "Awaiting Customer Input" },
  {
    t: 10,
    officer: "1 saal ke liye ₹1,00,000, interest 7.1% per annum. Confirm karein?",
    screen: "confirm",
    status: "Confirmation Requested",
  },
  { t: 13, customer: "Haan, confirm.", screen: "confirm", status: "Customer Confirmed" },
  { t: 14, screen: "done", status: "FD Booked · Journey Complete" },
];
