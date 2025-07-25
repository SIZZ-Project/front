import "@/styles/globals.css";
import TopSection from "@/app/(home)/components/home-top/TopSection";
import BottomSection from "./components/home-bottom/BottomSection";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <>
      <main className="mx-auto">
        <TopSection />
        <BottomSection />
      </main>
      <Footer />
    </>
  );
}
