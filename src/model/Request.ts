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
    id: string;
    name: string;
    email: string;
    site: Site;
    wwid: string;
    lastStatus: RequestStatus;
    lastStatusDate: number;
    lastComments: string;
};
