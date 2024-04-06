'use client';

import { MantineColorsTuple, createTheme } from '@mantine/core';

const linkyColors: MantineColorsTuple = [
  '#e0fbff',
  '#cbf3ff',
  '#9ae3ff',
  '#64d3ff',
  '#3cc6fe',
  '#23befe',
  '#09b9ff',
  '#00a3e4',
  '#0091cd',
  '#007db5'
];

export const theme = createTheme({
  /* Put your mantine theme override here */
  primaryColor: 'linkyColors',
  colors: {
    linkyColors,
  },
});