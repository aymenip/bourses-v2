import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

// tanstack query
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"

// themes
import { ThemeProvider } from "@/components/theme-provider"

// translations
import i18n from './i18n.ts'
import { I18nextProvider } from 'react-i18next'

// routes
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

// Create a new router instance
const router = createRouter({ routeTree })


// tanstack query client  
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 5,
      retryDelay: 1000
    },
  }
})

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <I18nextProvider i18n={i18n}>
          <RouterProvider router={router} />
        </I18nextProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
