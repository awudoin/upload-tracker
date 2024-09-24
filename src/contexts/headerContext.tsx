"use client";

import React, { createContext, useState } from "react";

type HeaderContextData = {
    startContent: React.ReactNode[];
    middleContent: React.ReactNode[];
    endContent: React.ReactNode[];
    registerContent: (position: "start" | "middle" | "end", nodes: React.ReactNode[], replaceContent?: boolean) => void;
    unregisterContent: () => void;
};

export const HeaderContext = createContext<HeaderContextData>({
    startContent: [],
    middleContent: [],
    endContent: [],
    registerContent: (position: "start" | "middle" | "end", nodes: React.ReactNode[], replaceContent?: boolean) => {},
    unregisterContent: () => {},
});

interface HeaderProviderProps {
    children: React.ReactNode;
}
export const HeaderProvider = ({ children }: HeaderProviderProps) => {
    const [startContent, setStartContent] = useState<React.ReactNode[]>([]);
    const [endContent, setEndContent] = useState<React.ReactNode[]>([]);
    const [middleContent, setMiddleContent] = useState<React.ReactNode[]>([]);

    const registerContent = (
        position: "start" | "middle" | "end",
        nodes: React.ReactNode[],
        replaceContent?: boolean
    ) => {
        let func: React.Dispatch<React.SetStateAction<React.ReactNode[]>>;
        if (position === "end") {
            func = setEndContent;
        } else if (position === "middle") {
            func = setMiddleContent;
        } else {
            func = setStartContent;
        }

        if (replaceContent) {
            func(nodes);
        } else {
            func((old) => [...old, nodes]);
        }
    };

    const unregisterContent = () => {
        setStartContent([]);
        setMiddleContent([]);
        setEndContent([]);
    };

    return (
        <HeaderContext.Provider
            value={{
                startContent,
                middleContent,
                endContent,
                registerContent,
                unregisterContent,
            }}
        >
            {children}
        </HeaderContext.Provider>
    );
};
