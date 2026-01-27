import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import DetLogoHero from "./_components/DetLogoHero";

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-1 flex-col">
        <DetLogoHero />
      </main>
      <Footer />
    </div>
  );
}
