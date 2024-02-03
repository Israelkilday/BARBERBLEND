"use client"

import { Avatar, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import { CalendarIcon, HomeIcon, LogInIcon, LogOutIcon, MenuIcon, UserIcon } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";

const SideMenu = () => {
    const { data } = useSession();

    const handleLogoutClick = () => signOut();
    const handleLoginClick = () => signIn("google");

    return (
        <>
            <SheetHeader className="text-left border-b border-solid border-secondary p-5">
                            <SheetTitle>Menu</SheetTitle>
                        </SheetHeader>

                        {data?.user ? (
                            <div className="flex justify-between px-5 py-6 items-center">
                                <div className="items-center gap-3">
                                    <Avatar>
                                        <AvatarImage src={data.user?.image ?? ""} />
                                    </Avatar>

                                    <h2 className="font-bold">{data.user.name}</h2>
                                </div>

                                <Button variant="secondary" size="icon">
                                    <LogOutIcon onClick={handleLogoutClick} />
                                </Button>
                            </div>

                        ) : (
                            <div className="flex flex-col px-5 py-6 gap-3">
                                <div className="flex items-center gap-2">
                                    <UserIcon size={32} />

                                    <h2 className="font-bold">Olá, faça seu login</h2>
                                </div>

                                <Button
                                    variant="secondary"
                                    onClick={handleLoginClick}
                                    className="w-full justify-start"
                                >
                                    <LogInIcon className="mr-2" size={18} />
                                    Fazer Login
                                </Button>
                            </div>
                        )}

                        <div className="flex flex-col gap-3 px-5">
                            <Button variant="outline" className="justify-start" asChild>
                                <Link href="/">
                                    <HomeIcon size={18} className="mr-2" />
                                    Inicio
                                </Link>
                            </Button>

                            {data?.user && (
                                <Button variant="outline" className="justify-start" asChild>
                                    <Link href="/bookings">
                                        <CalendarIcon size={18} className="mr-2" />
                                        Agendamentos
                                    </Link>
                                </Button>
                            )}
                        </div>
        </>
    );
};

export default SideMenu;