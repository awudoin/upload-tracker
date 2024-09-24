"use client";

import HeaderIconOnlyButton from "@/components/HeaderIconOnlyButton";
import Header from "@/components/layout/Header";
import { useHeader } from "@/hooks/useHeader";
import { ArrowUpDown, PlusIcon, Router } from "lucide-react";
import RequestList from "./RequestList";
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();

    const handleAddRequest = () => {
        console.log('pushing new route')
        router.push('newRequest')    
    }

    useHeader({
        middleContent: (
            <h1 key="title" className="font-bold">
                WWID Request Tracker
            </h1>
        ),
        endContent: [
            <HeaderIconOnlyButton className="w-7 h-7 p-1" key="sort" icon={<ArrowUpDown />} />,
            <HeaderIconOnlyButton className="w-7 h-7 p-1" key="add" icon={<PlusIcon />} onClick={handleAddRequest} />,
        ],
    });

    return (
        <div className="font-[family-name:var(--font-geist-sans)]">
            <Header />
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
                <RequestList />
            </main>
        </div>
    );
}
