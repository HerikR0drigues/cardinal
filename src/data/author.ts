export interface AuthorLink {
  label: string
  description: string
  href: string
}

export interface TimelineEntry {
  title: string
  subtitle: string
  period: string
  highlights?: string[]
}

export interface SkillGroup {
  group: string
  items: string[]
}

export interface Certification {
  name: string
  issuer: string
  date: string
}

export const author = {
  name: 'Herik T. Rodrigues',
  headline: 'Software Engineer · Frontend',
  location: 'Florianópolis, SC',
  bio: [
    'Sou desenvolvedor Frontend há cerca de dois anos, em Florianópolis. Trabalho com Vue.js e React, e me dedico a UI/UX, design systems e IA aplicada.',
    'O Cardinal é um projeto autoral e nasceu de uma dificuldade minha: descobrir qual cartão de crédito era o melhor para o meu perfil. Cada banco tem a sua regra de anuidade, de retorno, de salas VIP e de câmbio, e comparar tudo isso na mão nunca fechava a conta.',
    'Construí o Cardinal para concentrar essa comparação num lugar só. Você informa quanto tem investido e quanto gasta por mês, e ele mostra o que zera de anuidade e qual cartão entrega o melhor custo-benefício para o seu perfil, com as fontes e um selo de confiança em cada dado.',
  ],
  links: [
    {
      label: 'LinkedIn',
      description: 'linkedin.com/in/herikrodrigues',
      href: 'https://www.linkedin.com/in/herikrodrigues',
    },
    {
      label: 'GitHub',
      description: 'github.com/HerikR0drigues',
      href: 'https://github.com/HerikR0drigues',
    },
    {
      label: 'E-mail',
      description: 'herikrodr@hotmail.com',
      href: 'mailto:herikrodr@hotmail.com',
    },
  ] satisfies AuthorLink[],
  experience: [
    {
      title: 'Frontend Developer',
      subtitle: 'Florianópolis, SC',
      period: 'dez 2024 – atual',
      highlights: [
        'Mantenho e evoluo diversos módulos do software, com gerenciamento de estado em Vuex e testes automatizados com Jest.',
        'Crio componentes reutilizáveis e responsivos, integro APIs REST (JSON) e atuo com backend, design e produto da definição à entrega.',
      ],
    },
  ] satisfies TimelineEntry[],
  education: [
    {
      title: 'Bacharelado em Sistemas de Informação',
      subtitle: 'Universidade do Sul de Santa Catarina (Unisul)',
      period: '2020 – 2024 · concluído',
    },
    {
      title: 'Tecnólogo em Análise e Desenvolvimento de Sistemas',
      subtitle: 'Unisul',
      period: '2024 – atual · último semestre',
    },
  ] satisfies TimelineEntry[],
  skills: [
    { group: 'Frontend', items: ['Vue.js 3', 'React', 'TypeScript', 'Vuex', 'Vuetify', 'JavaScript', 'HTML', 'CSS', 'Jest'] },
    { group: 'Integração e dados', items: ['APIs REST', 'JSON', 'SQL', 'Python'] },
    { group: 'Ferramentas', items: ['Git', 'Docker'] },
    {
      group: 'UI/UX',
      items: ['Design System', 'UI Design', 'Grids', 'Tipografia', 'Cores'],
    },
    { group: 'IA aplicada', items: ['Desenvolvimento AI-native', 'Claude (skills, artifacts, tools)'] },
    { group: 'Idiomas', items: ['Português nativo', 'Inglês intermediário'] },
  ] satisfies SkillGroup[],
  certifications: [
    { name: 'Career in AI-Native Software Engineering', issuer: 'Alura', date: 'out 2026 · 94h' },
    { name: 'Dare with Vue.js 3 Framework', issuer: 'Alura', date: 'set 2026 · 34h' },
    {
      name: 'Claude: skills, artifacts e integração de ferramentas',
      issuer: 'Alura',
      date: 'set 2026',
    },
    { name: 'Containers e Docker', issuer: 'Alura', date: 'set 2026' },
    { name: 'Design System: padronização de interfaces', issuer: 'Alura', date: 'set 2026' },
    { name: 'UI Design for Developers', issuer: 'Alura', date: 'set 2026' },
    { name: 'UI for Devs: fundamentos de design', issuer: 'Alura', date: 'set 2026' },
    { name: 'Grids, Tipografia e Cores em design', issuer: 'Alura', date: 'set 2026 · 3 cursos' },
    { name: 'JavaScript Pro: conceitos avançados', issuer: 'Udemy', date: '' },
  ] satisfies Certification[],
}
