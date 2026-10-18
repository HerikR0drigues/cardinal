import { createBrowserRouter } from 'react-router'
import AppLayout from '@/components/AppLayout'
import NotFoundPage from '@/pages/NotFoundPage'
import RankingPage from '@/pages/RankingPage'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: AppLayout,
    children: [
      { index: true, Component: RankingPage },
      { path: '*', Component: NotFoundPage },
    ],
  },
])
