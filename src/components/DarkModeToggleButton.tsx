"use client";

import { useTheme } from "next-themes";
import React from "react";
import { Switch } from "./ui/switch";

const DarkModeToggleButton = () => {
    const { resolvedTheme, setTheme } = useTheme();

    return (
        <Switch
            checked={resolvedTheme === "dark"}
            onCheckedChange={(enableDark) => setTheme(enableDark ? "dark" : "light")}
        />
    );
};

export default DarkModeToggleButton;
