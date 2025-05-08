import Sidebar from '@/components/Layout/Sidebar'
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />

      {/* Добавляем Google Tag Manager */}
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-4CF35VLT9T"></script>

      <script
        dangerouslySetInnerHTML={{
          __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-4CF35VLT9T');
            `,
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "TC Tours",
            "url": "https://transcaspiantours.com",
            "logo": "https://transcaspiantours.com/_next/static/media/Logo.851a0455.png",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+99365819336",
              "contactType": "Customer Service",
              "availableLanguage": ["English", "Russian"]
            },
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Office 1; Floor 1; International Business Centre, 1 Yunus Emre (1951) str; Parahat-2/1",
              "addressLocality": "Ashgabat",
              "addressRegion": "Ahal",
              "postalCode": "744000",
              "addressCountry": "TM"
            }
          })
        }}
      />

      <meta property="og:title" content="TC Tours - Discover Turkmenistan with Expert Guides" />
      <meta property="og:description" content="Explore the beauty of Turkmenistan with our guided tours. Discover ancient cities, beautiful landscapes, and rich culture." />
      <meta property="og:image" content="https://transcaspiantours.com/_next/static/media/Logo.851a0455.png" />
      <meta property="og:url" content="https://transcaspiantours.com" />
      <meta property="og:type" content="website" />

      <link rel="canonical" href="https://transcaspiantours.com" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="TC Tours - Discover Turkmenistan with Expert Guides" />
      <meta name="twitter:description" content="Explore the beauty of Turkmenistan with our guided tours. Discover ancient cities, beautiful landscapes, and rich culture." />
      <meta name="twitter:image" content="https://transcaspiantours.com/_next/static/media/Logo.851a0455.png" />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}