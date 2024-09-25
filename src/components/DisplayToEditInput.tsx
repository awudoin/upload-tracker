"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { CheckIcon, PencilIcon, XIcon } from "lucide-react";

interface Props {
    value: string;
    onValueChange: (newValue: string) => void;
    placeholder?: string;
    classNames?: {
        base?: string;
        input?: string;
        readonlyValue?: string;
        editButton?: string;
        acceptButton?: string;
        cancelButton?: string;
    };
}

const ICON_SIZE = 12;

const DisplayToEditInput = (props: Props) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newValue, setNewValue] = useState(props.value);

    useEffect(() => {
        handleCancelEdit();
    }, [props.value]);

    const handleValueChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        setNewValue(evt.target.value);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setNewValue(props.value);
    };

    const handleSaveEdit = () => {
        setIsEditing(false);
        if (newValue !== props.value) {
            props.onValueChange(newValue);
        }
    };

    const readOnlyField = (
        <>
            <span className={cn(props.classNames?.readonlyValue)}>{newValue}</span>
            <Button className={cn("h-6 w-6 ml-4 border-blue-600 text-blue-600", props.classNames?.editButton)} size='icon' variant='outline' onClick={() => setIsEditing(true)}>
                <PencilIcon size={ICON_SIZE} fill='blue' />
            </Button>
        </>
    );

    const editField = (
        <>
            <Input className={cn("h-7 py-1 pr-16 ", props.classNames?.input)} placeholder={props.placeholder} value={newValue} onChange={handleValueChange}></Input>
            <Button className={cn("absolute right-7 h-7 w-7 rounded-r-none rounded-l-none", props.classNames?.cancelButton)} size='icon' variant='outline' onClick={handleCancelEdit}>
                <XIcon size={ICON_SIZE} color='red' strokeWidth={4} />
            </Button>
            <Button className={cn("absolute right-0 h-7 w-7 rounded-l-none", props.classNames?.acceptButton)} size='icon' variant='outline' onClick={handleSaveEdit}>
                <CheckIcon size={ICON_SIZE} color='green' strokeWidth={4} />
            </Button>
        </>
    );

    return <div className={cn("flex flex-row items-center relative", props.classNames?.base)}>{isEditing ? editField : readOnlyField}</div>;
};

export default DisplayToEditInput;
