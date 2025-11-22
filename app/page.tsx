import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import Core from "../components/sections/Core";
import DetToDetaiBridge from "../components/sections/DetToDetaiBridge";
import Hero from "../components/sections/Hero";
import Mission from "../components/sections/Mission";
import Projects from "../components/sections/Projects";

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-gray-900">
      <Header />
      <main className="flex flex-1 flex-col gap-0">
        <Hero />
        <DetToDetaiBridge />
        <Projects />
        <Core />
        <Mission />
      </main>
      <Footer />
    </div>
  );
}
