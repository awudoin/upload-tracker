"use client";

import { cn } from "@/lib/utils";
import { PriorityLevels } from "@/model/UploadRequest";
import { CheckIcon, PencilIcon, XIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface Props<T extends string> {
    value: T;
    onValueChange: (newValue: T) => void;
    placeHolder?: string;
    selectOptions: { value: T; text: string }[];
    classNames?: {
        base?: string;
        select?: string;
        selectContent?: string;
        readonlyValue?: string;
        editButton?: string;
        acceptButton?: string;
        cancelButton?: string;
    };
}

const ICON_SIZE = 12;

const DisplayToEditSelect = <T extends string> (props: Props<T>) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newValue, setNewValue] = useState(props.value);

    useEffect(() => {
        handleCancelEdit();
    }, [props.value]);

    const handleCancelEdit = () => {
        setIsEditing(false);
        setNewValue(props.value);
    };

    const handleSaveEdit = () => {
        setIsEditing(false);
        props.onValueChange(newValue);
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
            <Select value={newValue} onValueChange={(str) => setNewValue(str as T)}>
                <SelectTrigger className={cn("h-7 pr-14 border border-zinc-200 dark:border-zinc-800 rounded-md", props.classNames?.select)}>
                    <SelectValue placeholder={props.placeHolder} />
                </SelectTrigger>
                <SelectContent className={cn(props.classNames?.selectContent)}>
                    {props.selectOptions.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                            {opt.text}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <Button className={cn("absolute h-7 w-7 right-7 rounded-r-none rounded-l-none", props.classNames?.cancelButton)} size='icon' variant='outline' onClick={handleCancelEdit}>
                <XIcon size={ICON_SIZE} color='red' strokeWidth={4} />
            </Button>
            <Button className={cn("absolute h-7 w-7 right-0 rounded-l-none", props.classNames?.acceptButton)} size='icon' variant='outline' onClick={handleSaveEdit}>
                <CheckIcon size={ICON_SIZE} color='green' strokeWidth={4} />
            </Button>
        </>
    );

    return <div className={cn("flex flex-row items-center relative", props.classNames?.base)}>{isEditing ? editField : readOnlyField}</div>;
};

export default DisplayToEditSelect;
