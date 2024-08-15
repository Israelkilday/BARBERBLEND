"use client";

import { Button } from "./ui/button";
import { DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { FaGoogle } from "react-icons/fa";
import { signIn, signOut, useSession } from "next-auth/react";

const handleLoginClick = () => signIn("google");

const SigInDialog = () => {
  return (
    <main className="flex flex-col gap-5">
      <DialogHeader>
        <DialogTitle>Faça Login na Plataforma</DialogTitle>
        <DialogDescription>
          Conecte-se com sua conta do Google para habilitar agendamento.
        </DialogDescription>
      </DialogHeader>

      <Button
        className="flex gap-2"
        onClick={handleLoginClick}
        variant="secondary"
      >
        <FaGoogle className="h-5 w-5" />
        Google
      </Button>
    </main>
  );
};

export default SigInDialog;
