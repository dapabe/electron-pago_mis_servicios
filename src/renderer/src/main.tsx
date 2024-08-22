import '7.css'
import './assets/global.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { RootRoute } from './routes/root.route'
import { OnAppStart } from './routes/-components/other/OnAppStart'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider
      router={createBrowserRouter([
        {
          path: '/',
          element: <RootRoute />,
          // errorElement: <ErrorBoundary />,
          loader: RootRoute.loader,
          children: [
            {
              path: '/app',
              element: <OnAppStart />
            }
          ]

          // children: [
          // {
          //   index: true,
          //   element: <HomeRoute />
          // },
          // {
          //   path: '/help',
          //   element: <HelpRoute />
          // },
          // {
          //   path: '*',
          //   element: <Navigate to={'/'} />
          // }
          // ]
        }
      ])}
    />
  </React.StrictMode>
)
