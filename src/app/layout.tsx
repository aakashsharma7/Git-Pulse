import { Metadata } from 'next';
import { PropsWithChildren } from 'react';
import { ThemeProvider } from '@/theme/ThemeProvider';
import Navbar from '../components/Navbar';
import './index.css';
import Footer from '@/components/Footer';
import { Toaster } from 'sonner';
import Head from 'next/head';

declare global {
  interface Window {
    dataLayer: any[];
  }
}

export const metadata: Metadata = {
  title: 'GitPulse',
  description: 'GitPulse is a web application that allows you to explore your GitHub profile, monitor repository activity, and stay updated with the latest changes in your projects.',
  manifest: '/site.webmanifest',
  icons: {
    icon: '/favicon.ico',
  },
  // TODO: Add Open Graph metadata
};

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" href="/github.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Uncomment below if using Google Fonts */}
        {/* <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap" rel="stylesheet" /> */}
        
        {/* Google Analytics */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=G-YWK98HYXY1`}
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-NLRFM8ML0P');
            `,
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          <Navbar />
          <Toaster />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
