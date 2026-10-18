export interface NavigationLink {
  to: string
  label: string
}

export const navigationLinks: NavigationLink[] = [
  { to: '/', label: 'Ranking' },
  { to: '/como-funciona', label: 'Como funciona' },
  { to: '/sobre', label: 'Sobre' },
]
