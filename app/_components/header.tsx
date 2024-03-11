"use client"

import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { CalendarIcon, CircleUserRound, LogInIcon, LogOutIcon, MenuIcon, Scissors, UserIcon } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import SideMenu from "./side-menu";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarImage } from "./ui/avatar";

const Header = () => {
    const { data } = useSession();

    const handleLogoutClick = () => signOut();
    const handleLoginClick = () => signIn("google");

    return (
        <header>
            <Card>
                <CardContent className="p-5 justify-between items-center flex flex-row lg:px-32">
                    <Link href="/" className="flex items-center gap-1 p-2 rounded-md hover:bg-accent font-bold duration-300 outline-none">
                        <Scissors className="font-bold text-purple-500" />
                        
                        <h2 className="md:text-lg font-berkshire-swash">BARBERBLEND</h2>
                        
                        <Scissors className="font-bold text-purple-500 trasform rotate-180" />
                    </Link>

                    {data?.user ? (
                        <div className="flex gap-2 justify-between px-5 items-center">
                            <div className="hidden items-center gap-3 lg:flex">
                                <Avatar>
                                    <AvatarImage src={data.user?.image ?? ""} />
                                </Avatar>

                                <h2 className="font-bold md:text-lg">{data.user.name}</h2>

                                <Button
                                    asChild
                                    className="justify-start bg-card border-none hidden lg:flex hover:bg-accent"
                                >
                                    <Link href="/bookings" className="md:text-lg">
                                        <CalendarIcon size={24} className="mr-2" />
                                        Agendamentos
                                    </Link>
                                </Button>

                                <Button
                                    variant="secondary"
                                    size="icon"
                                    className="hidden lg:flex"
                                >
                                    <LogOutIcon onClick={handleLogoutClick} />
                                </Button>
                            </div>
                        </div>

                    ) : (
                        <Button
                            onClick={handleLoginClick}
                            className="hover:bg-primary/85 hidden lg:flex md:text-lg"
                        >
                            <CircleUserRound className="mr-2" size={24} />
                            Login
                        </Button>
                    )}

                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline" size="icon" className="h-8 w-8 md:h-9 md:w-9 lg:hidden">
                                <MenuIcon size={26} className="md:block" />
                            </Button>
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