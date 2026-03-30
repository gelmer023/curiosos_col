import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white border-b border-curiosos-borde">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">

          {/* Logo */}
          <div className="flex items-center">
            <Link href="/">
              <Image
                src="/img/Logo.svg"
                alt="Curiosos"
                width={48}
                height={48}
                priority
              />
            </Link>
          </div>

          {/* Links de navegación — solo visibles en pantallas medianas y grandes */}
          <div className="hidden md:block">
            <nav aria-label="Navegación principal">
              <ul className="flex items-center gap-6 text-sm">
                <li>
                  <Link
                    className="text-curiosos-texto-suave transition hover:text-curiosos-morado"
                    href="#categorias"
                  >
                    Categorías
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-curiosos-texto-suave transition hover:text-curiosos-morado"
                    href="/productos"
                  >
                    Productos
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-curiosos-texto-suave transition hover:text-curiosos-morado"
                    href="#eventos"
                  >
                    Eventos
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-curiosos-texto-suave transition hover:text-curiosos-morado"
                    href="#nosotros"
                  >
                    Nosotros
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* Botón de acción + menú hamburguesa */}
          <div className="flex items-center gap-4">
            {/* Botón WhatsApp — visible en pantallas medianas y grandes */}
            <div className="hidden sm:flex">
              <a
                href="https://wa.me/573102957076"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md bg-curiosos-morado px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:opacity-90"
              >
                Contáctanos
              </a>
            </div>

            {/* Botón hamburguesa — solo en móvil */}
            <div className="block md:hidden">
              <button className="rounded-sm bg-curiosos-morado-claro p-2 text-curiosos-morado transition hover:opacity-75">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}
