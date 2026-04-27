// Root layout — passthrough. The real <html>/<body> lives in [locale]/layout.tsx
// per the next-intl App Router pattern.
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
