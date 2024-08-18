import './assets/global.css'
import '7.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { HomeRoute } from './routes/home/Home.route'
import { RootRoute } from './routes/root.route'
import { HelpRoute } from './routes/help/Help.route'
import { IntlProvider } from 'react-intl'
import msgs from '../../../resources/intl/es.json'
import { OnAppStart } from './routes/-components/other/OnAppStart'
import { AppSequenceProvider } from './contexts/app-sequence.ctx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootRoute />,
    errorElement: <Navigate to={'/'} />,
    children: [
      {
        index: true,
        element: (
          <AppSequenceProvider>
            <HomeRoute />
          </AppSequenceProvider>
        )
      },
      // {
      //   path: '/settings',
      //   element: <SettingsRoute />
      // },
      {
        path: '/help',
        element: <HelpRoute />
      },
      {
        path: '*',
        element: <Navigate to={'/'} />
      }
    ]
  }
])

function App() {
  return (
    <IntlProvider locale="es" messages={msgs}>
      <OnAppStart />
      <RouterProvider router={router} />
    </IntlProvider>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
