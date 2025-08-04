import Image from "next/image";

export default function Logo() {
  return (
    <header className="flex flex-col gap-1 items-center">
      <div className="flex items-center justify-center gap-[1.2031rem] h-[101px]">
        <Image
          src={"/image/SiZZ_logo.svg"}
          width={68}
          height={68}
          alt="로고 이미지"
        />
        <div className="text-[85px] font-bold text-coolGray-10">SIZZ</div>
      </div>
      <div className="text-2xl leading-[150%] font-bold text-white">
        Society insight, zooming zone
      </div>
    </header>
  );
}
