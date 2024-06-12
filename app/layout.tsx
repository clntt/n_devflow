import React from 'react';
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
import './globals.css';

import { Inter, Space_Grotesk } from 'next/font/google';
import type { Metadata } from 'react';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeProvider';


const inter = Inter({
  subsets : ['latin'],
  weight : ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable : '--font-inter'
})

const spaceGrotesk = Space_Grotesk({
  subsets : ['latin'],
  weight : ['300', '400', '500', '600', '700'],
  variable : '--font-spaceGrotesk'
})

export const metadata : Metadata = {
  title : 'N_devflow',
  description : 'devflow for developers',
  Icons : {
    icon : '/assets/images/site-logo.svg'
  }
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <ClerkProvider
          appearance={{
           elements : {
            formButtonPrimary : 'primary-gradient',
            footerActualLink : 'primary-text-gradient hover:text-primary-500'
          }
        }}
      >
    <html lang="en">
      <body className={`${inter.variable} ${spaceGrotesk.variable}`}>

        <ThemeProvider>
          {children}
        </ThemeProvider>
        {/* <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn> */}
        </body>
      </html>
        </ClerkProvider>
  )
}