"use client";

import { Button } from "@/components/ui/button";
import { UploadRequest } from "@/model/UploadRequest";
import { differenceInDays, format, formatDistanceToNow } from "date-fns";
import { ChevronRightIcon, MoveRightIcon } from "lucide-react";
import Link from "next/link";

interface Props {
    uploadRequest: UploadRequest;
}

const formatDate = (date: Date | number) => format(date, "M/d/yyyy");
const howLongAgo = (date: Date | number) => formatDistanceToNow(date, { addSuffix: true });
const dateString = (date: Date | number) => (differenceInDays(Date.now(), date) > 30 ? formatDate(date) : howLongAgo(date));

const RequestListRow = ({ uploadRequest }: Props) => {
    return (
        <li className='[&:not(:last-child)]:border-b border-zinc-800 dark:border-zinc-500 py-3 flex flex-row items-center gap-4'>
            <div className='grow flex flex-col max-w-[calc(100dvw-72px)] overflow-x-hidden'>
                <div className='flex flex-row items-baseline gap-2'>
                    <p className='text-zinc-800 dark:text-zinc-50'>{uploadRequest.requestorName}</p>
                    <p className='text-zinc-500 dark:text-zinc-400 text-xs'>({uploadRequest.requestorEmail})</p>
                </div>
                <div className='flex flex-col items-start sm:flex-row sm:items-center gap-1'>
                    <div className='flex flex-row gap-1 text-sm'>
                        <span className="sm:hidden">From:</span>
                        <span>{uploadRequest.source}</span>
                    </div>
                    <MoveRightIcon className="hidden sm:block" size={12}/>
                    <div className='flex flex-row gap-1 text-sm'>
                        <span className="sm:hidden">To:</span>
                        <span>{uploadRequest.destination}</span>
                    </div>
                </div>
                <div className='flex flex-row justify-between mt-2 text-sm'>
                    <p>Status: {uploadRequest.lastStatus}</p>
                    <p>{dateString(uploadRequest.lastStatusDate)}</p>
                </div>
            </div>
            <Button variant='outline' size='icon' className='' asChild>
                <Link href={`requests/${uploadRequest.id}`}>
                    <ChevronRightIcon />
                </Link>
            </Button>
        </li>
    );
};

export default RequestListRow;
