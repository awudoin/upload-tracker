"use client";

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
    const [requestUpdates, loadingUpdates, errorLoadignUpdates] = useCollectionData(uploadRequestUpdateCollection(requestId), { initialValue: [] });

    useHeader({
        startContent: <HeaderIconOnlyButton className='w-7 h-7 p-1' key='back' icon={<ChevronLeftIcon />} onClick={onCancel} />,
        middleContent: (
            <h1 key='title' className='font-bold'>
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
            console.log("resetting. before");
            console.log(`Upload request = ${JSON.stringify(uploadRequest)}`);
            console.log(`Default values = ${JSON.stringify(form.formState.defaultValues)}`);
            console.log(`Dirty fields = ${JSON.stringify(form.formState.dirtyFields)}`);
            console.log(`Form values = ${JSON.stringify(form.getValues())}`);
            form.reset(
                {
                    source: uploadRequest?.source ?? "",
                    destination: uploadRequest?.destination ?? "",
                    priority: uploadRequest?.priority ?? "Low",
                },
                { keepDefaultValues: false, keepTouched: false, keepDirty: false, keepDirtyValues: true }
            );
            console.log("after reset");
            console.log(`Default values = ${JSON.stringify(form.formState.defaultValues)}`);
            console.log(`Dirty fields = ${JSON.stringify(form.formState.dirtyFields)}`);
            console.log(`Form values = ${JSON.stringify(form.getValues())}`);
            // form.setValue("priority", uploadRequest?.priority ?? "Low");
            // console.log(`setting priority to ${uploadRequest.priority}`)
            // form.setValue('priority', uploadRequest.priority);
        } else {
            console.log("upload request is null");
        }
    }, [uploadRequest]);

    console.log("rendering");
    console.log(`Upload request = ${JSON.stringify(uploadRequest)}`);
    console.log(`Default values = ${JSON.stringify(form.formState.defaultValues)}`);
    console.log(`Dirty fields = ${JSON.stringify(form.formState.dirtyFields)}`);
    console.log(`Touched fields = ${JSON.stringify(form.formState.touchedFields)}`);
    console.log(`Form values = ${JSON.stringify(form.getValues())}`);

    if (loadingRequest) {
        return (
            <div className='absolute top-1/2 left-1/2 flex flex-row -translate-x-1/2 -translate-y-1/2'>
                <LoaderCircleIcon className='animate-spin' />
                <p>Loading. Please wait...</p>
            </div>
        );
    } else {
        return (
            <div className='font-[family-name:var(--font-geist-sans)] w-full'>
                <Header />
                <main className='px-2 sm:px-8 mt-12'>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4'>
                            <FormField
                                control={form.control}
                                name='source'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Source</FormLabel>
                                        <FormControl>
                                            <Input placeholder='Source' {...field}></Input>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='destination'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Destination</FormLabel>
                                        <FormControl>
                                            <Input placeholder='Destination' {...field}></Input>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='priority'
                                render={({ field }) => {
                                    console.log("Rendering field");
                                    console.log(JSON.stringify(field));
                                    return (
                                        <FormItem>
                                            <FormLabel>Priority</FormLabel>
                                            <Select
                                                onValueChange={(newVal) => {
                                                    console.log(`setting new val: ${newVal.length > 0 ? newVal : "Low (forced)"}`);
                                                    field.onChange(newVal.length > 0 ? newVal : "Low");
                                                }}
                                                value={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger className='w-full border border-zinc-200 dark:border-zinc-800 h-10 rounded-md'>
                                                        <SelectValue placeholder='Select a priority' />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent className=''>
                                                    {PriorityLevels.map((p) => (
                                                        <SelectItem key={p} value={p}>
                                                            {p}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    );
                                }}
                            />
                        </form>
                    </Form>
                </main>
            </div>
        );
    }
};

export default EditRequestPage;
