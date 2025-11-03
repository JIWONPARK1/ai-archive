import { useFilterStore } from "../stores/filterState";
import archives from "../datas/archives.json";

export default function useGetImages() {
  const selectedArchive = useFilterStore((state) => state.selectedArchive);

  let list = [];
  if (selectedArchive === "all") {
    list = Object.values(archives).flatMap((archive) => archive.images);
  } else {
    list = archives[selectedArchive]?.images || [];
  }

  return list;
}
