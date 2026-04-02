import Image from "next/image";

export default function Nosotros() {
  return (
    <section id="nosotros" className="bg-curiosos-fondo py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Imagen */}
          <div className="relative h-72 sm:h-96 lg:h-full rounded-2xl overflow-hidden">
            <Image
              src="/img/header.jpg"
              alt="Curiosos Piñatería"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-curiosos-morado/10 rounded-2xl" />
          </div>

          {/* Texto */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-curiosos-morado mb-2">
              Nuestra historia
            </p>
            <h2 className="text-3xl font-bold text-curiosos-texto mb-6">
              ¿Quiénes somos?
            </h2>
            <p className="text-curiosos-texto-suave leading-relaxed mb-4">
              Curiosos nació con una misión sencilla: hacer que cada celebración sea especial.
              Somos una piñatería colombiana ubicada en Barrio La Paz, con años de experiencia
              ayudando a familias a crear momentos inolvidables.
            </p>
            <p className="text-curiosos-texto-suave leading-relaxed mb-8">
              Desde decoraciones para fiestas hasta desayunos sorpresa y anchetas personalizadas,
              nos encargamos de los detalles para que tú solo te preocupes por disfrutar.
            </p>

            {/* Valores */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white rounded-2xl p-4 border border-curiosos-borde text-center">
                <span className="text-3xl block mb-2">🎉</span>
                <p className="text-sm font-semibold text-curiosos-texto">Creatividad</p>
                <p className="text-xs text-curiosos-texto-suave mt-1">Cada detalle diseñado con amor</p>
              </div>
              <div className="bg-white rounded-2xl p-4 border border-curiosos-borde text-center">
                <span className="text-3xl block mb-2">🤝</span>
                <p className="text-sm font-semibold text-curiosos-texto">Confianza</p>
                <p className="text-xs text-curiosos-texto-suave mt-1">Cumplimos siempre lo que prometemos</p>
              </div>
              <div className="bg-white rounded-2xl p-4 border border-curiosos-borde text-center">
                <span className="text-3xl block mb-2">💜</span>
                <p className="text-sm font-semibold text-curiosos-texto">Calidad</p>
                <p className="text-xs text-curiosos-texto-suave mt-1">Productos seleccionados con cuidado</p>
              </div>
            </div>

            {/* CTA */}
            <a
              href="https://wa.me/573102957076?text=Hola, quiero saber más sobre Curiosos"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-8 bg-curiosos-morado text-white px-6 py-3 rounded-xl text-sm font-medium hover:opacity-90 transition"
            >
              Contáctanos por WhatsApp
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
