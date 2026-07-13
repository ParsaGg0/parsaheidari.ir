export const profile = {
  name: "Parsa Heidari",
  role: "Software Engineering Student",
  tagline: "Python · AI · NLP · Prompt Engineering",
  location: "Tehran, Iran",
  email: "heidarip680@gmail.com",
  phone: "09101162436",
  github: "ParsaGg",
  githubUrl: "https://github.com/ParsaGg",
  linkedin: "https://www.linkedin.com/in/parsa-heidary",
  summary:
    "Driven Software Engineering Student with a strong foundation in Python and a deep passion for artificial intelligence and machine learning. Hands-on academic experience in prompt engineering and foundational knowledge of deep learning and NLP. Eager to translate theoretical coursework into practical solutions within a collaborative R&D environment.",
};

export const stats = [
  { label: "GitHub Repos", value: null, suffix: "", key: "repos", hint: "public" },
  { label: "Stars Earned", value: null, suffix: "★", key: "stars", hint: "across repos" },
  { label: "Forks", value: null, suffix: "⑂", key: "forks", hint: "community" },
  { label: "Projects Built", value: "5", suffix: "+", key: "projects", hint: "shipped" },
];

export type SkillGroup = {
  title: string;
  lang: string;
  code: { lines: { indent?: number; tokens: { t: string; c?: string }[] }[] };
  copyText: string;
};

// tokens color keys: kw (keyword), str, fn, num, com, var, op, punct, plain
export const skillGroups: SkillGroup[] = [
  {
    title: "languages.ts",
    lang: "typescript",
    copyText: `// Programming Languages
const languages = {
  python:   { level: "Intermediate", years: 3 },
  html:     { level: "Familiar",     years: 2 },
  css:      { level: "Familiar",     years: 2 },
  typescript: { level: "Learning", years: 1 },
};`,
    code: {
      lines: [
        { tokens: [{ t: "// Programming Languages", c: "com" }] },
        {
          tokens: [
            { t: "const", c: "kw" },
            { t: " languages", c: "var" },
            { t: " = {", c: "punct" },
          ],
        },
        {
          indent: 2,
          tokens: [
            { t: "python", c: "fn" },
            { t: ":   { level: ", c: "punct" },
            { t: '"Intermediate"', c: "str" },
            { t: ", years: ", c: "punct" },
            { t: "3", c: "num" },
            { t: " },", c: "punct" },
          ],
        },
        {
          indent: 2,
          tokens: [
            { t: "html", c: "fn" },
            { t: ":     { level: ", c: "punct" },
            { t: '"Familiar"', c: "str" },
            { t: ",     years: ", c: "punct" },
            { t: "2", c: "num" },
            { t: " },", c: "punct" },
          ],
        },
        {
          indent: 2,
          tokens: [
            { t: "css", c: "fn" },
            { t: ":      { level: ", c: "punct" },
            { t: '"Familiar"', c: "str" },
            { t: ",     years: ", c: "punct" },
            { t: "2", c: "num" },
            { t: " },", c: "punct" },
          ],
        },
        {
          indent: 2,
          tokens: [
            { t: "typescript", c: "fn" },
            { t: ": { level: ", c: "punct" },
            { t: '"Learning"', c: "str" },
            { t: ", years: ", c: "punct" },
            { t: "1", c: "num" },
            { t: " },", c: "punct" },
          ],
        },
        { tokens: [{ t: "};", c: "punct" }] },
      ],
    },
  },
  {
    title: "ai_stack.py",
    lang: "python",
    copyText: `# AI & ML Technologies
ai_stack = {
    "prompt_engineering": "Intermediate",
    "large_language_models": ["Claude", "GPT", "ParsBERT"],
    "deep_learning": "foundations",
    "nlp": ["tokenization", "transformers", "sentiment"],
    "api_integration": ["Anthropic", "OpenAI", "HuggingFace"],
}`,
    code: {
      lines: [
        { tokens: [{ t: "# AI & ML Technologies", c: "com" }] },
        {
          tokens: [
            { t: "ai_stack", c: "var" },
            { t: " = {", c: "punct" },
          ],
        },
        {
          indent: 4,
          tokens: [
            { t: '"prompt_engineering"', c: "str" },
            { t: ": ", c: "punct" },
            { t: '"Intermediate"', c: "str" },
            { t: ",", c: "punct" },
          ],
        },
        {
          indent: 4,
          tokens: [
            { t: '"large_language_models"', c: "str" },
            { t: ": [", c: "punct" },
            { t: '"Claude"', c: "str" },
            { t: ", ", c: "punct" },
            { t: '"GPT"', c: "str" },
            { t: ", ", c: "punct" },
            { t: '"ParsBERT"', c: "str" },
            { t: "],", c: "punct" },
          ],
        },
        {
          indent: 4,
          tokens: [
            { t: '"deep_learning"', c: "str" },
            { t: ": ", c: "punct" },
            { t: '"foundations"', c: "str" },
            { t: ",", c: "punct" },
          ],
        },
        {
          indent: 4,
          tokens: [
            { t: '"nlp"', c: "str" },
            { t: ": [", c: "punct" },
            { t: '"tokenization"', c: "str" },
            { t: ", ", c: "punct" },
            { t: '"transformers"', c: "str" },
            { t: ", ", c: "punct" },
            { t: '"sentiment"', c: "str" },
            { t: "],", c: "punct" },
          ],
        },
        {
          indent: 4,
          tokens: [
            { t: '"api_integration"', c: "str" },
            { t: ": [", c: "punct" },
            { t: '"Anthropic"', c: "str" },
            { t: ", ", c: "punct" },
            { t: '"OpenAI"', c: "str" },
            { t: ", ", c: "punct" },
            { t: '"HuggingFace"', c: "str" },
            { t: "],", c: "punct" },
          ],
        },
        { tokens: [{ t: "}", c: "punct" }] },
      ],
    },
  },
  {
    title: "tools.sh",
    lang: "bash",
    copyText: `# Developer toolbox
$ git --version      # version control
$ github cli         # collaboration
$ code .             # VS Code
$ python -m venv .venv
$ pip install torch transformers`,
    code: {
      lines: [
        { tokens: [{ t: "# Developer toolbox", c: "com" }] },
        {
          tokens: [
            { t: "$ ", c: "op" },
            { t: "git", c: "fn" },
            { t: " --version      ", c: "plain" },
            { t: "# version control", c: "com" },
          ],
        },
        {
          tokens: [
            { t: "$ ", c: "op" },
            { t: "github", c: "fn" },
            { t: " cli         ", c: "plain" },
            { t: "# collaboration", c: "com" },
          ],
        },
        {
          tokens: [
            { t: "$ ", c: "op" },
            { t: "code", c: "fn" },
            { t: " .             ", c: "plain" },
            { t: "# VS Code", c: "com" },
          ],
        },
        {
          tokens: [
            { t: "$ ", c: "op" },
            { t: "python", c: "fn" },
            { t: " -m venv .venv", c: "plain" },
          ],
        },
        {
          tokens: [
            { t: "$ ", c: "op" },
            { t: "pip", c: "fn" },
            { t: " install ", c: "plain" },
            { t: "torch", c: "str" },
            { t: " ", c: "plain" },
            { t: "transformers", c: "str" },
          ],
        },
      ],
    },
  },
];

export type Project = {
  id: string;
  title: string;
  category: string;
  stack: string[];
  description: string;
  highlights: string[];
  status: "shipped" | "research";
  accent: string;
};

export const projects: Project[] = [
  {
    id: "smart-summarizer",
    title: "Smart Text Summarizer",
    category: "Python · LLM API Integration",
    stack: ["Python", "Claude API", "OpenAI API", "Prompt Engineering"],
    description:
      "A Python application that generates concise, accurate summaries of long-form documents using large language models.",
    highlights: [
      "Integrated Anthropic Claude & OpenAI APIs for multi-provider summarization",
      "Applied intermediate prompt engineering to control tone, constraints & formatting",
      "Evaluated outputs with baseline NLP quality metrics for reliability",
    ],
    status: "shipped",
    accent: "amber",
  },
  {
    id: "persian-sentiment",
    title: "Persian Sentiment Analyzer",
    category: "NLP · Deep Learning Fundamentals",
    stack: ["Python", "ParsBERT", "Hugging Face", "Pandas"],
    description:
      "A foundational text-classification pipeline that analyzes sentiment in Persian text using pre-trained transformers.",
    highlights: [
      "Implemented classification with pre-trained ParsBERT transformer",
      "Preprocessed & tokenized raw datasets with Pandas",
      "Documented model performance & evaluation metrics in an academic report",
    ],
    status: "research",
    accent: "green",
  },
  {
    id: "ai-water-recognition",
    title: "AI Water-Drinking Recognition",
    category: "Computer Vision · Web AI",
    stack: ["Python", "CV", "ML", "Web Deployment"],
    description:
      "A web-based AI app that recognizes whether a person is drinking water — from data collection to deployed model.",
    highlights: [
      "End-to-end roadmap: data collection, training, testing, deployment",
      "Designed MVP with cost estimation & tooling plan",
      "Targeted browser-deployable inference pipeline",
    ],
    status: "research",
    accent: "cyan",
  },
  {
    id: "ai-car-diagnostics",
    title: "AI Car Diagnostics",
    category: "ML · Computer Vision",
    stack: ["Python", "ML", "Computer Vision", "Deployment"],
    description:
      "An AI-based car diagnostics system using machine learning and computer vision to detect vehicle issues.",
    highlights: [
      "Roadmap covering data collection → training → testing → deployment",
      "MVP design with example code & prompts",
      "Engineered for Lovable compatibility & rapid iteration",
    ],
    status: "research",
    accent: "violet",
  },
];

export type Experience = {
  id: string;
  role: string;
  org: string;
  period: string;
  location: string;
  points: string[];
};

export const experiences: Experience[] = [
  {
    id: "mobinnet",
    role: "Network & Communications Intern",
    org: "Mobinnet Telecommunications",
    period: "Summer 2024",
    location: "Tehran, Iran",
    points: [
      "Gained practical exposure to enterprise-level network infrastructure & IT systems",
      "Collaborated with engineering teams on accurate documentation & foundational protocols",
    ],
  },
  {
    id: "shahed",
    role: "Technical Intern",
    org: "Shahed University",
    period: "Summer 2023",
    location: "Tehran, Iran",
    points: [
      "Supported hardware & software configuration tasks",
      "Troubleshot basic network connectivity issues alongside senior engineering staff",
    ],
  },
];

export type Education = {
  id: string;
  degree: string;
  school: string;
  detail: string;
  period: string;
};

export const educations: Education[] = [
  {
    id: "azad",
    degree: "Associate Degree — Professional Software Engineering",
    school: "Islamic Azad University, Qalehak Branch",
    detail: "Continuous (Kardani Peyvasteh) program · Tehran, Iran",
    period: "In progress",
  },
  {
    id: "shahid",
    degree: "Technical Diploma — Computer Network & Software",
    school: "Shahid Doctor Technical High School",
    detail: "Network & Software vocational track · Tehran, Iran",
    period: "Graduated 2024",
  },
];

export type Certificate = {
  title: string;
  issuer: string;
  status: "completed" | "in-progress";
};

export const certificates: Certificate[] = [
  {
    title: "AI Technologies (Level 1 & 2)",
    issuer: "TechnoSharif Innovation Center · Sharif University",
    status: "completed",
  },
  {
    title: "LLM & Generative AI Business Design",
    issuer: "TechnoSharif Innovation Center · Sharif University",
    status: "in-progress",
  },
];

// terminal commands rendered in the hero contact strip
export const terminalCommands = [
  { cmd: "connect --linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/parsa-heidary" },
  { cmd: "connect --github", label: "GitHub", href: "https://github.com/ParsaGg" },
  { cmd: "connect --email", label: "Email", href: "mailto:heidarip680@gmail.com" },
];
