// app/ThemeRegistry.tsx
'use client';

import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import createEmotionCache from './emotionCache';

const clientSideEmotionCache = createEmotionCache();

export default function ThemeRegistry({
                                          children
                                      }: {
    children: React.ReactNode
}) {
    return (
        <CacheProvider value={clientSideEmotionCache}>
            <ThemeProvider theme={{}}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </CacheProvider>
    );
}