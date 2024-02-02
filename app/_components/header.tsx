"use client"

import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";
import { signIn } from "next-auth/react";

const Header = () => {
    const handleLoginClick = async () => {
        await signIn();
    };

    return (
        <Card>
            <CardContent className="p-5 justify-between items-center flex flex-row">

                <Image src="/Logo.png" alt="FSW Barber" height={22} width={120} />

                {/* <Button variant="outline" size="icon" className="h-8 w-8">
                    <MenuIcon size={18} />
                </Button> */}

                <Button onClick={handleLoginClick}>Login</Button>
            </CardContent>
        </Card>
    );
}

export default Header;