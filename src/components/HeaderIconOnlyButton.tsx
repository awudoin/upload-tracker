"use client";

import React from "react";
import { Button } from "./ui/button";

interface Props {
    onClick?: () => void;
    icon?: React.ReactNode;
    className?: string;
}

const HeaderIconOnlyButton = (props: Props) => {
    const clickHandler = (evt: React.MouseEvent<HTMLButtonElement>) => {
        evt.preventDefault();

        if (props.onClick) {
            props.onClick();
        }
    };

    return (
        <Button
            variant="ghost"
            size="icon"
            className={`hover:bg-violet-800 dark:hover:bg-violet-800 hover:text-zinc-50 ${props.className}`}
            onClick={clickHandler}
        >
            {props.icon}
        </Button>
    );
};

export default HeaderIconOnlyButton;
