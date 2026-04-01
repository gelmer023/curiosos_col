"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });

    if (result.ok) {
      router.push("/admin");
    } else {
      setError("Usuario o contraseña incorrectos");
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-curiosos-fondo flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white text-curiosos-texto-suave max-w-87.5 w-full mx-4 md:p-6 p-4 text-left text-sm rounded-xl shadow-[0px_0px_10px_0px] shadow-black/10"
      >
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <Image src="/img/Logo.svg" alt="Curiosos" width={60} height={60} />
        </div>

        <h2 className="text-2xl font-semibold mb-6 text-center text-curiosos-texto">
          Panel Admin
        </h2>

        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border my-3 border-gray-500/30 outline-none rounded-full py-2.5 px-4"
          placeholder="Usuario"
          required
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border mt-1 border-gray-500/30 outline-none rounded-full py-2.5 px-4"
          placeholder="Contraseña"
          required
        />

        {error && (
          <p className="text-red-500 text-center mt-3">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-6 mb-3 bg-curiosos-morado hover:opacity-90 active:scale-95 transition py-2.5 rounded-full text-white font-medium disabled:opacity-50"
        >
          {loading ? "Ingresando..." : "Ingresar"}
        </button>
      </form>
    </main>
  );
}
