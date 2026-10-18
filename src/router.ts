import { createBrowserRouter } from 'react-router'
import AppLayout from '@/components/AppLayout'
import AboutPage from '@/pages/AboutPage'
import HowItWorksPage from '@/pages/HowItWorksPage'
import NotFoundPage from '@/pages/NotFoundPage'
import RankingPage from '@/pages/RankingPage'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: AppLayout,
    children: [
      { index: true, Component: RankingPage },
      { path: 'como-funciona', Component: HowItWorksPage },
      { path: 'sobre', Component: AboutPage },
      { path: '*', Component: NotFoundPage },
    ],
  },
])
