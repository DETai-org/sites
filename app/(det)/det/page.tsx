import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import DetHero from "@/components/sections/DetHero";
import DetPractice from "@/components/sections/DetPractice";
import DetScience from "@/components/sections/DetScience";
import DetValues from "@/components/sections/DetValues";

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col bg-basic-light text-basic-dark">
      <Header />
      <main className="flex flex-1 flex-col">
        <DetHero />
        <DetValues />
        <DetScience />
        <DetPractice />
      </main>
      <Footer />
    </div>
  );
}
