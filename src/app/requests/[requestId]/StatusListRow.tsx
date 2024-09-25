import { UploadRequestUpdate } from "@/model/UploadRequestUpdate";
import React from "react";

interface Props {
    statusUpdate: UploadRequestUpdate;
}

const StatusListRow = ({ statusUpdate }: Props) => {
    return (
        <li className='[&:not(:last-child)]:border-b border-zinc-800 dark:border-zinc-500 py-3 flex flex-row items-center gap-4'>
            <div className='grow flex flex-col max-w-[calc(100dvw-72px)] overflow-x-hidden'>
                <div className='flex flex-row items-baseline gap-2'>
                    <p className='text-zinc-800 dark:text-zinc-50'>{statusUpdate.status}</p>
                    <p className='text-zinc-500 dark:text-zinc-400 text-xs'>({statusUpdate.statusDate})</p>
                </div>
            </div>
        </li>
    );
};

export default StatusListRow;
