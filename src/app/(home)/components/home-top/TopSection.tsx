import ImagePanel from "@/app/(home)/components/home-top/ImagePanel";
import LogoTitle from "@/app/(home)/components/home-top/LogoTitle";
import WhySIZZCard from "@/app/(home)/components/home-top/WhySIZZCard";

export default function TopSection() {
  return (
    <div className="relative flex gap-[38.0625rem] justify-center h-[61.1875rem] overflow-x-hidden">
      <LogoTitle />
      <ImagePanel />
      <WhySIZZCard />
    </div>
  );
}
