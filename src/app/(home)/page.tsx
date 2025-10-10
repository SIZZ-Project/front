import "@/styles/globals.css";
import TopSection from "@/app/(home)/_components/home-top/TopSection";
import BottomSection from "./_components/home-bottom/BottomSection";
import Footer from "@/components/Footer";

export default async function Page() {
  return (
    <main className="mx-auto">
      <TopSection />
      <BottomSection />
      <Footer />
    </main>
  );
}
