import { firebaseStore } from "@/firebase/firebaseClient";
import { collection, doc, FieldValue, FirestoreDataConverter, QueryDocumentSnapshot, runTransaction, SnapshotOptions, Timestamp, WithFieldValue } from "firebase/firestore";
import { UploadRequestStatus, uploadRequestUpdateCollection } from "./UploadRequestUpdate";

export const PriorityLevels = ["Low", "Medium", "High"] as const;
export type Priority = (typeof PriorityLevels)[number];

export type UploadRequest = {
    id: string;
    requestorName: string;
    requestorEmail: string;
    source: string;
    destination: string;
    priority: Priority;
    lastStatus: UploadRequestStatus;
    lastStatusDate: number;
    lastComments: string;
};

type UploadRequestFirestore = Omit<UploadRequest, "id" | "lastStatusDate"> & {
    lastStatusDate: Timestamp;
};

type NewUploadRequest = Omit<UploadRequest, "id" | "lastStatus" | "lastStatusDate" | "lastComments"> & { comments: string };

const dateFieldValueToTimestamp = (lastUpdate: number | FieldValue): Timestamp | FieldValue => (typeof lastUpdate === "number" ? Timestamp.fromMillis(lastUpdate) : lastUpdate);

const UploadRequestConverter: FirestoreDataConverter<UploadRequest, UploadRequestFirestore> = {
    toFirestore: (appObject: WithFieldValue<UploadRequest>): WithFieldValue<UploadRequestFirestore> => {
        const { id, lastStatusDate, ...withoutId } = appObject;
        return { ...withoutId, lastStatusDate: dateFieldValueToTimestamp(appObject.lastStatusDate) };
    },
    fromFirestore: (snapshot: QueryDocumentSnapshot<UploadRequestFirestore>, options?: SnapshotOptions): UploadRequest => {
        const dbObject = snapshot.data(options);
        const appObject: UploadRequest = { ...dbObject, id: snapshot.id, lastStatusDate: dbObject.lastStatusDate.toMillis() };
        // console.log("Retrieved object");
        // console.log(dbObject);
        // console.log("Converted to");
        // console.log(appObject);
        return appObject;
    },
};

export const uploadRequestCollection = collection(firebaseStore, "requests").withConverter(UploadRequestConverter);

export const createUploadRequest = async (request: NewUploadRequest) => {
    await runTransaction(firebaseStore, async (trx) => {
        const now = Date.now();
        const uploadDocRef = doc(uploadRequestCollection);
        trx.set(uploadDocRef, {
            ...request,
            id: uploadDocRef.id,
            lastStatus: "Initial Request",
            lastStatusDate: now,
            lastComments: request.comments,
        });

        const updateDocRef = doc(uploadRequestUpdateCollection(uploadDocRef.id));
        trx.set(updateDocRef, {
            id: updateDocRef.id,
            requestId: uploadDocRef.id,
            updatedByName: request.requestorName,
            updatedByEmail: request.requestorEmail,
            status: "Initial Request",
            statusDate: now,
            comments: request.comments,
        });
    });
};
