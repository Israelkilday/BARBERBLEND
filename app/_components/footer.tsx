import { Headset, Phone, Scissors } from "lucide-react";
import Link from "next/link";
// REACT ICONS
import { MdEmail } from "react-icons/md";
import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";

const Footer = () => {
    return (

        <footer className="flex flex-col" >
            <div className="w-full flex flex-col justify-between lg:flex-row bg-secondary py-6 px-5 lg:px-32">
                <div className="flex flex-col gap-5 items-start justify-center md:justify-start pb-5 mt-5">
                    <Link href="/" className="flex gap-1 font-bold outline-none">
                        <Scissors className="font-bold" />

                        <h2>BARBERBLEND</h2>

                        <Scissors className="font-bold trasform rotate-180" />
                    </Link>

                    <div className="flex gap-3">
                        <Link href="https://www.linkedin.com/in/israeldevfrontend">
                            <FaLinkedin className="size-6 text-gray-400 hover:text-secondary-foreground duration-300" />
                        </Link>

                        <Link href="https://github.com/Israelkilday">
                            <FaGithub className="size-6 text-gray-400 hover:text-secondary-foreground duration-300" />
                        </Link>

                        <Link href="https://www.instagram.com/israelkilday/">
                            <FaInstagram className="size-6 text-gray-400 hover:text-secondary-foreground duration-300" />
                        </Link>

                        <a href="mailto:israel.kilday@yahoo.com.br">
                            <MdEmail className="size-6 text-gray-400 hover:text-secondary-foreground duration-300" />
                        </a>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row pt-5 lg:px-0 gap-5 lg:gap-10">
                    <div className="flex flex-col">
                        <h3 className="md:pl-5">DEPARTAMENTOS</h3>
                        <div className="flex items-center gap-1 group">
                            <Scissors className="size-4 opacity-0 group-hover:opacity-100 duration-200" />
                            <p className="text-gray-400">Serviços</p>
                        </div>

                        <div className="flex items-center gap-1 group">
                            <Scissors className="size-4 opacity-0 group-hover:opacity-100 duration-200" />
                            <p className="text-gray-400">Agendamentos</p>
                        </div>

                        <div className="flex items-center gap-1 group">
                            <Scissors className="size-4 opacity-0 group-hover:opacity-100 duration-200" />
                            <p className="text-gray-400">Barbearias Recomendadas</p>
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <h3 className="md:pl-5">INSTITUCIONAL</h3>
                        <div className="flex items-center gap-1 group">
                            <Scissors className="size-4 opacity-0 group-hover:opacity-100 duration-200" />
                            <p className="text-gray-400">Sobre a BARBERBLEND</p>
                        </div>

                        <div className="flex items-center gap-1 group">
                            <Scissors className="size-4 opacity-0 group-hover:opacity-100 duration-200" />
                            <p className="text-gray-400">Termos e condições</p>
                        </div>

                        <div className="flex items-center gap-1 group">
                            <Scissors className="size-4 opacity-0 group-hover:opacity-100 duration-200" />
                            <p className="text-gray-400">Política de segurança e privacidade</p>
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <h3 className="md:pl-5">CONTATO</h3>
                        <div className="flex items-center gap-1">
                            <Phone className="size-4" />
                            <p className="text-gray-400">(85) 91234 5678</p>
                        </div>

                        <div className="flex items-center gap-1">
                            <Headset className="size-4" />
                            <p className="text-gray-400">SAC - 0800 1234 5678</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="px-5 lg:px-32 py-6 border-t border-gray-700 bg-secondary">
                <p className="text-gray-400 text-xs font-bold opacity-75 md:text-base">
                    © 2024 ISRAEL KILDAY - Todos os direitos reservados
                </p>
            </div>
        </footer>
    );
}

export default Footer;