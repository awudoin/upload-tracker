"use client";

import React, { useEffect } from "react";
import { UploadRequest, uploadRequestCollection } from "@/model/UploadRequest";
import { useCollectionData } from "react-firebase-hooks/firestore";
import RequestNavigatorItem from "./RequestNavigatorItem";

interface Props {
    selectedRequest: string;
}

const RequestNavigator = ({ selectedRequest }: Props) => {
    const [requestList, loadingRequests, errorLoading, snapshot] =
        useCollectionData<UploadRequest>(uploadRequestCollection);

    useEffect(() => {console.log('re-rendering request navigator')}, []);

    return (
        <div className="hidden sm:flex flex-col border-r border-zinc-400 dark:border-zinc-600 pr-4">
            <ul>
                {requestList?.map((r) => (
                    <RequestNavigatorItem key={r.id} uploadRequest={r} isSelected={r.id === selectedRequest} />
                ))}
            </ul>
        </div>
    );
};

export default RequestNavigator;
