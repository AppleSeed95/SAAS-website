import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
export default function SignInSuccessPage() {
    return (
        <div style={{ textAlign: 'left', paddingTop: '150px' }}>
            <Image src={'/img/success.png'} width={150} height={150} alt="user" className="rotate" style={{ margin: 'auto', borderRadius: '50%', width: '150px', height: '150px' }}></Image>

            <div style={{ padding: '60px' }}>
                <Link href={'/profile'}>
                    <Button type="submit" className="w-full">Edit</Button>
                </Link>
            </div>

        </div>
    )
}