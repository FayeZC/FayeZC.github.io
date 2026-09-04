// Content sourced from cv-source/main.tex (Overleaf). Keep the two in sync.
// Deliberately NOT published here: the phone number from the CV.
//
// Translatable fields are { en, zh } pairs; plain values are shared by both
// languages. See src/i18n/index.js.

// Prof. Ji's homepage, and the page on it that describes NeMo — the Computer
// Network and Mobile Systems lab, which they founded. Named here rather than
// inline so the two intros below cannot drift apart.
const ADVISOR_URL = 'https://pingjiweb-wmhreyqc.manus.space/'
const LAB_URL = 'https://pingjiweb-wmhreyqc.manus.space/research'

export const profile = {
  name: { en: 'Chi (Faye) Zhang', zh: '张弛' },
  handle: 'FayeZC',
  // The contact address, XOR'd and base64'd. Stored encoded rather than plain
  // because this repo goes public: plain text here would be findable through
  // GitHub code search, which would undo the point of gating it in the page.
  // Anyone reading src/lib/obfuscate.js can still reverse it in a second — the
  // aim is to defeat bulk harvesting, not a determined human.
  // To change it: npm run email -- new.address@example.com
  emailPayload: 'TEtTT1BJBElZak1HS0NGBElFRw==',
  title: {
    en: 'Ph.D. Student in Computer Science',
    zh: '计算机科学博士生',
  },
  affiliation: {
    en: 'The Graduate Center, CUNY',
    zh: '纽约市立大学研究生中心',
  },
  location: { en: 'New York, NY', zh: '美国纽约' },
  // The opening line of the About panel, split into segments because some of its
  // nouns are links and an { en, zh } string cannot carry markup without turning
  // the data file into HTML. Strings render as text; an object with `href`
  // renders as <a>, one with `mark` as a highlighted span. Note the spaces at
  // the segment boundaries: JSX collapses nothing here, so a missing one shows
  // up as two words run together.
  intro: {
    en: [
      'I am a Ph.D. student in Computer Science at the CUNY Graduate Center, advised by ',
      { text: 'Prof. Ping Ji', href: ADVISOR_URL },
      ' in the ',
      { text: 'NeMo Lab', href: LAB_URL },
      ' — Computer ',
      // The two syllables the lab's name is actually made of. Marked so the
      // sentence explains the name instead of just sitting next to it.
      { text: 'Ne', mark: true },
      'twork and ',
      { text: 'Mo', mark: true },
      'bile Systems.',
    ],
    // Not a translation of the English. Chinese goes institution, lab, advisor —
    // big to small — and states each plainly rather than folding the advisor
    // into a passive clause the way "advised by" does. NeMo has no letters to
    // pick out here, so the two words they stand for get marked instead.
    zh: [
      '我在纽约市立大学研究生中心读计算机科学博士，加入',
      { text: 'NeMo Lab', href: LAB_URL },
      '（计算机',
      { text: '网络', mark: true },
      '与',
      { text: '移动', mark: true },
      '系统实验室），导师为',
      { text: '纪平教授', href: ADVISOR_URL },
      '。',
    ],
  },
  // The hero avatar is the triceratops, not the photograph on the members wall,
  // so it carries its own alt text rather than borrowing that entry's.
  avatarAlt: {
    en: "Faye's pixel-art triceratops avatar",
    zh: 'Faye 的像素三角龙形象',
  },
  // Two lines, and they stay two lines. The second is an aside to the first
  // rather than a continuation of it, so a wrap left to fall wherever the column
  // happens to end splits the wrong sentence. The meta description joins them
  // back with a space — there is nowhere to put a line break in an attribute.
  tagline: {
    en: [
      'Measure the security of the software supply chain that AI agents are building.',
      'Stay Curious.',
    ],
    zh: ['测量 AI agent 正在搭建的那条软件供应链的安全性。', '保持好奇。'],
  },
  // Picks up where intro leaves off. The Chinese is one long line on purpose:
  // a wrapped template literal keeps its newline and indent, HTML collapses
  // that to a single space, and in Chinese a space mid-sentence is visible.
  bio: {
    en: `My research focuses on securing AI-agent software ecosystems: the skills agents install, the
         tools they call, and where malicious or over-privileged workflows escape detection. I also work
         on trustworthy AI-agent workflow systems in small-business settings, focusing on delegated
         authority, least privilege, accountable evidence, and recovery, with a growing interest in
         privacy-preserving federated multi-agent systems.`,
    zh: '我的研究聚焦于 AI agent 软件生态安全：agent 会安装哪些 skill、调用哪些工具，以及恶意或过度授权的 workflow 会在哪些环节逃过检测。我也以小型企业场景研究可信赖的 AI-agent workflow 系统，关注授权边界、最小权限、可追责证据和恢复，并继续关注隐私保护的联邦多 Agent 系统。',
  },
  // No mailto here on purpose — the address is rendered through <EmailReveal>,
  // which keeps it out of the HTML until a real click.
  links: [
    { label: { en: 'GitHub', zh: 'GitHub' }, href: 'https://github.com/FayeZC' },
    { label: { en: 'Google Scholar', zh: 'Google Scholar' }, href: 'https://scholar.google.com/citations?user=vHx5KNgAAAAJ&hl=en' },
    { label: { en: 'LinkedIn', zh: 'LinkedIn' }, href: 'https://www.linkedin.com/in/chi-zhang-5ba684328/' },
    { label: { en: 'CV', zh: '简历' }, href: '/cv', internal: true },
  ],
}

// Newest first. GPAs are on the CV and stay there — a homepage listing them
// reads as a job application rather than a research page.
// Date ranges are shared, not translated: they are numerals either way, and the
// pixel font is only crisp on its 12px grid, so the less text in it the better.
export const education = [
  {
    school: { en: 'The Graduate Center, CUNY', zh: '纽约市立大学研究生中心' },
    degree: { en: 'Ph.D. in Computer Science', zh: '计算机科学 博士' },
    where: { en: 'New York, NY', zh: '美国纽约' },
    when: { en: '2024.08 – present', zh: '2024.08 – 至今' },
  },
  {
    school: { en: 'Shandong University', zh: '山东大学' },
    degree: { en: 'B.E. in Software Engineering', zh: '软件工程 工学学士' },
    where: { en: 'Jinan, China', zh: '中国济南' },
    when: '2019.09 – 2023.06',
  },
]

export const interests = [
  { en: 'Cybersecurity', zh: '网络安全' },
  { en: 'Usable Security', zh: '可用安全' },
  { en: 'Generative AI Safety', zh: '生成式 AI 安全' },
  { en: 'Decentralized Privacy-Preserving ML', zh: '去中心化隐私保护机器学习' },
  { en: 'LLM-Assisted Education', zh: '大模型辅助教育' },
]

export const ongoingProjects = [
  {
    name: 'Trustworthy AI Agent Workflows',
    status: { en: 'Ongoing', zh: '进行中' },
    body: {
      en: 'Trustworthy AI-agent workflows for security monitoring and digital forensics, using small businesses as a stress-test setting.',
      zh: '面向安全监测与数字取证的可信 AI-agent workflow，以小型企业作为 stress-test 场景。',
    },
  },
  {
    name: 'AutoRSI',
    status: { en: 'Ongoing', zh: '进行中' },
    body: {
      en: 'A domain-agnostic framework for recursive self-improvement over naive methods, currently tested on formal code generation and agent-security benchmarks.',
      zh: '一个面向朴素基线方法的跨领域递归自我改进框架，目前在形式化代码生成与 agent-security benchmarks 上测试。',
    },
  },
  {
    name: 'Cyberpunk',
    status: { en: 'Ongoing', zh: '进行中' },
    body: {
      en: 'A cybersecurity benchmark platform for testing LLMs and agents on practical tasks, including CybORG/CAGE-style challenges.',
      zh: '一个用于测试 LLM 与 agent 实际安全任务能力的 cybersecurity benchmark platform，包括 CybORG/CAGE 风格的挑战。',
    },
  },
]

// Newest first.
export const news = [
  {
    date: '2026-08',
    body: {
      en: 'This site went live. Direct any problems to Zinc, Managing Editor, who brings a full year and a half of professional problem-handling experience.',
      zh: '这个主页上线了。有问题请联系责任编辑 Zinc —— 已有一年半专业处理问题经验。',
    },
  },
  {
    date: '2026-08',
    body: {
      en: 'Two posters accepted to SOUPS 2026, including “We Have Never Been Attacked”: Unpacking the Illusion of Cybersecurity in Small Business.',
      zh: '两篇海报入选 SOUPS 2026，其中包括 “We Have Never Been Attacked”: Unpacking the Illusion of Cybersecurity in Small Business。',
    },
  },
  {
    date: '2026-07',
    body: {
      en: 'Served as a reviewer for the EMNLP 2026 Industry Track.',
      zh: '担任 EMNLP 2026 Industry Track 审稿人。',
    },
  },
  {
    // Author notification was 13 May 2026; the workshop itself is 26 May in San
    // Jose. Dated by the acceptance, which is what the entry is about.
    date: '2026-05',
    body: {
      en: 'Two papers accepted to the First Workshop on Agent Skills (AgentSkills) at ACM CAIS 2026.',
      zh: '两篇论文被 ACM CAIS 2026 首届 Agent Skills 工作坊接收。',
    },
  },
  {
    date: '2026-01',
    body: {
      en: 'Teaching Assistant for CSCI 49392 Advanced Operating Systems at Hunter College, CUNY, delivering lectures. Happy to work with all the amazing students!',
      zh: '在 CUNY Hunter College 担任 CSCI 49392 高级操作系统助教并授课。很开心和这些优秀的学生一起学习！',
    },
  },
  {
    date: '2025',
    body: { en: 'InsightFlow published at ICWL 2025.', zh: 'InsightFlow 发表于 ICWL 2025。' },
  },
]

export const members = [
  {
    name: { en: 'Faye', zh: 'Faye' },
    role: { en: 'Ph.D. student · runs this place', zh: '博士生 · 站长' },
    image: { photo: 'faye-portrait-512' },
    // Who it is and who is next to her. A screen reader needs the photograph
    // identified, not Faye described — but the triceratops is the point of this
    // one, and a reader who cannot see it would otherwise miss the joke the
    // whole site is built on.
    alt: {
      en: 'Faye next to a triceratops skull at the museum',
      zh: 'Faye 和博物馆里的一具三角龙头骨',
    },
    note: {
      en: 'Publishes as Chi Zhang. Aspires to become a triceratops and spend her days eating grass. Works full time in service of the other two members.',
      zh: '论文上署名 Chi Zhang。志向是成为一只三角龙，每天吃草。全职为后面两位成员服务。',
    },
  },
  {
    name: { en: 'Zinc Zhang', zh: 'Zinc Zhang' },
    role: { en: 'Managing Editor', zh: '责任编辑' },
    // Shown as the actual photograph. Downsampling a studio portrait to a
    // palette produced a noisy mess next to the flat-shaded dino.
    image: { photo: 'zinc-512' },
    alt: {
      en: 'Zinc Zhang, a charcoal tuxedo cat with a white bib and gold eyes',
      zh: 'Zinc Zhang，一只炭灰色燕尾服猫，白胸兜，金色眼睛',
    },
    note: {
      en: 'White bib, gold eyes, walks across the keyboard at load-bearing moments and signs off on the result. Consulting rate: 4 shrimp per hour. Takes feedback at random.',
      zh: '白胸兜，金色眼睛，总在最关键的时刻踩过键盘，并对结果签字负责。咨询时薪 4 只虾。随机接受反馈。',
    },
  },
  {
    name: { en: 'Byte Zhang', zh: 'Byte Zhang' },
    role: { en: 'Out sick', zh: '病假中' },
    image: { photo: 'byte-512' },
    alt: {
      en: 'Byte Zhang, a cream tabby cat wearing a recovery cone',
      zh: 'Byte Zhang，一只戴着伊丽莎白圈的奶油色虎斑猫',
    },
    note: {
      en: 'Injured toe bean, on medical leave, not handling issues at present. Currently wearing the cone of shame and taking it personally.',
      zh: '肉垫受伤，医疗假中，暂不处理工作。目前戴着伊丽莎白圈，并认为这是针对他个人的。',
    },
  },
]
