import React from "react";

interface Props {
    params: {
        requestId: string;
    };
}

const EditRequestPage = ({ params: { requestId } }: Props) => {
    return <div>Edit request page = {requestId}</div>;
};

export default EditRequestPage;
