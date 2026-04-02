import { connectDB } from "@/lib/mongodb";
import Producto from "@/models/Producto";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Categorias from "@/components/Categorias";
import Destacados from "@/components/Destacados";
import Nosotros from "@/components/Nosotros";
import Footer from "@/components/Footer";

export default async function Home() {
  await connectDB();
  const destacados = await Producto.find({ destacado: true }).limit(8).lean();
  const destacadosSerializados = JSON.parse(JSON.stringify(destacados));

  return (
    <>
      <Header />
      <Hero />
      <Categorias />
      <Destacados productos={destacadosSerializados} />
      <Nosotros />
      <Footer />
    </>
  );
}
