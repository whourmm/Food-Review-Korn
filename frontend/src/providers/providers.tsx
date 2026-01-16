"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { Toaster } from "@/src/components/ui/toaster";
// import { Toaster as Sonner } from "@/src/components/ui/sonner";
// import { TooltipProvider } from "@/src/components/ui/tooltip";
import { SessionProvider } from "next-auth/react";


const queryClient = new QueryClient();



export function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {


  return (
    
    <QueryClientProvider client={queryClient}>
      {/* <TooltipProvider>
        <Toaster />
        <Sonner /> */}
        <SessionProvider>
        {/* ส่ง state ผ่าน Context */}
        
          {children}
          </SessionProvider>
        
      {/* </TooltipProvider> */}
    </QueryClientProvider>
  );
}
