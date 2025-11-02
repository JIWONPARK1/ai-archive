import { useFilterStore } from "../stores/filterState";
import archives from "../datas/archives.json";

export default function useGetImages() {
  const selectedArchive = useFilterStore((state) => state.selectedArchive);
  const tab = useFilterStore((state) => state.tab);

  let list = [];
  if (selectedArchive === "all") {
    list = Object.values(archives).flatMap((archive) => archive.images);
  } else {
    list = archives[selectedArchive]?.images || [];
  }

  if (tab) {
    if (tab.type === "shape") {
      list = list.filter((image) => {
        return image["Shape Keyword"]?.includes(tab.value);
      });
    } else if (tab.type === "mood") {
      list = list.filter((image) => {
        return image["Mood Keyword"]?.includes(tab.value);
      });
    }
  }
  return list;
}
