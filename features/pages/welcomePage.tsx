"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"



export default function WelcomePage() {

    return (
        <div>
            <div style={{ marginBottom: '250px', fontSize: '50px' }}>
                <div>
                    Welcome to
                </div>
                <div style={{ fontSize: '30px' }}>
                    Amend
                </div>
            </div>
            <div style={{ paddingLeft: '30px', paddingRight: '30px', marginBottom: '20px' }}>
                <Link href='/signUp'>
                    <Button className="w-full">Create</Button>
                </Link>
            </div>
            <div style={{ paddingLeft: '30px', paddingRight: '30px' }}>
                <Button className="w-full">Login</Button>
            </div>

        </div>

    )
}