import '@mantine/core/styles.css';
import '@mantine/code-highlight/styles.css';
import React from 'react';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { theme } from '../theme';

export const metadata = {
  title: 'Linky',
  description: 'Chat with Webpages',
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en">
      <head>
      <title>Linky</title>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <MantineProvider theme={theme} defaultColorScheme='dark'>  
          <Notifications />        
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
