import '@/assets/styles/App.css';

import type { AppProps } from "next/app";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useState } from 'react';
import dynamic from 'next/dynamic';
const Head = dynamic(() => import('next/head'), { ssr: false })
const NextNProgress = dynamic(() => import('nextjs-progressbar'), { ssr: false })
import { AudioProvider } from '../context/AudioContext';


export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: Infinity,
          },
        },
      }),
  )

  return (
    <QueryClientProvider client={queryClient}>
      <NextNProgress
        color="#c2974a"
        startPosition={0.3}
        stopDelayMs={200}
        height={5}
        showOnShallow={true}
      />
      <Head>
        <link rel="icon" href="/Logo.png" />
        <title>TC Tours</title>
      </Head>
      <AudioProvider>
        <Component {...pageProps} />
      </AudioProvider>
    </QueryClientProvider>
  );
}
