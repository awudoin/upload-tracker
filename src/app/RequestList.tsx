"use client";

import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { UploadRequest, uploadRequestCollection } from "@/model/UploadRequest";
import { useCollectionData } from "react-firebase-hooks/firestore";
import RequestListRow from "./RequestListRow";
import { ArrowUpDownIcon, LoaderCircleIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { useHeader } from "@/hooks/useHeader";
import HeaderIconOnlyButton from "@/components/HeaderIconOnlyButton";
import RequestListRowSkeleton from "./RequestListRowSkeleton";

const RequestList = () => {
    const [sortAscending, setsortAscending] = useState(false);

    const toggleSort = () => setsortAscending((old) => !old);

    useHeader({
        endContent: [<HeaderIconOnlyButton className='w-7 h-7 p-1' key='sort' icon={<ArrowUpDownIcon />} onClick={toggleSort} />],
    });

    const [requestList, loadingRequests, errorLoading, snapshot] = useCollectionData<UploadRequest>(uploadRequestCollection);

    useEffect(() => {
        if (errorLoading) {
            console.log(errorLoading.message);
            toast.error("Error loading requests. Please try again later.");
        }
    }, [errorLoading]);

    const requests = useMemo(() => (requestList ? requestList.toSorted((first, second) => (first.lastStatusDate - second.lastStatusDate) * (sortAscending ? 1 : -1)) : []), [requestList, sortAscending]);

    if (loadingRequests) {
        return [1, 2, 3, 4, 5].map((r) => <RequestListRowSkeleton key={r} />);
    } else {
        return (
            <ul className=''>
                {requests.length === 0 && <p className='mt-20 mx-auto w-fit'>No requests currently</p>}
                {requests.map((r) => (
                    <RequestListRow key={r.id} uploadRequest={r} />
                ))}
            </ul>
        );
    }
};

export default RequestList;
