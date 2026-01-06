import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import DetaiHero from "@/components/sections/DetaiHero";
import DetaiPlatformSection from "@/components/sections/DetaiPlatformSection";
import DetaiUmbrellaBrandSection from "@/components/sections/DetaiUmbrellaBrandSection";

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-1 flex-col">
        <DetaiHero />
        <DetaiPlatformSection />
        <DetaiUmbrellaBrandSection />
      </main>
      <Footer />
    </div>
  );
}
