"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { useState } from "react";

const navLinks = [
  { href: "/admin", label: "Dashboard", icon: "📊" },
  { href: "/admin/productos", label: "Productos", icon: "🎁" },
];

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const [sidebarAbierto, setSidebarAbierto] = useState(false);

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen h-full flex bg-curiosos-fondo">

      {/* Overlay oscuro en móvil cuando el sidebar está abierto */}
      {sidebarAbierto && (
        <div
          className="fixed inset-0 bg-black/40 z-20 md:hidden"
          onClick={() => setSidebarAbierto(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-white border-r border-curiosos-borde flex flex-col z-30 transition-transform duration-300
          ${sidebarAbierto ? "translate-x-0" : "-translate-x-full"}
          md:static md:h-screen md:translate-x-0 md:shrink-0 md:sticky md:top-0`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-6 border-b border-curiosos-borde">
          <Image src="/img/Logo.svg" alt="Curiosos" width={40} height={40} />
          <div>
            <p className="font-bold text-curiosos-texto text-sm">Curiosos Co</p>
            <p className="text-xs text-curiosos-texto-suave">Admin Panel</p>
          </div>
        </div>

        {/* Links */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          <p className="text-xs text-curiosos-texto-suave uppercase tracking-widest mb-3 px-3">Menú</p>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setSidebarAbierto(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition ${
                pathname === link.href
                  ? "bg-curiosos-morado text-white font-medium shadow-sm"
                  : "text-curiosos-texto-suave hover:bg-curiosos-fondo hover:text-curiosos-texto"
              }`}
            >
              <span>{link.icon}</span>
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Cerrar sesión */}
        <div className="px-4 py-5 border-t border-curiosos-borde">
          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-curiosos-texto-suave hover:bg-red-50 hover:text-red-500 w-full transition"
          >
            <span>🚪</span>
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Topbar móvil */}
        <header className="md:hidden flex items-center gap-3 bg-white border-b border-curiosos-borde px-4 py-3">
          <button
            onClick={() => setSidebarAbierto(true)}
            className="text-curiosos-texto p-1 rounded-lg hover:bg-curiosos-fondo"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <Image src="/img/Logo.svg" alt="Curiosos" width={28} height={28} />
          <span className="font-bold text-curiosos-texto text-sm">Admin Panel</span>
        </header>

        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>

    </div>
  );
}
