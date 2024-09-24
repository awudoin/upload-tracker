export const RequestStatusTypes = [
    "Initial Request",
    "Awaiting Info",
    "Awaiting DocuSign",
    "Awaiting WWID Issue",
    "WWID Issued",
    "Registered NCO",
    "Completed",
    "Other",
] as const;
export type RequestStatus = (typeof RequestStatusTypes)[number];

export const Sites = ["Ocotillo", "Chandler"] as const;
export type Site = (typeof Sites)[number];

export type Request = {
    requestId: string;
    status: RequestStatus;
    statusDate: number;
    comments: string;
    updatedByName: string;
    updatedByEmail: string;
};
