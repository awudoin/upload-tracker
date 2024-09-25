import { UploadRequestUpdate } from "@/model/UploadRequestUpdate";
import { differenceInDays, format, formatDistanceToNow } from "date-fns";
import React from "react";

interface Props {
    statusUpdate: UploadRequestUpdate;
}

const formatDate = (date: Date | number) => format(date, "M/d/yyyy");
const howLongAgo = (date: Date | number) => formatDistanceToNow(date, { addSuffix: true });
const dateString = (date: Date | number) => (differenceInDays(Date.now(), date) > 30 ? formatDate(date) : howLongAgo(date));

const StatusListRow = ({ statusUpdate }: Props) => {
    return (
        <li className='[&:not(:last-child)]:border-b border-zinc-300 dark:border-zinc-700 py-3 flex flex-row items-center gap-4'>
            <div className='grow flex flex-col w-full overflow-x-hidden'>
                <div className='flex flex-row justify-between items-baseline gap-2'>
                    <p className='text-zinc-800 dark:text-zinc-50'>{statusUpdate.status}</p>
                    <p className='text-zinc-500 dark:text-zinc-400 text-xs'>{dateString(statusUpdate.statusDate)}</p>
                </div>
                <div>
                    <p className='text-sm text-zinc-500 dark:text-zinc-400 text-wrap'>{statusUpdate.comments}</p>
                </div>
            </div>
        </li>
    );
};

export default StatusListRow;
