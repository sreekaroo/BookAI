'use client';

import { ThemeProvider } from 'next-themes';


import { ChakraProvider, defaultSystem } from '@chakra-ui/react';



export default function RootLayout(props: { children: React.ReactNode }) {
    return (
        <ChakraProvider value={defaultSystem}>
            <ThemeProvider attribute='class' disableTransitionOnChange>
                {props.children}
            </ThemeProvider>
        </ChakraProvider>
    );
}