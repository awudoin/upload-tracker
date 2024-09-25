"use client";

import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createUploadRequestUpdate, UploadRequestStatus, UploadRequestStatusTypes } from "@/model/UploadRequestUpdate";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
    requestId: string;
}

const NewUpdateSection = ({ requestId }: Props) => {
    const [status, setStatus] = useState<UploadRequestStatus | "">("");
    const [comments, setComments] = useState("");

    const addNewUpdate = async () => {
        if (status === "") return;

        try {
            await createUploadRequestUpdate({
                requestId,
                status,
                comments,
                updatedByName: "test name",
                updatedByEmail: "test@email.com",
            });
            setStatus("");
            setComments("");
            toast.success("Successfully added new status update");
        } catch (e) {
            toast.error("Error adding new status update.");
        }
    };

    return (
        <div className='flex flex-col gap-2'>
            <div className='flex flex-row items-baseline gap-1'>
                <label htmlFor='newStatus' className='w-36'>
                    New Status
                </label>
                <Select value={status} onValueChange={(str) => setStatus(str as UploadRequestStatus)}>
                    <SelectTrigger id='newStatus' className='grow'>
                        <SelectValue placeholder='Select a new status'>{status}</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                        {UploadRequestStatusTypes.map((r) => (
                            <SelectItem key={r} value={r}>
                                {r}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className='flex flex-col'>
                <label htmlFor='newComments'>Comments</label>
                <Textarea id='newComments' placeholder="Enter any comments here" value={comments} onChange={(e) => setComments(e.target.value)} />
            </div>
            <div className="flex justify-end">
                <Button size='sm' onClick={addNewUpdate}>
                    Set New Status
                </Button>
            </div>
        </div>
    );
};

export default NewUpdateSection;
