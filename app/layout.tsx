import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'
import { AppProviders } from '@/components/providers/AppProviders'
import { ClerkProvider } from '@clerk/nextjs'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'RecipeRealm',
  description:
    'Everyday recipes with ratings and reviews by home cooks like you. Find easy dinner ideas, healthy recipes, plus helpful cooking tips and techniques.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider
      afterSignOutUrl={'/sign-in'}
      appearance={{
        elements: {
          formButtonPrimary:
            'bg-primary hover:bg-primary/90 text-sm !shadow-none',
        },
      }}
    >
      <html lang="en">
        <body className={inter.className}>
          <AppProviders>{children}</AppProviders>
          <Toaster richColors />
        </body>
      </html>
    </ClerkProvider>
  )
}
