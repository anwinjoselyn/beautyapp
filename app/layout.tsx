import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nykaa Beauty Shop",
  description: "Nykaa Beauty Shop",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Script
          src="http://localhost:3001/en/embed/loader"
          data-security-key="key123"
          data-domain="example.com"
          data-brand="serenityjewels"
          defer
        ></Script>

        <Script id="chat-script" strategy="afterInteractive">
          {`
  // Wait for loader to run (deferred script runs after parse)
  // Example: identify after customer data is available
  (function waitForChat(){
    if (window.__CHAT_WIDGET && typeof window.__CHAT_WIDGET.identify === 'function') {
      // Call with customer info (name, email, customerId). Loader will attach security_key+domain
      window.__CHAT_WIDGET.identify({
        name: 'Alice Customer',
        email: 'alice@example.com',
        customerId: 'cust_12345'
      });

      // Optionally open the widget automatically
      window.__CHAT_WIDGET.open();
    } else {
      // Not ready yet: poll briefly
      setTimeout(waitForChat, 100);
    }
  })();
  `}
        </Script>
      </body>
    </html>
  );
}
