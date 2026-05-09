import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* یہ ہے وہ ہارڈ کوڈ ٹرک جو ہر حال میں ڈیزائن لوڈ کر دے گی */}
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body className="bg-white text-black min-h-screen">
        {children}
      </body>
    </html>
  );
}
