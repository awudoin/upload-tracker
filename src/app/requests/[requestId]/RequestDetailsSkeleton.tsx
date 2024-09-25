import DisplayToEditInput from "@/components/DisplayToEditInput";
import DisplayToEditSelect from "@/components/DisplayToEditSelect";
import { Skeleton } from "@/components/ui/skeleton";
import { PriorityLevels, UploadRequest } from "@/model/UploadRequest";
import React from "react";

const RequestDetailsSkeleton = () => {
    return (
        <div className='flex flex-col gap-2'>
            <div className='flex flex-row justify-between sm:justify-start items-center gap-4'>
                <label className='text-md w-fit sm:w-36 sm:text-right'>Source</label>
                <Skeleton className='h-4 w-64' />
            </div>
            <div className='flex flex-row justify-between sm:justify-start items-center gap-4'>
                <label className='text-md w-fit sm:w-36 sm:text-right'>Destination</label>
                <Skeleton className='h-4 w-64' />
            </div>
            <div className='flex flex-row justify-between sm:justify-start items-center gap-4'>
                <label className='text-md w-fit sm:w-36 sm:text-right'>Priority</label>
                <Skeleton className='h-4 w-64' />
            </div>
            <div className='flex flex-row justify-between sm:justify-start items-center gap-4'>
                <label className='text-md w-fit sm:w-36 sm:text-right'>Requestor</label>
                <Skeleton className='h-4 w-64' />
            </div>
            <div className='flex flex-row justify-between sm:justify-start items-center gap-4'>
                <label className='text-md w-fit sm:w-36 sm:text-right'>Email</label>
                <Skeleton className='h-4 w-64' />
            </div>
            <div className='flex flex-row justify-between sm:justify-start items-center gap-4'>
                <label className='text-md w-fit sm:w-36 sm:text-right'>Status</label>
                <Skeleton className='h-4 w-64' />
            </div>
        </div>
    );
};

export default RequestDetailsSkeleton;
