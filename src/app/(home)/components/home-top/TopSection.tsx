import ImagePanel from "@/app/(home)/components/home-top/ImagePanel";
import LogoTitle from "@/app/(home)/components/home-top/LogoTitle";
import WhySIZZCard from "@/app/(home)/components/home-top/WhySIZZCard";

export default function TopSection() {
    return (
        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 p-4">
            <ImagePanel />
            <LogoTitle />
            <WhySIZZCard />
        </div>
    );
}