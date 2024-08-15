import './assets/global.css'
import '7.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { HomeRoute } from './routes/home/Home.route'
import { SettingsRoute } from './routes/settings/Settings.route'
import { RootRoute } from './routes/root.route'
import { NotFoundRoute } from './routes/notFound.route'
import { AboutRoute } from './routes/about/About.route'
import { IntlProvider } from 'react-intl'
import msgs from '../../../resources/intl/es.json'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootRoute />,
    children: [
      {
        index: true,
        element: <HomeRoute />
      },
      {
        path: '/settings',
        element: <SettingsRoute />
      },
      {
        path: '/about',
        element: <AboutRoute />
      },
      {
        path: '*',
        element: <NotFoundRoute />
      }
    ]
  }
])

function App() {
  return (
    <IntlProvider locale="es" messages={msgs}>
      <RouterProvider router={router} />
    </IntlProvider>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
