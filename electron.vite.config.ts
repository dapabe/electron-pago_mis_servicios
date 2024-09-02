import { join, resolve } from 'node:path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'
//  @ts-ignore
import TanStackRouterVite from '@tanstack/router-plugin/vite'

export default defineConfig({
  main: {
    resolve: {
      alias: {
        '#shared': resolve('src/shared')
      }
    },
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    resolve: {
      alias: {
        '#shared': resolve('src/shared')
      }
    },
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        '#renderer': resolve('src/renderer/src'),
        '#shared': resolve('src/shared')
      }
    },
    plugins: [
      react(),
      TanStackRouterVite({
        routesDirectory: join(__dirname, 'src', 'renderer', 'src', 'routes'),
        generatedRouteTree: join(__dirname, 'src', 'renderer', 'src', 'routeTree.gen.ts'),
        routeFileIgnorePrefix: '-',
        quoteStyle: 'single'
      })
    ]
  }
})
