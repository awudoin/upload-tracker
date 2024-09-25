"use client";

import HeaderIconOnlyButton from "@/components/HeaderIconOnlyButton";
import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useHeader } from "@/hooks/useHeader";
import { createUploadRequest, PriorityLevels } from "@/model/UploadRequest";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeftIcon, LoaderCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email({ message: "Invalid email address" }),
    source: z.string().min(1, "You must put a source to transfer from."),
    destination: z.string().min(1, "You must put a destination to transfer files to."),
    priority: z.enum(PriorityLevels),
    comments: z.string(),
});

const NewRequestPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const onCancel = () => {
        router.push("/");
    };

    useHeader({
        startContent: <HeaderIconOnlyButton className='w-7 h-7 p-1' key='back' icon={<ChevronLeftIcon />} onClick={onCancel} />,
        middleContent: (
            <h1 key='title' className='font-bold'>
                New Upload Request
            </h1>
        ),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            source: "",
            destination: "",
            priority: "Low",
            comments: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsLoading(true);
        try {
            await createUploadRequest({
                requestorName: values.name,
                requestorEmail: values.email,
                source: values.source,
                destination: values.destination,
                priority: values.priority,
                comments: values.comments,
            });
            toast.success("Successfully create upload request");
            router.push("/");
        } catch (e) {
            toast.error("Failed to create upload request.");
        }
    };

    return (
        <div className='font-[family-name:var(--font-geist-sans)] w-full'>
            <Header />
            <main className='px-2 sm:px-8 mt-12'>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-8'>
                        <FormField
                            control={form.control}
                            name='name'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Name<span className='ml-1 text-red-700'>*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input placeholder='Name' {...field}></Input>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='email'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Email<span className='ml-1 text-red-700'>*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input placeholder='Email' {...field}></Input>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='source'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Source<span className='ml-1 text-red-700'>*</span>
                                    </FormLabel>
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
                                    <FormLabel>
                                        Destination<span className='ml-1 text-red-700'>*</span>
                                    </FormLabel>
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
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Priority</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='comments'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Comments</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder='Enter any comments you have' {...field}></Textarea>
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <Button type='submit' disabled={isLoading}>
                            {isLoading && <LoaderCircleIcon className='mr-2 h-4 w-4 animate-spin' />}
                            Submit
                        </Button>
                    </form>
                </Form>
            </main>
        </div>
    );
};

export default NewRequestPage;
