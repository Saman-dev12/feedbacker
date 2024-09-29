"use client"
import React from 'react';
import {  SessionProvider } from 'next-auth/react';
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"

import { ReactNode } from 'react';

interface ProviderProps {
  children: ReactNode;
}

const Provider: React.FC<ProviderProps> = ({ children }) => {
  return (
    <SessionProvider>
      
      {children}
      
    </SessionProvider>
  );
};

export default Provider;