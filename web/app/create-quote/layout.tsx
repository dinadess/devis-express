"use client";

import React from "react";
import { QuoteFormProvider } from "@/lib/QuoteFormContext";
import TanstackQueryProvider from "@/lib/TanstackQueryProvider";
import { Toaster } from "@/components/ui/sonner";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <TanstackQueryProvider>
        <QuoteFormProvider>{children}</QuoteFormProvider>
      </TanstackQueryProvider>

      <Toaster closeButton richColors />
    </>
  );
};

export default Layout;
