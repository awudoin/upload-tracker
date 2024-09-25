"use client";

import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { Switch } from "./ui/switch";
import { MoonIcon, SunIcon } from "lucide-react";

interface Props {
    includeIcons?: boolean;
}

const DarkModeToggleButton = ({ includeIcons }: Props) => {
    const [mounted, setMounted] = useState(false);
    const { resolvedTheme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div className="flex flex-row items-center gap-1">
            {includeIcons && <SunIcon size={16} />}
            <Switch
                classNames={{
                    base: "h-5 w-10 data-[state=unchecked]:bg-violet-800 dark:data-[state=checked]:bg-violet-200",
                    thumb: "h-4 w-4 data-[state=unchecked]:bg-violet-200 dark:data-[state=checked]:bg-violet-800",
                }}
                checked={mounted && resolvedTheme === "dark"}
                onCheckedChange={(enableDark) => setTheme(enableDark ? "dark" : "light")}
            />
            {includeIcons && <MoonIcon size={16} />}
        </div>
    );
};

export default DarkModeToggleButton;
