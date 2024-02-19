import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import { cookies } from "next/headers";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  publisher: "XBrand",
  title: "XBrand - Fashionable Pakain for Every Occasion",
  keywords:
    "pakain, fashion, clothing, e-commerce, online shopping, Indonesian fashion",
  description:
    "Welcome to XBrand, your one-stop destination for trendy and stylish pakain. Explore our wide range of clothing options suitable for every occasion, from traditional to contemporary styles. Shop conveniently online and stay ahead in fashion with XBrand.",
  creator: "XBrand_Official",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const auth = cookies().get("Authorization"); // auth
  return (
    <html lang="en">
      <head>
        <title>{`${metadata.publisher}`}</title>
        <meta name="publisher" content={`${metadata.publisher}`} />
        <meta name="title" content={`${metadata.title}`} />
        <meta name="keywords" content={`${metadata.keywords}`} />
        <meta name="description" content={`${metadata.description}`} />
        <meta name="creator" content={`${metadata.creator}`} />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <link
          href="https://cdn.jsdelivr.net/npm/daisyui@4.6.2/dist/full.min.css"
          rel="stylesheet"
          type="text/css"
        />
      </head>
      <body className={inter.className}>
        <Navbar cookie={auth} />
        {children}

        <Script src="https://cdn.tailwindcss.com"></Script>
      </body>
    </html>
  );
}
