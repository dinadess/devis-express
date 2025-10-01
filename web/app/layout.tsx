import { Poppins, Playfair_Display } from "next/font/google";
import "./_styles/globals.css";
import Header from "@/components/Header";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  weight: ["400", "700", "800"],
});

export const metadata = {
  title: "L'héritage 105 | Générer un devis",
  description: "Générez vos devis",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} ${playfairDisplay.variable} antialiased text-black-400 bg-gray-50`}
      >
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
