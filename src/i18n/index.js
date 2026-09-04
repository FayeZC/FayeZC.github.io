export const LANGS = ['en', 'zh']
export const DEFAULT_LANG = 'en'

// English stays at the root so the CV can cite a clean https://fayezc.github.io/.
// Every other language gets a prefix.
export function localizePath(path, lang) {
  return lang === DEFAULT_LANG ? path : `/${lang}${path}`
}

export function otherLang(lang) {
  return lang === 'en' ? 'zh' : 'en'
}

export const htmlLang = { en: 'en', zh: 'zh-CN' }

// Translatable content is written as an { en, zh } pair; anything else (names,
// emails, paper titles) is a plain value that passes straight through.
export function pick(value, lang) {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    return value[lang] ?? value[DEFAULT_LANG]
  }
  return value
}

export const ui = {
  en: {
    nav: { home: 'Home', publications: 'Publications', blog: 'Blog', cv: 'CV' },
    about: 'About',
    education: 'Education',
    interests: 'Research Interests',
    ongoingProjects: 'Ongoing Projects',
    news: 'News',
    members: 'Members',
    papers: 'Papers',
    posters: 'Posters',
    revealEmail: 'Click me and find me',
    emailFallback: 'Email is JavaScript-gated to keep scrapers out — reach me on GitHub instead.',
    copyEmail: 'Click to copy',
    emailCopied: 'Copied',
    // Shown when the clipboard is unavailable, which is why the address gets
    // selected first: the keystroke is then all that is left to do.
    emailSelectToCopy: 'Selected — press ⌘C',
    // Factual, and on-brand for someone who studies this for a living.
    footer: 'Static site. No trackers, no cookies, no analytics.',

    // CV
    awards: 'Honors and Awards',
    researchExp: 'Research Experience',
    teaching: 'Teaching',
    service: 'Professional Service',
    skills: 'Skills',
    downloadCV: 'Download PDF',
    openCV: 'Open in a new tab',
    // Only ever seen inside the <object> fallback, when the browser cannot
    // render the PDF at all. Not a standfirst — without it that region is blank.
    cvNoEmbed: 'This browser will not display the PDF inline.',

    // Blog
    blogEmpty: 'Nothing written yet. A post is one Markdown file, so this will not stay empty long.',
    readMore: 'Read',
    backToBlog: 'All posts',
    postedOn: 'Posted',
    // Shown on a post that exists in one language only.
    noTranslation: 'This post has no Chinese version yet.',

    // 404
    notFoundTitle: 'Extinct',
    notFoundBody:
      'No page at this address. It may have moved, or it may never have existed — 66 million years is a long time.',
    notFoundHome: 'Back to the home page',
  },
  zh: {
    nav: { home: '首页', publications: '论文', blog: '博客', cv: '简历' },
    about: '关于',
    education: '教育经历',
    interests: '研究兴趣',
    ongoingProjects: '进行中的项目',
    news: '近况',
    members: '成员',
    papers: '论文',
    posters: '海报',
    revealEmail: '点我，把我找出来',
    emailFallback: '邮箱需要 JavaScript 才能显示，用来挡爬虫 —— 也可以在 GitHub 上找我。',
    copyEmail: '点击复制',
    emailCopied: '已复制',
    emailSelectToCopy: '已选中，按 ⌘C 复制',
    footer: '静态站点，无追踪，无 Cookie，无统计。',

    // CV
    awards: '荣誉与奖项',
    researchExp: '研究经历',
    teaching: '教学',
    service: '学术服务',
    skills: '技能',
    downloadCV: '下载 PDF',
    openCV: '在新标签打开',
    cvNoEmbed: '当前浏览器无法直接显示 PDF。',

    // Blog
    blogEmpty: '还没有写。一篇文章就是一个 Markdown 文件，所以不会空太久。',
    readMore: '阅读',
    backToBlog: '全部文章',
    postedOn: '发布于',
    noTranslation: '这篇还没有英文版。',

    // 404
    notFoundTitle: '已灭绝',
    notFoundBody: '这个地址下没有页面。可能是搬走了，也可能从来就不存在 —— 六千六百万年很长。',
    notFoundHome: '回到首页',
  },
}
