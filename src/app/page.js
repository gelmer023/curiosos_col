import Categorias from "@/components/Categorias";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Categorias />
      <Footer />
      <main>
        <p>Hola Curiosos</p>
      </main>
    </>
  );
}
