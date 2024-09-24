import { HeaderProvider } from "@/contexts/headerContext";
import React from "react";
import { ThemeProvider } from "./ThemeProvider";

interface ProvidersProps {
    children: React.ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <HeaderProvider>{children}</HeaderProvider>
        </ThemeProvider>
    );
};
