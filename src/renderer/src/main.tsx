import './assets/global.css'
import '7.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { createHashRouter, Navigate, RouterProvider } from 'react-router-dom'
import { RootRoute } from './routes/root.route'
import { UnauthenticatedRoute } from './routes/unauthenticated/Unauthenticated.route'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './common/query-client'
import { AuthenticatedRoute } from './routes/authenticated/Authenticated.route'
import { HomeRoute } from './routes/authenticated/home/Home.route'
import { HelpRoute } from './routes/authenticated/help/Help.route'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider
        router={createHashRouter([
          {
            path: '/',
            element: <RootRoute />,
            children: [
              {
                index: true,
                element: <UnauthenticatedRoute />
              },
              {
                path: '/app',
                element: <AuthenticatedRoute />,
                children: [
                  {
                    index: true,
                    element: <HomeRoute />
                  }
                ]
              },
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
        ])}
      />
    </QueryClientProvider>
  </React.StrictMode>
)
