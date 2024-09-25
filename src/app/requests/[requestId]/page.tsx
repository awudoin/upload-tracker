"use client";

import DisplayToEditInput from "@/components/DisplayToEditInput";
import HeaderIconOnlyButton from "@/components/HeaderIconOnlyButton";
import Header from "@/components/layout/Header";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useHeader } from "@/hooks/useHeader";
import { PriorityLevels, uploadRequestCollection } from "@/model/UploadRequest";
import { uploadRequestUpdateCollection } from "@/model/UploadRequestUpdate";
import { zodResolver } from "@hookform/resolvers/zod";
import { doc, FieldValue } from "firebase/firestore";
import { ChevronLeftIcon, LoaderCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useCollectionData, useDocumentData } from "react-firebase-hooks/firestore";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
    source: z.string().min(1, "You must put a source to transfer from."),
    destination: z.string().min(1, "You must put a destination to transfer to."),
    priority: z.enum(PriorityLevels),
});

interface Props {
    params: {
        requestId: string;
    };
}

const EditRequestPage = ({ params: { requestId } }: Props) => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const onCancel = () => {
        router.push("/");
    };

    const [uploadRequest, loadingRequest, errorLoading] = useDocumentData(doc(uploadRequestCollection, requestId));
    const [requestUpdates, loadingUpdates, errorLoadignUpdates] = useCollectionData(
        uploadRequestUpdateCollection(requestId),
        { initialValue: [] }
    );

    useHeader({
        startContent: (
            <HeaderIconOnlyButton className="w-7 h-7 p-1" key="back" icon={<ChevronLeftIcon />} onClick={onCancel} />
        ),
        middleContent: (
            <h1 key="title" className="font-bold">
                Upload Request
            </h1>
        ),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            source: "",
            destination: "",
            priority: "Low",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsLoading(true);
        try {
        } catch (e) {
            toast.error("Failed to create upload request.");
        }
    };

    useEffect(() => {
        if (errorLoading) {
            console.log(errorLoading.message);
            toast.error("Error loading requests. Please try again later.");
        }
    }, [errorLoading]);

    useEffect(() => {
        if (uploadRequest) {
            form.reset({
                source: uploadRequest?.source ?? "",
                destination: uploadRequest?.destination ?? "",
                priority: uploadRequest?.priority ?? "Low",
            });
        }
    }, [uploadRequest]);

    if (loadingRequest) {
        return (
            <div className="absolute top-1/2 left-1/2 flex flex-row -translate-x-1/2 -translate-y-1/2">
                <LoaderCircleIcon className="animate-spin" />
                <p>Loading. Please wait...</p>
            </div>
        );
    } else {
        return (
            <div className="font-[family-name:var(--font-geist-sans)] w-full">
                <Header />
                <main className="px-2 sm:px-8 mt-12">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                            <FormField
                                control={form.control}
                                name="source"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-baseline gap-2">
                                        <FormLabel>Source</FormLabel>
                                        <FormControl>
                                            <DisplayToEditInput
                                                classNames={{ input: "w-96" }}
                                                placeholder="Enter source of transfer"
                                                onValueChange={field.onChange}
                                                value={field.value}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="destination"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-baseline gap-2">
                                        <FormLabel>Destination</FormLabel>
                                        <FormControl>
                                            <DisplayToEditInput
                                                classNames={{ input: "w-96" }}
                                                placeholder="Enter destination of transfer"
                                                onValueChange={field.onChange}
                                                value={field.value}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormItem>
                                <FormLabel>Requestor</FormLabel>
                                <Input
                                    className="!cursor-text"
                                    value={uploadRequest?.requestorName}
                                    readOnly
                                    disabled
                                />
                            </FormItem>
                            <FormItem>
                                <FormLabel>Requestor Email</FormLabel>
                                <Input
                                    className="!cursor-text"
                                    value={uploadRequest?.requestorEmail}
                                    readOnly
                                    disabled
                                />
                            </FormItem>
                            <FormItem>
                                <FormLabel>Status</FormLabel>
                                <Input className="!cursor-text" value={uploadRequest?.lastStatus} readOnly disabled />
                            </FormItem>

                            <FormField
                                control={form.control}
                                name="priority"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Priority</FormLabel>
                                        <Select
                                            onValueChange={(newVal) => {
                                                field.onChange(
                                                    newVal.length > 0 ? newVal : uploadRequest?.priority ?? "Low"
                                                );
                                            }}
                                            value={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="w-full border border-zinc-200 dark:border-zinc-800 h-10 rounded-md">
                                                    <SelectValue placeholder="Select a priority" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent className="">
                                                {PriorityLevels.map((p) => (
                                                    <SelectItem key={p} value={p}>
                                                        {p}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </form>
                    </Form>
                </main>
            </div>
        );
    }
};

export default EditRequestPage;
