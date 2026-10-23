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
// Bullets follow the usual CV shape: what was done, the key technical
// contribution, and the outcome.
export const experience = [
  {
    title: {
      en: 'Accountability of Agentic AI Systems in the Cloud',
      zh: '云上智能体 AI 系统的问责',
    },
    when: { en: 'Sep 2026 – Present', zh: '2026.09 – 至今' },
    where: { en: 'New York, NY', zh: '美国纽约' },
    role: {
      en: 'Supervisor: Prof. Ping Ji · Paper under review',
      zh: '导师：纪平教授 · 论文审稿中',
    },
    bullets: [
      {
        en: 'Conducted a large-scale measurement of audit evidence for LLM agent actions on Google Cloud and AWS, combining controlled agent deployments with scans of public agent and infrastructure-as-code repositories.',
        zh: '在 Google Cloud 与 AWS 上对 LLM agent 行为的审计证据开展大规模测量，结合受控的 agent 部署实验与对公开 agent 及基础设施即代码仓库的扫描。',
      },
      {
        en: 'Found that even with full logging, provider records attribute agent actions to the credential rather than the agent and cannot link an action to the model decision behind it; few public projects enable even the records that exist.',
        zh: '发现即使开启全部日志，云平台记录也只把 agent 的行为归到凭证而非 agent 本身，且无法把一次操作与其背后的模型决策关联起来；而公开项目中连现有记录都很少开启。',
      },
      {
        en: 'Designed a tamper-evident agent-side record that links each action to its decision through identifiers that provider logs also carry, and validated it against provider records on both clouds; paper under review.',
        zh: '设计了一种防篡改的 agent 端记录，借助云平台日志同样携带的标识符把每次操作与其决策关联起来，并在两个云平台上与平台记录完成交叉验证；论文审稿中。',
      },
    ],
  },
  {
    title: {
      en: 'Usable Security for Small Businesses',
      zh: '小型企业的可用安全',
    },
    when: { en: 'Oct 2024 – Present', zh: '2024.10 – 至今' },
    where: { en: 'New York, NY', zh: '美国纽约' },
    role: {
      en: 'Student Principal Investigator · Supervisor: Prof. Ping Ji · Full paper under review',
      zh: '学生负责人 · 导师：纪平教授 · 完整论文审稿中',
    },
    bullets: [
      {
        en: 'Designed and led a mixed-methods study of small-business cybersecurity (N=128: interviews, surveys, and 102 founder intercepts), conducting all data collection, qualitative analysis, and writing.',
        zh: '设计并主导了一项小型企业网络安全的混合方法研究（N=128，含访谈、问卷与 102 位创业者现场访问），独立完成全部数据收集、质性分析与写作。',
      },
      {
        en: 'Found that owners often report never being attacked even though 81% of small businesses reported a breach in the previous year (ITRC 2025), and traced this security illusion to semantic narrowing, structural invisibility, and delegated trust.',
        zh: '发现尽管 81% 的小型企业在过去一年报告过安全事件（ITRC 2025），企业主仍常说自己从未被攻击；并将这种「安全幻觉」归因于语义窄化、结构性不可见与信任外包。',
      },
      {
        en: 'Derived design implications for small AI-enabled teams, such as default-on audit signals and clear cloud responsibility boundaries; USENIX SOUPS 2026 poster, full paper under review.',
        zh: '据此为小型 AI 团队提出设计建议，如默认开启的审计信号与清晰的云服务责任边界；成果发表为 USENIX SOUPS 2026 海报，完整论文审稿中。',
      },
    ],
  },
  {
    title: {
      en: 'OPAL: Open Platform for Adaptive Learning Analytics',
      zh: 'OPAL：开放式自适应学习分析平台',
    },
    when: { en: 'Sep 2026 – Present', zh: '2026.09 – 至今' },
    where: { en: 'New York, NY', zh: '美国纽约' },
    role: {
      en: 'PI: Prof. Ping Ji · Designer and developer',
      zh: '项目负责人：纪平教授 · 设计与开发',
    },
    bullets: [
      {
        en: 'Designed and built OPAL, an open platform for adaptive learning: open to any course, because teachers bring their own slides and notes, and adaptive, because each student\'s practice follows their own mastery. In use at Hunter College and several secondary schools.',
        zh: '设计并开发 OPAL，一个开放的自适应学习平台：开放，是因为任何课程都能使用，教师上传自己的课件和笔记即可；自适应，是因为每个学生的练习都跟随自己的掌握程度调整。已在 Hunter College 及多所中学投入使用。',
      },
      {
        en: 'For teachers: AI-drafted quizzes in which every question cites its source in the course materials, a review step so nothing reaches students without approval, and analytics showing which concepts the class struggles with.',
        zh: '面向教师：由 AI 起草测验，每道题都注明在课程材料中的出处；所有内容经教师审核后才会发给学生；并通过数据分析展示全班在哪些知识点上遇到困难。',
      },
      {
        en: 'For students: self-paced practice that tracks mastery of each concept, points to weak spots, and never affects grades.',
        zh: '面向学生：按自己的节奏练习，系统追踪每个知识点的掌握情况、指出薄弱环节，且练习不计入成绩。',
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
        en: 'Measured 138,133 public SKILL.md files from 20,556 repositories against a defect taxonomy grounded in the official specification, finding that 91.8% contain at least one defect, mostly ordinary packaging problems such as weak routing metadata (first author).',
        zh: '对来自 20,556 个仓库的 138,133 个公开 SKILL.md 文件，依据官方规范建立的缺陷分类进行测量，发现 91.8% 至少含一个缺陷，且主要是路由元数据薄弱等普通的打包问题（第一作者）。',
      },
      {
        en: 'Showed with a routing stress test over 20,000 skills that these defects make skills harder for agents to retrieve, and proposed a quality-assured generation workflow combining spec-aware prompting, linting, automated repair, and safety gating.',
        zh: '通过对 20,000 个 skill 的路由压力测试，证明这些缺陷会降低 agent 检索 skill 的可靠性；并提出结合规范感知提示、lint 检查、自动修复与安全把关的质量保障生成流程。',
      },
      {
        en: 'Co-developed SkillsMetric, a five-stage static analysis framework for malicious skills (AUC 0.93 on 2,266 adversarial skills across 16 attack types), and identified its blind spots: host-destruction attacks evade all stages and prompt injection reaches only 42% detection, motivating defense in depth.',
        zh: '共同开发 SkillsMetric：一个五阶段的恶意 skill 静态分析框架（在覆盖 16 类攻击的 2,266 个对抗样本上 AUC 为 0.93），并找出其盲区：主机破坏类攻击可绕过全部阶段，提示注入的检出率仅 42%，说明需要纵深防御。',
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
        en: 'Built multi-agent experimental environments on the CybORG CAGE Challenges to evaluate LLMs as autonomous Blue-team defenders.',
        zh: '基于 CybORG CAGE Challenge 搭建多 agent 实验环境，评估 LLM 作为自主蓝方防御者的能力。',
      },
      {
        en: 'Ran prompt ablations benchmarking GPT-4o and GPT-5.2; presented as a poster at AIX Summit 2026.',
        zh: '通过 prompt 消融实验对比 GPT-4o 与 GPT-5.2；成果以海报形式发表于 AIX Summit 2026。',
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
        en: 'Full-stack developer for AeDA (Attainable eDucation for All), an AI-powered platform that generates personalized, goal-oriented learning paths.',
        zh: '担任 AeDA（Attainable eDucation for All）的全栈开发；该平台用 AI 生成个性化、目标导向的学习路径。',
      },
      {
        en: 'Designed and built the mobile app and web portal, and architected the platform\'s data storage on Google Cloud Platform.',
        zh: '设计并实现移动端与 Web 端，并在 Google Cloud Platform 上设计了平台的数据存储架构。',
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
        en: 'Curated datasets and co-wrote the manuscript for a graph-aware knowledge tracing framework that combines educator-curated knowledge graphs with Transformer models to generate learning paths in AeDA; published at ICWL 2025.',
        zh: '为一个图感知知识追踪框架构建数据集并参与论文撰写；该框架将教师整理的知识图谱与 Transformer 模型结合，在 AeDA 中生成学习路径；发表于 ICWL 2025。',
      },
    ],
  },
  {
    title: {
      en: 'Research Assistant, University of Michigan',
      zh: '密歇根大学 研究助理',
    },
    when: { en: 'Aug 2023 – Dec 2023', zh: '2023.08 – 2023.12' },
    where: { en: 'Ann Arbor and Dearborn, MI', zh: '美国密歇根州安娜堡与迪尔伯恩' },
    role: { en: 'Web Services Research', zh: 'Web 服务研究' },
    bullets: [
      {
        en: 'Analyzed developer questions about marketplace-managed web services, classifying question topics and answer patterns to inform API documentation and support; published at IEEE SSE 2024.',
        zh: '分析开发者关于平台托管 Web 服务的提问，对问题主题与回答模式进行分类，为改进 API 文档与支持提供依据；发表于 IEEE SSE 2024。',
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
        en: 'Co-authored a survey of music intervention in human life, work, and disease (IJCS 2023), and developed a rhythm-matching algorithm based on dynamic step frequency (ICCSE ’21).',
        zh: '合作撰写音乐干预在生活、工作与疾病中应用的综述（IJCS 2023），并开发了基于动态步频的节奏匹配算法（ICCSE ’21）。',
      },
      {
        en: 'Digitized Traditional Chinese Medicine manuscripts through image preprocessing, optical character recognition, and structured data annotation.',
        zh: '通过图像预处理、光学字符识别与结构化数据标注，参与中医古籍数字化。',
      },
    ],
  },
]

export const teaching = [
  {
    when: { en: 'Fall 2026', zh: '2026 秋' },
    what: {
      en: 'CSCI 49395 — Big Data Analytics and Applied Privacy, Hunter College, CUNY (Teaching Assistant)',
      zh: 'CSCI 49395 大数据分析与应用隐私，纽约市立大学 Hunter College（助教）',
    },
  },
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
