// Transcribed from cv-source/main.tex. `me` marks the author to bold on the page.
//
// `links` is rendered as-is: the keys become the link text, so write them the
// way they should read — { pdf: '…', arXiv: '…', code: '…' }. An empty object
// renders nothing, which is why every entry can stay listed while the URLs are
// still being collected.
//
// Published work is linked by DOI rather than by publisher URL: the DOI is the
// identifier that survives a journal changing its site, and doi.org resolves to
// wherever the paper has moved to. Preprints link to the arXiv abstract page
// rather than to the PDF, so the reader gets the abstract and the version
// history and can choose the format themselves.

export const me = 'Zhang, C.'

export const publications = [
  {
    year: 2026,
    authors: ['Zhang, C.', 'Liu, Y.', 'Chen, X.', 'Ji, P.'],
    title: 'What Keeps Agent Skills from Being Reusable? Evidence from 138K SKILL.md Files',
    venue: 'First Workshop on Agent Skills (AgentSkills), ACM CAIS 2026',
    short: 'AgentSkills @ CAIS',
    links: { arXiv: 'https://arxiv.org/abs/2608.08453' },
  },
  {
    year: 2026,
    authors: ['Chen, X.', 'Zhang, C.', 'Ji, P.', 'Liu, Y.'],
    title: 'SkillsMetric: Mapping the Detection Boundary of Static Analysis for Malicious Agent Skills',
    venue: 'First Workshop on Agent Skills (AgentSkills), ACM CAIS 2026',
    short: 'AgentSkills @ CAIS',
    links: { arXiv: 'https://arxiv.org/abs/2608.08468' },
  },
  {
    year: 2025,
    authors: ['Cai, J.', 'Zhang, C.', 'Ji, P.'],
    title: 'InsightFlow: A Generative AI Approach to Streamlining Knowledge and Learning Paths',
    // The LNCS volume carries a 2026 imprint; the conference, and the year the
    // paper belongs to, is 2025.
    venue: 'International Conference on Web-Based Learning (ICWL 2025), 240–255',
    short: 'ICWL',
    links: { DOI: 'https://doi.org/10.1007/978-981-92-0042-9_18' },
  },
  {
    year: 2023,
    authors: ['Gu, J.', 'Du, Y.', 'Zhang, C.', 'et al.'],
    title: 'Music Intervention in Human Life, Work, and Disease: A Survey',
    venue: 'International Journal of Crowd Science, 7(3), 97–105',
    short: 'IJCS',
    links: { DOI: 'https://doi.org/10.26599/IJCS.2023.9100003' },
  },
  {
    year: 2021,
    authors: ['Du, Y.', 'Zhang, C.', 'Wang, E.', 'et al.'],
    title: 'Music Rhythm Matching Based on Dynamic Step Frequency',
    venue: 'Proceedings of the 5th International Conference on Crowd Science and Engineering (ICCSE ’21), 113–118',
    short: 'ICCSE',
    links: { DOI: 'https://doi.org/10.1145/3503181.3503200' },
  },
]

// The poster PDFs are the A0 boards as printed, served from public/posters/.
// Note they carry the author contact addresses in their headers, the way a
// conference poster does — the site's own address is still gated behind
// <EmailReveal>, but these are the boards as they were shown.
export const posters = [
  {
    year: 2026,
    authors: ['Zhang, C.', 'Ji, P.', 'Zhang, Z.'],
    title: '“We Have Never Been Attacked”: Unpacking the Illusion of Cybersecurity in Small Business',
    venue: 'Symposium on Usable Privacy and Security (SOUPS 2026), Poster Session',
    short: 'SOUPS',
    links: { poster: '/posters/soups-2026-never-been-attacked-poster.pdf' },
  },
  {
    year: 2026,
    authors: ['Hanon, J.', 'Zhang, C.', 'Ji, P.'],
    title: 'Privacy Tradeoffs in the Digital Era: Public Views on Data Use, Monitoring, and Accountability',
    venue: 'Symposium on Usable Privacy and Security (SOUPS 2026), Poster Session',
    short: 'SOUPS',
    links: { poster: '/posters/soups-2026-privacy-tradeoffs-poster.pdf' },
  },
]
