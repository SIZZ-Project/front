import Tabs from "./_components/Tabs";
import SearchBox from "./_components/SearchBox";

import NewsCardWithImage from "./_components/NewsCardWithImage";

export default function CommunityPage() {
  return (
    <div className="pt-[103px] flex flex-col gap-[88px]">
      <div className="flex items-center gap-[14px]">
        <Tabs />
        <SearchBox />
      </div>

      <NewsCardWithImage />
    </div>
  );
}
