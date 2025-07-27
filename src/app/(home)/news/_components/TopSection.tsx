import ImagePanel from "@/app/(home)/components/home-top/ImagePanel";
import LogoTitle from "@/app/(home)/components/home-top/LogoTitle";
import WhySIZZCard from "@/app/(home)/components/home-top/WhySIZZCard";

export default function TopSection() {
  return (
    <div className="relative flex h-[61.1875rem] overflow-x-hidden">
      <LogoTitle />
      <ImagePanel />
    </div>
  );
}
