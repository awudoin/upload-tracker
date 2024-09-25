"use client";

import { uploadRequestUpdateCollection } from "@/model/UploadRequestUpdate";
import React from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import StatusListRow from "./StatusListRow";
import { orderBy, query } from "firebase/firestore";

interface Props {
    requestId: string;
}

const StatusList = ({ requestId }: Props) => {
    const [requestUpdates, loadingUpdates, errorLoadingUpdates] = useCollectionData(query(uploadRequestUpdateCollection(requestId), orderBy("statusDate", "desc")), { initialValue: [] });

    if (loadingUpdates) {
        return "loading";
    } else if (requestUpdates === undefined) {
        return <p className='mt-20 mx-auto w-fit'>No status updates</p>;
    } else {
        return (
            <ul className=''>
                {requestUpdates.map((r) => (
                    <StatusListRow key={r.id} statusUpdate={r} />
                ))}
            </ul>
        );
    }
};

export default StatusList;
