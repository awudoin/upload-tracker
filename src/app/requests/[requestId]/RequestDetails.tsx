"use client";

import DisplayToEditInput from "@/components/DisplayToEditInput";
import DisplayToEditSelect from "@/components/DisplayToEditSelect";
import { Priority, PriorityLevels, UploadRequest, uploadRequestCollection } from "@/model/UploadRequest";
import { doc, updateDoc } from "firebase/firestore";
import React from "react";
import { toast } from "sonner";

interface Props {
    uploadRequest: UploadRequest;
}

const RequestDetails = ({ uploadRequest }: Props) => {
    const updateUploadRequest = (field: keyof Pick<UploadRequest, "source" | "destination" | "priority">, newValue: string) => {
        const docRef = doc(uploadRequestCollection, uploadRequest.id);

        const updatePromise = updateDoc(docRef, {
            [field]: newValue,
        });
        toast.promise(updatePromise, { loading: "Updating upload request", success: "Upload request updated!", error: "Error updating upload request" });
    };

    const onUpdateSource = (newSource: string) => updateUploadRequest("source", newSource);

    const onUpdateDestination = (newDestination: string) => updateUploadRequest("destination", newDestination);

    const onUpdatePriority = (newPriority: Priority) => updateUploadRequest("priority", newPriority);

    return (
        <div className='flex flex-col gap-2'>
            <div className='flex flex-row justify-between sm:justify-start items-baseline gap-4'>
                <label className='text-md w-fit sm:w-36 sm:text-right'>Source</label>
                <DisplayToEditInput classNames={{ input: "w-96 max-w-64" }} placeholder='Enter source of transfer' value={uploadRequest.source} onValueChange={onUpdateSource} />
            </div>
            <div className='flex flex-row justify-between sm:justify-start items-baseline gap-4'>
                <label className='text-md w-fit sm:w-36 sm:text-right'>Destination</label>
                <DisplayToEditInput classNames={{ input: "w-96 max-w-64" }} placeholder='Enter destination of transfer' value={uploadRequest.destination} onValueChange={onUpdateDestination} />
            </div>
            <div className='flex flex-row justify-between sm:justify-start items-baseline gap-4'>
                <label className='text-md w-fit sm:w-36 sm:text-right'>Priority</label>
                <DisplayToEditSelect classNames={{ select: "w-96 max-w-64" }} value={uploadRequest.priority} selectOptions={PriorityLevels.map((v) => ({ value: v, text: v }))} onValueChange={onUpdatePriority} />
            </div>
            <div className='flex flex-row justify-between sm:justify-start items-baseline gap-4'>
                <label className='text-md w-fit sm:w-36 sm:text-right'>Requestor</label>
                <span>{uploadRequest.requestorName}</span>
            </div>
            <div className='flex flex-row justify-between sm:justify-start items-baseline gap-4'>
                <label className='text-md w-fit sm:w-36 sm:text-right'>Email</label>
                <span>{uploadRequest.requestorEmail}</span>
            </div>
            <div className='flex flex-row justify-between sm:justify-start items-baseline gap-4'>
                <label className='text-md w-fit sm:w-36 sm:text-right'>Status</label>
                <span>{uploadRequest.lastStatus}</span>
            </div>
        </div>
    );
};

export default RequestDetails;
