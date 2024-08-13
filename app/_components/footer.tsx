"use client";

import Link from "next/link";
import { ArrowUp, Headset, Phone, Scissors } from "lucide-react";
import { MdEmail } from "react-icons/md";
import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const Footer = () => {
  return (
    <footer className="flex flex-col">
      <div className="flex w-full flex-col justify-between bg-secondary px-5 pb-5 pt-6 lg:flex-row lg:px-32 lg:pb-9 lg:pt-5">
        <div className="flex flex-col items-start justify-center gap-5 pb-1 md:justify-start lg:pt-5">
          <Link
            href="/"
            className="flex items-center gap-1 font-bold outline-none"
          >
            <Scissors className="font-bold text-purple-500" />

            <h2 className="font-berkshire-swash md:text-lg">BARBERBLEND</h2>

            <Scissors className="trasform rotate-180 font-bold text-purple-500" />
          </Link>

          <div className="flex gap-3">
            <Link href="https://www.linkedin.com/in/israeldevfrontend">
              <FaLinkedin className="size-6 text-gray-400 duration-300 hover:font-bold hover:text-secondary-foreground" />
            </Link>

            <Link href="https://github.com/Israelkilday">
              <FaGithub className="size-6 text-gray-400 duration-300 hover:font-bold hover:text-secondary-foreground" />
            </Link>

            <Link href="https://www.instagram.com/israelkilday/">
              <FaInstagram className="size-6 text-gray-400 duration-300 hover:font-bold hover:text-secondary-foreground" />
            </Link>

            <a href="mailto:israel.kilday@yahoo.com.br">
              <MdEmail className="size-[26px] text-gray-400 duration-300 hover:font-bold hover:text-secondary-foreground" />
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-5 pt-5 lg:flex-row lg:gap-10 lg:px-0">
          <div className="flex flex-col">
            <h3 className="md:pl-5">DEPARTAMENTOS</h3>
            <div className="group flex items-center gap-1">
              <Scissors className="size-4 font-bold opacity-0 duration-200 group-hover:opacity-100" />
              <p className="text-gray-400">Serviços</p>
            </div>

            <div className="group flex items-center gap-1">
              <Scissors className="size-4 font-bold opacity-0 duration-200 group-hover:opacity-100" />
              <p className="text-gray-400">Agendamentos</p>
            </div>

            <div className="group flex items-center gap-1">
              <Scissors className="size-4 font-bold opacity-0 duration-200 group-hover:opacity-100" />
              <p className="text-gray-400">Barbearias Recomendadas</p>
            </div>
          </div>

          <div className="flex flex-col">
            <h3 className="md:pl-5">INSTITUCIONAL</h3>
            <div className="group flex items-center gap-1">
              <Scissors className="size-4 font-bold opacity-0 duration-200 group-hover:opacity-100" />
              <p className="text-gray-400">Sobre a BARBERBLEND</p>
            </div>

            <div className="group flex items-center gap-1">
              <Scissors className="size-4 font-bold opacity-0 duration-200 group-hover:opacity-100" />
              <p className="text-gray-400">Termos e condições</p>
            </div>

            <div className="group flex items-center gap-1">
              <Scissors className="size-4 font-bold opacity-0 duration-200 group-hover:opacity-100" />
              <p className="text-gray-400">
                Política de segurança e privacidade
              </p>
            </div>
          </div>

          <div className="flex flex-col">
            <h3 className="md:pl-5">CONTATO</h3>
            <div className="flex items-center gap-1">
              <Phone className="size-4 font-bold" />
              <p className="text-gray-400">(85) 91234 5678</p>
            </div>

            <div className="flex items-center gap-1">
              <Headset className="size-4 font-bold" />
              <p className="text-gray-400">SAC - 0800 1234 5678</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-gray-700 bg-secondary px-5 py-5 lg:px-32">
        <div className="lg:flex lg:gap-5">
          <p className="text-sm font-bold text-gray-400 md:text-base">
            © 2024 BARBERBLEND
            <br className="md:hidden" /> Todos os direitos reservados
          </p>

          <p className="text-sm font-bold text-gray-400 md:text-base">
            <a
              href="https://portfolioikdev-zeta-nine.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Desenvolvido por: &lt;/
              <span className="brand tracking-widest text-white duration-150 hover:text-emerald-400">
                Israel Kilday
              </span>
              &gt;
            </a>
          </p>
        </div>

        <button
          onClick={scrollToTop}
          className="animate-bounce rounded-full border border-gray-600 p-2 outline-none"
        >
          <ArrowUp />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
