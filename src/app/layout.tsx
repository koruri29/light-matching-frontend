import React from 'react';
import { ReactNode } from 'react'
import './globals.css'
import Image from 'next/image';


export const metadata = {
  title: 'My App',
  description: 'A basic Next.js app with layout',
  icons: {
    icon: '/favicon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <header className="flex items-center p-4 bg-[#2e2e2e] text-xl text-[#fafaf5] font-bold">
          <Image
            src='/favicon.png'
            alt='LightHub Work icon'
            width={36}
            height={36}
            className='mr-2.5'
          />
          <h1>LightHub Work</h1>
        </header>

        <main className="flex-grow min-h-[100vh] p-4 bg-[#e5e5e5]">
          {children}
        </main>

        <footer className="p-4 bg-[#2e2e2e] text-sm text-[#fafaf5] text-center">
          © 2025 LightHub Work
        </footer>
      </body>
    </html>
  )
}
