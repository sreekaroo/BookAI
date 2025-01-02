import type { ReactNode } from 'react';



import type { Metadata } from 'next';
import localFont from 'next/font/local';



import '@/app/globals.css';



import './globals.css';
import Provider from "./provider";





const geistSans = localFont({
    src: './fonts/GeistVF.woff',
    variable: '--font-geist-sans',
    weight: '100 900'
});
const geistMono = localFont({
    src: './fonts/GeistMonoVF.woff',
    variable: '--font-geist-mono',
    weight: '100 900'
});

export const metadata: Metadata = {
    title: 'SummarAI',
    description: 'Collection of Book Summaries'
};

const Layout = ({ children }: Readonly<{ children: ReactNode }>) => {
    return (
        // ? https://github.com/pacocoursey/next-themes?tab=readme-ov-file#with-app
        // ? https://react.dev/reference/react-dom/client/hydrateRoot#suppressing-unavoidable-hydration-mismatch-errors
        <html suppressHydrationWarning={true} lang='en'>
            <body className={`${geistSans.variable} ${geistMono.variable}`}>
                <Provider>{children}</Provider>
            </body>
        </html>
    );
};

export default Layout;