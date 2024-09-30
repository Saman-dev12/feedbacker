'use client'

import "~/styles/globals.css";
import { GeistSans } from "geist/font/sans";
import Navbar from "~/components/Navbar";
import ProviderComponent from "~/lib/Provider"
import { ThemeProvider } from "~/lib/ThemeProvider";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${GeistSans.variable}`}>
      <body>
        <ProviderComponent>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ThemeWrapper>
              <Navbar/>
              {children}
            </ThemeWrapper>
          </ThemeProvider>
        </ProviderComponent>
      </body>
    </html>
  );
}

function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="hidden">{children}</div>;
  }

  return (
    <div className={`${resolvedTheme} min-h-screen bg-background antialiased`}>
      {children}
    </div>
  );
}