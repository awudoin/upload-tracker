import { firebaseStore } from "@/firebase/firebaseClient";
import { collection, doc, FieldValue, FirestoreDataConverter, QueryDocumentSnapshot, runTransaction, SnapshotOptions, Timestamp, WithFieldValue } from "firebase/firestore";
import { uploadRequestCollection } from "./UploadRequest";

export const UploadRequestStatusTypes = ["Initial Request", "Awaiting Info", "In Progress", "Completed", "Other"] as const;
export type UploadRequestStatus = (typeof UploadRequestStatusTypes)[number];

export type UploadRequestUpdate = {
    id: string;
    requestId: string;
    status: UploadRequestStatus;
    statusDate: number;
    comments: string;
    updatedByName: string;
    updatedByEmail: string;
};

type UploadRequestUpdateFirestore = Omit<UploadRequestUpdate, "id" | "statusDate"> & {
    statusDate: Timestamp;
};

type NewUploadRequestUpdate = Omit<UploadRequestUpdate, "id" | "statusDate">;

const dateFieldValueToTimestamp = (lastUpdate: number | FieldValue): Timestamp | FieldValue => (typeof lastUpdate === "number" ? Timestamp.fromMillis(lastUpdate) : lastUpdate);

const UploadRequestUpdateConverter: FirestoreDataConverter<UploadRequestUpdate, UploadRequestUpdateFirestore> = {
    toFirestore: (appObject: WithFieldValue<UploadRequestUpdate>): WithFieldValue<UploadRequestUpdateFirestore> => {
        console.log("converting upload request update to firestore");
        const { id, statusDate, ...withoutId } = appObject;
        return { ...withoutId, statusDate: dateFieldValueToTimestamp(appObject.statusDate) };
    },
    fromFirestore: (snapshot: QueryDocumentSnapshot<UploadRequestUpdateFirestore>, options?: SnapshotOptions): UploadRequestUpdate => {
        const dbObject = snapshot.data(options);
        return { ...dbObject, id: snapshot.id, statusDate: dbObject.statusDate.toMillis() };
    },
};

export const uploadRequestUpdateCollection = (requestId: string) => collection(firebaseStore, `requests/${requestId}/updates`).withConverter(UploadRequestUpdateConverter);

export const createUploadRequestUpdate = async (update: NewUploadRequestUpdate) => {
    await runTransaction(firebaseStore, async (trx) => {
        const now = Date.now();
        const updateDocRef = doc(uploadRequestUpdateCollection(update.requestId));
        trx.set(updateDocRef, {
            ...update,
            id: updateDocRef.id,
            statusDate: now,
        });

        const uploadDocRef = doc(uploadRequestCollection, update.requestId);
        trx.update(uploadDocRef, {
            lastStatus: update.status,
            lastStatusDate: Timestamp.fromMillis(now),
            lastComments: update.comments,
        });
    });
};
