"use client";

import React, { useContext } from "react";
import { HeaderContext } from "@/contexts/headerContext";

const Header = () => {
    const headerContext = useContext(HeaderContext);

    return (
        <header className="bg-violet-600 text-slate-50 w-dvw items-center px-3 py-2">
            <div className="flex flex-row sm:hidden">
                <div className="flex flex-row gap-1 justify-start">
                    {headerContext.startContent.map((node) => node)}
                </div>
                <div className="flex flex-row gap-1 grow justify-center">
                    {headerContext.middleContent.map((node) => node)}
                </div>
                <div className="flex flex-row gap-1 justify-end">{headerContext.endContent.map((node) => node)}</div>
            </div>
            <div className="hidden sm:flex sm:flex-row">
                <h1 className="font-bold">WWID Request Tracker</h1>
            </div>
        </header>
    );
};

export default Header;
