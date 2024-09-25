"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronRightIcon } from "lucide-react";

const RequestListRowSkeleton = () => {
    return (
        <li className='[&:not(:last-child)]:border-b border-zinc-800 dark:border-zinc-500 py-3 flex flex-row items-center gap-4'>
            <div className='grow flex flex-col max-w-[calc(100dvw-72px)] overflow-x-hidden gap-2'>
                <Skeleton className='h-5 w-48 rounded-full' />
                <Skeleton className='h-4 w-60 sm:w-96 rounded-full' />
                <Skeleton className='sm:hidden h-4 w-60 rounded-full' />
                <div className='flex flex-row justify-between mt-2 text-sm'>
                    <Skeleton className='h-4 w-32 rounded-full' />
                    <Skeleton className='h-4 w-32 rounded-full' />
                </div>
            </div>
            <Button variant='outline' size='icon' className='' disabled>
                <ChevronRightIcon />
            </Button>
        </li>
    );
};

export default RequestListRowSkeleton;
