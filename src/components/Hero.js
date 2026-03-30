import Image from "next/image";

export default function Hero() {
  return (
    <section className="bg-white">
      <div className="mx-auto w-screen max-w-7xl px-4 py-16 sm:px-6 sm:py-24 md:grid md:grid-cols-2 md:items-center md:gap-8 lg:px-8 lg:py-32">

        {/* Texto y botones */}
        <div className="max-w-prose text-left">
          <h1 className="text-4xl font-bold text-curiosos-texto sm:text-5xl">
            Todo para tu
            <strong className="text-curiosos-morado"> celebración </strong>
            especial
          </h1>

          <p className="mt-4 text-base text-curiosos-texto-suave sm:text-lg/relaxed">
            Somos una tienda especializada en organización de eventos, productos de decoración y fiestas. 🎁🧸
          </p>

          <div className="mt-6 flex gap-4">
            <a
              href="#productos"
              className="inline-block rounded-md bg-curiosos-morado px-5 py-3 text-sm font-medium text-white shadow-sm transition hover:opacity-90"
            >
              Ver productos
            </a>
            <a
              href="https://wa.me/573102957076?text=Hola%2C%20quiero%20agendar%20un%20evento"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-md border border-curiosos-borde px-5 py-3 text-sm font-medium text-curiosos-texto shadow-sm transition hover:bg-curiosos-morado-claro"
            >
              Agendar evento
            </a>
          </div>
        </div>

        {/* Foto */}
        <div className="relative mt-10 md:mt-0 h-80 md:h-full min-h-100">
          <Image
            src="/img/header.jpg"
            alt="Curiosos tienda"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-[30%] rounded-2xl shadow-lg"
            priority
          />
        </div>

      </div>
    </section>
  );
}
