"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Image from "next/image"
import React, { useState } from "react"

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
    username: z.string(),
    password: z.string(),
})

export default function SignInPage() {
    const [error, setError] = useState('');
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        if (values.username === '') {
            setError('Input username.');
            return;
        }
        if (values.password === '') {
            setError('Input passwrod.');
            return;
        }
        console.log(values)
    }
    return (
        <div style={{ textAlign: 'left', paddingTop: '100px' }}>
            <Image src={'/img/user.png'} width={150} height={150} alt="user" style={{ margin: 'auto', borderRadius: '50%', width: '150px', height: '150px' }}></Image>

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
                                        <Input placeholder="Input username" {...field} />
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
                                        <Input placeholder="Input password" {...field} />
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