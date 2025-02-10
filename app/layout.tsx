"use client"
import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from './utils/contexts/ThemeContext';
import { LocaleProvider } from './utils/contexts/LocaleContext';
import Header from "./components/Header";
import Footer from "./components/Footer";
import { SearchFilterProvider } from "./utils/contexts/SearchFilterContext";

import ScrollToTopButton from "./components/buttons/ScrollToTopButton";
import { UserProvider } from "./utils/contexts/UserContext";
import { FlashMessageProvider } from "./utils/contexts/FlashMessageContext";
import FlashMessage from "./components/flash_message/FlashMessage";
import Head from 'next/head';


export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode;
}) {


  return (
    
      <html lang="en">
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      <body  className={`antialiased `}>
      
      
        <UserProvider>
          <LocaleProvider>
            <ThemeProvider>
              <SearchFilterProvider>
                <FlashMessageProvider>
                  <Header/>
                  <FlashMessage />
                  <main>{children}</main> 
                  <Footer/>
                </FlashMessageProvider>
              </SearchFilterProvider>
            </ThemeProvider>
          </LocaleProvider>
          <ScrollToTopButton/>
        </UserProvider>
       
      </body>
     
      </html>
  );
}