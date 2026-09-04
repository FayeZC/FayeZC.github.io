// The rest of cv-source/main.tex, transcribed. Education lives in site.js
// (the homepage shows it too) and publications in publications.js; everything
// else the CV carries is here.
//
// Deliberately NOT transcribed: the phone number, and the email — the page
// renders the address through <EmailReveal> instead.
//
// Order within each list follows the CV rather than being re-sorted by date.
// The CV's order is an editorial choice about what to lead with, and silently
// resequencing it here would make the two documents disagree.

export const awards = [
  {
    when: '2023',
    what: {
      en: 'ACM CCS Individualized Cybersecurity Research Mentoring (iMentor) Workshop, Cohort',
      zh: 'ACM CCS 个性化网络安全研究导师计划（iMentor）工作坊，正式成员',
    },
  },
  {
    when: '2022',
    what: {
      en: 'Outstanding Student Award, School of Software, Shandong University',
      zh: '山东大学软件学院优秀学生',
    },
  },
  {
    when: '2020, 2021, 2022',
    what: {
      en: 'Innovation and Entrepreneurship Scholarship, Shandong University',
      zh: '山东大学创新创业奖学金',
    },
  },
]

// `role` is the CV's second line: position, supervisor and what came out of it.
export const experience = [
  {
    title: {
      en: 'Usable Security for Small Businesses',
      zh: '小型企业的可用安全',
    },
    when: { en: 'Oct 2024 – Present', zh: '2024.10 – 至今' },
    where: { en: 'New York, NY', zh: '美国纽约' },
    role: {
      en: 'Student Principal Investigator · Supervisor: Prof. Ping Ji · Full paper manuscript in preparation',
      zh: '学生负责人 · 导师：纪平教授 · 完整论文稿件准备中',
    },
    bullets: [
      {
        en: 'Independently designed and conducted a mixed-methods study (N=128) on small business cybersecurity, including all participant interviews, survey deployment, qualitative analysis, and manuscript writing.',
        zh: '独立设计并执行了一项关于小型企业网络安全的混合方法研究（N=128），包含全部访谈、问卷投放、质性分析与论文撰写。',
      },
      {
        en: 'Found that small business workers believe they are well-protected but often lack real security measures — a gap we call the security illusion, driven by semantic narrowing, structural invisibility, and delegated trust.',
        zh: '发现小型企业员工普遍自认防护良好，实际却缺少真实的安全措施；我们把这一落差称为「安全幻觉」，其成因是语义窄化、结构性不可见与信任外包。',
      },
    ],
  },
  {
    title: {
      en: 'Reusability and Security of Agent Skills',
      zh: 'Agent Skill 的可复用性与安全性',
    },
    when: { en: 'Mar 2026 – May 2026', zh: '2026.03 – 2026.05' },
    where: { en: 'New York, NY', zh: '美国纽约' },
    role: {
      en: 'Self-initiated · Supervisor: Prof. Ping Ji · Two workshop papers (ACM CAIS 2026)',
      zh: '自主发起 · 导师：纪平教授 · 两篇工作坊论文（ACM CAIS 2026）',
    },
    bullets: [
      {
        en: 'Led a large-scale empirical study of 138K SKILL.md files published after the agent skill format emerged, characterizing what prevents skills from being reused across projects (first author).',
        zh: '主导了一项针对 138K 个 SKILL.md 文件的大规模实证研究，刻画是什么阻碍了 skill 在项目间复用（第一作者）。',
      },
      {
        en: 'Co-developed SkillsMetric, mapping where static analysis succeeds and fails at detecting malicious agent skills.',
        zh: '共同开发 SkillsMetric，刻画静态分析在检测恶意 agent skill 时的能力边界。',
      },
    ],
  },
  {
    title: {
      en: 'LLM Agents for Cyber Defense',
      zh: '面向网络防御的大模型 Agent',
    },
    when: { en: 'Nov 2025 – Feb 2026', zh: '2025.11 – 2026.02' },
    where: { en: 'New York, NY', zh: '美国纽约' },
    role: {
      en: 'Supervisor: Prof. Ping Ji · Poster (AIX Summit 2026)',
      zh: '导师：纪平教授 · 海报（AIX Summit 2026）',
    },
    bullets: [
      {
        en: 'Built and configured multi-agent experimental environments on the CybORG CAGE Challenges, and ran prompt ablations benchmarking GPT-4o and GPT-5.2 as autonomous Blue defenders.',
        zh: '基于 CybORG CAGE Challenge 搭建并配置多 agent 实验环境，通过 prompt 消融实验对比 GPT-4o 与 GPT-5.2 作为自主蓝方防御者的表现。',
      },
    ],
  },
  {
    title: { en: 'AeDA Platform Development', zh: 'AeDA 平台开发' },
    when: { en: 'Sep 2024 – Present', zh: '2024.09 – 至今' },
    where: { en: 'New York, NY', zh: '美国纽约' },
    role: { en: 'Supervisor: Prof. Ping Ji', zh: '导师：纪平教授' },
    bullets: [
      {
        en: 'Full-stack developer for AeDA (Attainable eDucation for All), an AI-powered platform delivering personalized, goal-oriented learning paths. Built the mobile app and web portal, and architected the data storage infrastructure on Google Cloud Platform.',
        zh: '担任 AeDA（Attainable eDucation for All）的全栈开发。该平台用 AI 生成个性化、目标导向的学习路径；我负责移动端与 Web 端的设计实现，并在 Google Cloud Platform 上设计了数据存储架构。',
      },
    ],
  },
  {
    title: {
      en: 'Knowledge Tracing for Personalized Learning',
      zh: '面向个性化学习的知识追踪',
    },
    when: { en: 'Jul 2025 – Dec 2025', zh: '2025.07 – 2025.12' },
    where: { en: 'New York, NY', zh: '美国纽约' },
    role: {
      en: 'Supervisor: Prof. Ping Ji · Published (ICWL 2025)',
      zh: '导师：纪平教授 · 已发表（ICWL 2025）',
    },
    bullets: [
      {
        en: 'Contributed dataset curation and manuscript writing for a graph-aware knowledge tracing framework, combining educator-curated knowledge graphs with Transformer models to generate learning paths inside AeDA.',
        zh: '参与一个图感知知识追踪框架的数据集构建与论文撰写；该框架把教师整理的知识图谱与 Transformer 模型结合，在 AeDA 内生成学习路径。',
      },
    ],
  },
  {
    title: {
      en: 'Research Assistant, Shandong University',
      zh: '山东大学 研究助理',
    },
    when: { en: 'Nov 2020 – Jun 2023', zh: '2020.11 – 2023.06' },
    where: { en: 'Jinan, China', zh: '中国济南' },
    role: {
      en: 'Supervisors: Prof. Lizhen Cui, Prof. Yonghui Xu',
      zh: '导师：崔立真教授、徐勇会教授',
    },
    bullets: [
      {
        en: 'Interdisciplinary research on computational music analysis for health applications: co-authored a survey (IJCS 2023) and developed a dynamic rhythm-matching algorithm (ICCSE ’21).',
        zh: '面向健康应用的计算音乐分析交叉研究：合作撰写综述（IJCS 2023），并开发了一种动态节奏匹配算法（ICCSE ’21）。',
      },
      {
        en: 'Contributed to digitizing Traditional Chinese Medicine manuscripts through image preprocessing, optical character recognition, and structured data annotation.',
        zh: '参与中医古籍数字化，负责图像预处理、光学字符识别与结构化数据标注。',
      },
    ],
  },
]

export const teaching = [
  {
    when: { en: 'Spring 2026', zh: '2026 春' },
    what: {
      en: 'CSCI 49392 — Advanced Operating Systems, Hunter College, CUNY (Teaching Assistant; independently delivered lectures)',
      zh: 'CSCI 49392 高级操作系统，纽约市立大学 Hunter College（助教，并独立授课）',
    },
  },
  {
    when: { en: 'Fall 2025', zh: '2025 秋' },
    what: {
      en: 'CSCI 127 — Introduction to Computer Science, Hunter College, CUNY (Teaching Assistant)',
      zh: 'CSCI 127 计算机科学导论，纽约市立大学 Hunter College（助教）',
    },
  },
]

export const service = {
  heading: { en: 'Reviewer', zh: '审稿人' },
  items: [
    { when: '2026', what: { en: 'EMNLP 2026 Industry Track', zh: 'EMNLP 2026 Industry Track' } },
    {
      when: '2026',
      what: {
        en: 'ICLR 2026 Workshop on Memory in Agentic AI (MemAgents)',
        zh: 'ICLR 2026 Memory in Agentic AI 工作坊（MemAgents）',
      },
    },
    {
      when: '2026',
      what: {
        en: 'First Workshop on Agent Skills (AgentSkills), ACM CAIS 2026',
        zh: 'ACM CAIS 2026 首届 Agent Skills 工作坊',
      },
    },
    {
      when: '2025',
      what: {
        en: 'AAAI 2025 Undergraduate Consortium (UC)',
        zh: 'AAAI 2025 本科生论坛（UC）',
      },
    },
  ],
}

// Values stay in English: they are tool and language names, and translating
// "Python" or "Wireshark" would make them harder to recognise, not easier.
export const skills = [
  {
    group: { en: 'Programming', zh: '编程' },
    items: 'Python, Java, C/C++, JavaScript, SQL, Bash, LaTeX',
  },
  {
    group: { en: 'Frameworks & Tools', zh: '框架与工具' },
    items: 'LangChain, CybORG, Wireshark, Kali Linux, Git, Docker, GCP',
  },
  {
    group: { en: 'Security', zh: '安全' },
    items: {
      en: 'Network Defense, LLM-based Cyber Defense, Threat Analysis',
      zh: '网络防御、基于大模型的网络防御、威胁分析',
    },
  },
  {
    group: { en: 'AI & Productivity', zh: 'AI 与效率' },
    items: {
      en: 'Prompt Engineering, Advanced AI Coding Agents (Claude Code, Codex), Skills',
      zh: 'Prompt 工程、AI 编程 Agent（Claude Code、Codex）、Skills',
    },
  },
  {
    group: { en: 'Research Methods', zh: '研究方法' },
    items: {
      en: 'Mixed-Methods Study Design, Qualitative Analysis, AI-Augmented Workflow Design',
      zh: '混合方法研究设计、质性分析、AI 增强的工作流设计',
    },
  },
]
