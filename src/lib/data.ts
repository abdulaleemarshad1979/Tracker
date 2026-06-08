// ─── Ranks ───────────────────────────────────────────────────────────────────
export const RANKS = [
  { min: 0,     label: "Recruit",          icon: "🪖" },
  { min: 100,   label: "Cadet",            icon: "🎖️" },
  { min: 300,   label: "Analyst",          icon: "🔍" },
  { min: 700,   label: "Investigator",     icon: "🕵️" },
  { min: 1500,  label: "Pentester",        icon: "⚔️" },
  { min: 3000,  label: "Forensics Expert", icon: "🧪" },
  { min: 5000,  label: "Cyber Warrior",    icon: "🛡️" },
  { min: 10000, label: "Cyber Master",     icon: "👑" },
];

export function getRank(xp: number) {
  let rank = RANKS[0];
  for (const r of RANKS) { if (xp >= r.min) rank = r; }
  return rank;
}

export function getNextRank(xp: number) {
  for (const r of RANKS) { if (xp < r.min) return r; }
  return null;
}

// ─── Roadmap ─────────────────────────────────────────────────────────────────
export const ROADMAP = [
  {
    id: "linux",
    title: "Linux Fundamentals",
    icon: "🐧",
    color: "#22d3ee",
    sections: [
      { title: "Week 1 – Basics",       items: ["Install VirtualBox","Install Kali Linux","Learn pwd","Learn ls","Learn cd"] },
      { title: "Week 2 – Files",        items: ["mkdir","rm","cp","mv"] },
      { title: "Week 3 – Permissions",  items: ["chmod","chown","sudo"] },
      { title: "Week 4 – Networking",   items: ["ping","curl","wget","ip a"] },
    ],
  },
  {
    id: "networking",
    title: "Networking",
    icon: "🌐",
    color: "#818cf8",
    sections: [
      { title: "Core Topics", items: ["OSI Model","TCP/IP","Ports","DNS","DHCP","HTTP","HTTPS"] },
    ],
  },
  {
    id: "python",
    title: "Python",
    icon: "🐍",
    color: "#facc15",
    sections: [
      { title: "Fundamentals", items: ["Variables","Lists","Loops","Functions","Dictionaries","Modules"] },
    ],
  },
  {
    id: "cybersec",
    title: "Cybersecurity Fundamentals",
    icon: "🔐",
    color: "#34d399",
    sections: [
      { title: "Core Concepts", items: ["CIA Triad","Encryption","Hashing","Malware","Firewalls","IDS","IPS"] },
    ],
  },
  {
    id: "ethical",
    title: "Ethical Hacking",
    icon: "⚔️",
    color: "#f87171",
    sections: [
      { title: "Tools", items: ["Nmap","Wireshark","Burp Suite","Metasploit","Hydra","Hashcat"] },
    ],
  },
  {
    id: "forensics",
    title: "Digital Forensics",
    icon: "🔬",
    color: "#a78bfa",
    sections: [
      { title: "Tools & Skills", items: ["Autopsy","FTK Imager","Volatility","Registry Analysis","Memory Analysis","Log Analysis"] },
    ],
  },
];

// ─── Daily tasks ──────────────────────────────────────────────────────────────
export const DAILY_TASKS = [
  { id: "study30",  label: "Studied 30 minutes",  xp: 10 },
  { id: "notes",    label: "Took notes",           xp: 10 },
  { id: "practice", label: "Practiced hands-on",   xp: 20 },
  { id: "revision", label: "Did revision",         xp: 5  },
  { id: "video",    label: "Watched a video",      xp: 5  },
];

export const DAYS = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];

// ─── XP rewards reference ─────────────────────────────────────────────────────
export const XP_GUIDE = [
  { task: "Study 30 min",      xp: "+10 XP" },
  { task: "Take notes",        xp: "+10 XP" },
  { task: "Practice hands-on", xp: "+20 XP" },
  { task: "Revision",          xp: "+5 XP"  },
  { task: "Watch a video",     xp: "+5 XP"  },
  { task: "Complete a topic",  xp: "+20 XP" },
  { task: "Complete a day",    xp: "+50 XP" },
  { task: "Full week bonus",   xp: "+200 XP"},
];
