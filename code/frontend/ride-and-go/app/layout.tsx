"use client"
import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from './utils/contexts/ThemeContext';
import { LocaleProvider } from './utils/contexts/LocaleContext';
import Header from "./components/Header";
import Footer from "./components/Footer";
import { SearchFilterProvider } from "./utils/contexts/SearchFilterContext";

import ScrollToTopButton from "./components/ScrollToTopButton";



export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode;
}) {


  return (
      <html lang="en">
      <body  className={`antialiased `}>
      <LocaleProvider>
        <ThemeProvider>
        <SearchFilterProvider>
          <Header/>
          <main>{children}</main> 
          <Footer/>
        </SearchFilterProvider>
      </ThemeProvider>
      </LocaleProvider>
      <ScrollToTopButton/>
      </body>
      </html>
  );
}