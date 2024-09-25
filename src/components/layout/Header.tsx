"use client";

import { HeaderContext } from "@/contexts/headerContext";
import { useContext } from "react";
import DarkModeToggleButton from "../DarkModeToggleButton";

const Header = () => {
    const headerContext = useContext(HeaderContext);

    const endContent = [<DarkModeToggleButton key='themeToggle' includeIcons />, ...headerContext.endContent];

    return (
        <header className='bg-violet-600 text-slate-50 items-center px-3 py-2 fixed top-0 left-0 right-0 h-10'>
            <div className='flex flex-row sm:hidden'>
                <div className='flex flex-row gap-1 justify-start'>{headerContext.startContent.map((node) => node)}</div>
                <div className='flex flex-row gap-1 grow justify-center'>{headerContext.middleContent.map((node) => node)}</div>
                <div className='flex flex-row gap-1 justify-end'>{endContent.map((node) => node)}</div>
            </div>
            <div className='hidden sm:flex sm:flex-row justify-between items-center'>
                <h1 className='font-bold'>WWID Request Tracker</h1>
                <DarkModeToggleButton includeIcons/>
            </div>
        </header>
    );
};

export default Header;
