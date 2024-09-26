import { UploadRequest } from "@/model/UploadRequest";
import Link from "next/link";
import React, { useEffect } from "react";

interface Props {
    uploadRequest: UploadRequest;
    isSelected: boolean;
}

const RequestNavigatorItem = ({ uploadRequest, isSelected }: Props) => {
    return (
        <div className={`${isSelected ? "text-red-500" : "text-green-500"}`}>
            {/* <Link href={`./${uploadRequest.id}`}>{uploadRequest.id}</Link> */}
            <span
                className="cursor-pointer"
                onClick={() => {
                    window.history.pushState(null, "", `./${uploadRequest.id}`);
                }}
            >
                {uploadRequest.id}
            </span>
        </div>
    );
};

export default RequestNavigatorItem;
