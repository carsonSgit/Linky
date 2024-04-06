
import '@mantine/core/styles.css';
import React from 'react';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import { theme } from './utils/theme';

export const metadata = {
  title: 'Linky',
  description: 'Chat with webpages',
};

export default function RootLayout({ children }: { children: JSX.Element }) {
  return (
    <>
      <html lang="en">
        <head>
          <ColorSchemeScript />
          <link rel="shortcut icon" href="/favicon.svg" />
          <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <MantineProvider theme={theme} defaultColorScheme='dark'>
            {children}
        </MantineProvider>
      </body>
    </html>
    </>
  );
}