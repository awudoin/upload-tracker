"use client";

import { HeaderContext } from "@/contexts/headerContext";
import React, { useContext, useEffect } from "react";

interface Props {
    startContent?: React.ReactNode | React.ReactNode[];
    middleContent?: React.ReactNode | React.ReactNode[];
    endContent?: React.ReactNode | React.ReactNode[];
}

export const useHeader = ({ startContent, middleContent, endContent }: Props) => {
    const headerContext = useContext(HeaderContext);

    useEffect(() => {
        headerContext.registerContent(
            "start",
            startContent === undefined ? [] : Array.isArray(startContent) ? startContent : [startContent],
            false
        );
        headerContext.registerContent(
            "middle",
            middleContent === undefined ? [] : Array.isArray(middleContent) ? middleContent : [middleContent],
            false
        );
        headerContext.registerContent(
            "end",
            endContent === undefined ? [] : Array.isArray(endContent) ? endContent : [endContent],
            false
        );

        return headerContext.unregisterContent;
    }, []);

    // const updateHeader = (position: "start" | "middle" | "end", nodes: React.ReactNode | React.ReactNode[]) => {};

    // return headerContext.registerContent;
};
