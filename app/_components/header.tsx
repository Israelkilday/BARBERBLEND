"use client"

import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { CalendarIcon, CircleUserRound, LogInIcon, MenuIcon } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import SideMenu from "./side-menu";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

const Header = () => {
    const { data } = useSession();

    const handleLogoutClick = () => signOut();
    const handleLoginClick = () => signIn("google");

    return (
        <header>
            <Card>
                <CardContent className="p-5 justify-between items-center flex flex-row md:px-32">
                    <Link href="/">
                        <Image src="/Logo.png" alt="FSW Barber" height={22} width={120} />
                    </Link>

                    <Sheet>
                        <SheetTrigger asChild>
                            <div className="flex gap-2">
                                <Button
                                    asChild
                                    className="justify-start bg-card border-none hidden md:flex hover:bg-accent"
                                >
                                    <Link href="/bookings">
                                        <CalendarIcon size={18} className="mr-2" />
                                        Agendamentos
                                    </Link>
                                </Button>

                                <Button
                                    onClick={handleLoginClick}
                                    className="w-full justify-start hover:bg-primary/85 hidden md:flex"
                                >
                                    <CircleUserRound className="mr-2" size={18} />
                                    Perfil
                                </Button>

                                <Button variant="outline" size="icon" className="h-8 w-8 md:hidden">
                                    <MenuIcon size={18} />
                                </Button>
                            </div>
                        </SheetTrigger>

                        <SheetContent className="p-0">
                            <SideMenu />
                        </SheetContent>
                    </Sheet>
                </CardContent>
            </Card>
        </header>
    );
};

export default Header;