const categorias = [
  { emoji: "🎉", nombre: "Decoración y Fiestas", color: "bg-curiosos-morado-claro" },
  { emoji: "🎁", nombre: "Anchetas y Detalles", color: "bg-curiosos-naranja-claro" },
  { emoji: "☕", nombre: "Desayunos Sorpresa", color: "bg-curiosos-rosa-claro" },
  { emoji: "🧸", nombre: "Peluches y Accesorios", color: "bg-curiosos-morado-claro" },
  { emoji: "📚", nombre: "Librería", color: "bg-curiosos-naranja-claro" },
  { emoji: "🎪", nombre: "Organización de Eventos", color: "bg-curiosos-rosa-claro" },
];

export default function Categorias() {
  return (
    <section id="categorias" className="bg-curiosos-fondo py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Título de la sección */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-curiosos-texto">
            ¿Qué estás buscando?
          </h2>
          <p className="mt-2 text-curiosos-texto-suave">
            Encuentra todo lo que necesitas para tu celebración
          </p>
        </div>

        {/* Grilla de tarjetas */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {categorias.map((cat) => (
            <div
              key={cat.nombre}
              className={`${cat.color} rounded-2xl p-6 flex flex-col items-center gap-3 cursor-pointer transition hover:scale-105 hover:shadow-md`}
            >
              <span className="text-5xl">{cat.emoji}</span>
              <p className="text-sm font-semibold text-curiosos-texto text-center">
                {cat.nombre}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
