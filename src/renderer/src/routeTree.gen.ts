/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as IndexImport } from './routes/index'
import { Route as HelpIndexImport } from './routes/help/index'
import { Route as AuthIndexImport } from './routes/auth/index'
import { Route as AppIndexImport } from './routes/app/index'
import { Route as AuthLayoutImport } from './routes/auth/_layout'
import { Route as AuthRegisterRouteImport } from './routes/auth/register.route'
import { Route as AuthLoginRouteImport } from './routes/auth/login.route'
import { Route as AuthForgotRouteImport } from './routes/auth/forgot.route'

// Create Virtual Routes

const AuthImport = createFileRoute('/auth')()

// Create/Update Routes

const AuthRoute = AuthImport.update({
  path: '/auth',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const HelpIndexRoute = HelpIndexImport.update({
  path: '/help/',
  getParentRoute: () => rootRoute,
} as any)

const AuthIndexRoute = AuthIndexImport.update({
  path: '/',
  getParentRoute: () => AuthRoute,
} as any)

const AppIndexRoute = AppIndexImport.update({
  path: '/app/',
  getParentRoute: () => rootRoute,
} as any)

const AuthLayoutRoute = AuthLayoutImport.update({
  id: '/_layout',
  getParentRoute: () => AuthRoute,
} as any)

const AuthRegisterRouteRoute = AuthRegisterRouteImport.update({
  path: '/auth/register',
  getParentRoute: () => rootRoute,
} as any)

const AuthLoginRouteRoute = AuthLoginRouteImport.update({
  path: '/auth/login',
  getParentRoute: () => rootRoute,
} as any)

const AuthForgotRouteRoute = AuthForgotRouteImport.update({
  path: '/auth/forgot',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/auth/forgot': {
      id: '/auth/forgot'
      path: '/auth/forgot'
      fullPath: '/auth/forgot'
      preLoaderRoute: typeof AuthForgotRouteImport
      parentRoute: typeof rootRoute
    }
    '/auth/login': {
      id: '/auth/login'
      path: '/auth/login'
      fullPath: '/auth/login'
      preLoaderRoute: typeof AuthLoginRouteImport
      parentRoute: typeof rootRoute
    }
    '/auth/register': {
      id: '/auth/register'
      path: '/auth/register'
      fullPath: '/auth/register'
      preLoaderRoute: typeof AuthRegisterRouteImport
      parentRoute: typeof rootRoute
    }
    '/auth': {
      id: '/auth'
      path: '/auth'
      fullPath: '/auth'
      preLoaderRoute: typeof AuthImport
      parentRoute: typeof rootRoute
    }
    '/auth/_layout': {
      id: '/auth/_layout'
      path: '/auth'
      fullPath: '/auth'
      preLoaderRoute: typeof AuthLayoutImport
      parentRoute: typeof AuthRoute
    }
    '/app/': {
      id: '/app/'
      path: '/app'
      fullPath: '/app'
      preLoaderRoute: typeof AppIndexImport
      parentRoute: typeof rootRoute
    }
    '/auth/': {
      id: '/auth/'
      path: '/'
      fullPath: '/auth/'
      preLoaderRoute: typeof AuthIndexImport
      parentRoute: typeof AuthImport
    }
    '/help/': {
      id: '/help/'
      path: '/help'
      fullPath: '/help'
      preLoaderRoute: typeof HelpIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  IndexRoute,
  AuthForgotRouteRoute,
  AuthLoginRouteRoute,
  AuthRegisterRouteRoute,
  AuthRoute: AuthRoute.addChildren({ AuthIndexRoute }),
  AppIndexRoute,
  HelpIndexRoute,
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/auth/forgot",
        "/auth/login",
        "/auth/register",
        "/auth",
        "/app/",
        "/help/"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/auth/forgot": {
      "filePath": "auth/forgot.route.tsx"
    },
    "/auth/login": {
      "filePath": "auth/login.route.tsx"
    },
    "/auth/register": {
      "filePath": "auth/register.route.tsx"
    },
    "/auth": {
      "filePath": "auth",
      "children": [
        "/auth/_layout",
        "/auth/"
      ]
    },
    "/auth/_layout": {
      "filePath": "auth/_layout.tsx",
      "parent": "/auth"
    },
    "/app/": {
      "filePath": "app/index.tsx"
    },
    "/auth/": {
      "filePath": "auth/index.tsx",
      "parent": "/auth"
    },
    "/help/": {
      "filePath": "help/index.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
