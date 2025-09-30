"use client";

import React from "react";
import { QuoteFormProvider } from "@/lib/QuoteFormContext";

const Layout = ({ children }) => {
  return (
    <>
      <QuoteFormProvider>{children}</QuoteFormProvider>
    </>
  );
};

export default Layout;
