import { createBrowserRouter } from 'react-router'
import AppLayout from '@/components/AppLayout'
import AboutPage from '@/pages/AboutPage'
import AuthorPage from '@/pages/AuthorPage'
import HowItWorksPage from '@/pages/HowItWorksPage'
import NotFoundPage from '@/pages/NotFoundPage'
import RankingPage from '@/pages/RankingPage'
import RouteErrorPage from '@/pages/RouteErrorPage'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: AppLayout,
    children: [
      {
        ErrorBoundary: RouteErrorPage,
        children: [
          { index: true, Component: RankingPage },
          { path: 'como-funciona', Component: HowItWorksPage },
          { path: 'sobre', Component: AboutPage },
          { path: 'sobre-mim', Component: AuthorPage },
          { path: '*', Component: NotFoundPage },
        ],
      },
    ],
  },
])
