"use client";

import HeaderIconOnlyButton from "@/components/HeaderIconOnlyButton";
import Header from "@/components/layout/Header";
import { useHeader } from "@/hooks/useHeader";
import { ArrowUpDown, PlusIcon } from "lucide-react";
import RequestList from "./RequestList";
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();

    const handleAddRequest = () => {
        console.log("pushing new route");
        router.push("requests");
    };

    useHeader({
        startContent: (
            <h1 key='title' className='font-bold'>
                Upload Requests
            </h1>
        ),
        endContent: <HeaderIconOnlyButton className='w-7 h-7 p-1' key='add' icon={<PlusIcon />} onClick={handleAddRequest} />,
    });

    return (
        <div className='font-[family-name:var(--font-geist-sans)] w-dvw'>
            <Header />
            <main className='px-2 sm:px-8 mt-12'>
                <RequestList />
            </main>
        </div>
    );
}
