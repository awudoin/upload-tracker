"use client";

import HeaderIconOnlyButton from "@/components/HeaderIconOnlyButton";
import Header from "@/components/layout/Header";
import { Separator } from "@/components/ui/separator";
import { useHeader } from "@/hooks/useHeader";
import { uploadRequestCollection } from "@/model/UploadRequest";
import { uploadRequestUpdateCollection } from "@/model/UploadRequestUpdate";
import { doc } from "firebase/firestore";
import { ChevronLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useCollectionData, useDocumentData } from "react-firebase-hooks/firestore";
import { toast } from "sonner";
import RequestDetails from "./RequestDetails";
import RequestDetailsSkeleton from "./RequestDetailsSkeleton";
import StatusList from "./StatusList";
import NewUpdateSection from "./NewUpdateSection";

interface Props {
    params: {
        requestId: string;
    };
}

const EditRequestPage = ({ params: { requestId } }: Props) => {
    const router = useRouter();

    const onCancel = () => {
        router.push("/");
    };

    useHeader({
        startContent: <HeaderIconOnlyButton className='w-7 h-7 p-1' key='back' icon={<ChevronLeftIcon />} onClick={onCancel} />,
        middleContent: (
            <h1 key='title' className='font-bold'>
                Upload Request
            </h1>
        ),
    });

    const [uploadRequest, loadingRequest, errorLoading] = useDocumentData(doc(uploadRequestCollection, requestId));

    useEffect(() => {
        if (errorLoading) {
            console.log(errorLoading.message);
            toast.error("Error loading status updates. Please try again later.");
        }
    }, [errorLoading]);

    return (
        <div className='font-[family-name:var(--font-geist-sans)] w-full'>
            <Header />
            {/* <main className='px-2 sm:px-8 mt-12 h-[calc(100dvh-5.5rem)] overflow-y-hidden flex flex-col'> */}
            <main className='px-2 sm:px-8 mt-12 mb-6 flex flex-col'>
                {loadingRequest ? <RequestDetailsSkeleton /> : <RequestDetails uploadRequest={uploadRequest!} />}
                <Separator className='my-4' />
                <NewUpdateSection requestId={requestId} />
                <Separator className='my-4' />
                <StatusList requestId={requestId} />
            </main>
        </div>
    );
};

export default EditRequestPage;
