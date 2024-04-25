"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Image from "next/image"
import React, { useState } from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/Input"

const formSchema = z.object({
    username: z.string().min(1, {
        message: "Please input username",
    }),
    password: z.string().min(1, {
        message: "Please input password",
    }),
    confirm: z.string().min(1, {
        message: "Please input password again",
    }),
})

export default function SignUpPage() {
    const [tempImageSrc, setTempImageSrc] = useState<string | ArrayBuffer | null>(null);
    const [fileUploaded, setFileUploaded] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
            confirm: ""
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(tempImageSrc);
        // if (values.username === '') {
        //     setError('Input username.');
        //     return;
        // }
        // if (values.password === '') {
        //     setError('Input passwrod.');
        //     return;
        // }
        if (values.confirm !== values.password) {
            setError('Password does not match.');
            return;
        }
        router.push('/signUp/success');
    }
    return (
        <div style={{ textAlign: 'left' }}>
            <Image src={tempImageSrc ? tempImageSrc.toString() : '/img/user.png'} width={150} height={150} alt="user" className={fileUploaded ? 'success' : ''} style={{ margin: 'auto', borderRadius: '50%', width: '150px', height: '150px' }}></Image>
            <div style={{ padding: '30px ' }}>
                <Input type="file"
                    className={fileUploaded ? "success" : ''}
                    accept="image/*"
                    onChange={(event) => {
                        const file = event.target.files && event.target.files[0];
                        if (file) {
                            // Use FileReader to read the file and set it as temp image source
                            const reader = new FileReader();
                            reader.onload = () => {
                                if (reader.readyState === FileReader.DONE) {
                                    setTempImageSrc(reader.result);
                                }
                            };
                            reader.readAsDataURL(file);
                            setFileUploaded(true);
                        }
                    }} />

            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div style={{ marginBottom: '20px' }}>
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input className={field.value !== '' ? "success" : ''} placeholder="Input username" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div style={{ marginBottom: '20px' }}>

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input className={field.value !== '' ? "success" : ''} placeholder="Input password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div style={{ marginBottom: '20px' }}>

                        <FormField
                            control={form.control}
                            name="confirm"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password Confirm</FormLabel>
                                    <FormControl>
                                        <Input className={field.value !== '' ? "success" : ''} placeholder="Input password again" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <Button type="submit">Submit</Button>
                    </div>
                    <div style={{ textAlign: 'center', color: 'red' }}>{error}</div>
                </form>
            </Form>
        </div>

    )
}