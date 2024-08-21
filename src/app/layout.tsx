import { ReactNode } from 'react';

import { Mulish } from 'next/font/google';

import type { Metadata } from 'next';

import './globals.css';

import ScrollToTop from '@/app/wordpress-plugin/[slug]/components/ScrollToTop/ScrollToTop';
import Header from '@/app/wordpress-plugins/components/Header/Header';
import { Footer } from '@/app/components/Footer/Footer';
import Search from '@/app/components/Search';

import styles from './layout.module.css';

const mulish = Mulish({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'WordPress plugins',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function (w, d, s, l, i) { w[l] = w[l] || []; w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' }); var f = d.getElementsByTagName(s)[0], j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : ''; j.async = false; j.src = 'https://metrics.10web.io/gtm.js?id=' + i + dl; f.parentNode.insertBefore(j, f); })(window, document, 'script', 'dataLayer', 'GTM-M6GPZ95');`,
          }}
        />
        <link
          href="https://10web.io/wp-content/themes/10web-theme/images/favicon.png"
          type="image/x-icon"
          rel="icon"
        />
      </head>
      <body className={mulish.className}>
        <div className={styles.main}>
          <Header>
            <Search />
          </Header>
          {children}
          <Footer />
          <ScrollToTop />
        </div>
        <noscript>
          <iframe
            src="https://metrics.10web.io/ns.html?id=GTM-M6GPZ95"
            style={{ visibility: 'hidden', display: 'none' }}
            height="0"
            width="0"
          ></iframe>
        </noscript>
      </body>
    </html>
  );
}
