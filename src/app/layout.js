import Header from "./components/Header";
import "./globals.css";
import ScrollToTopButton from "./components/ScrollToTopButton";

export const metadata = {
  title: "kuxna",
  description: "gg"
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>
        <ScrollToTopButton />
        <Header />
        {children}
        
      </body>
    </html>
  );
}