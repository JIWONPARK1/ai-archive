import { useMemo } from "react";
import archives from "../datas/archives.json";
import { useFilterStore } from "../stores/filterState";
import { FILTER_OPTIONS } from "../constants/config";

export default function useImageList(
  selectedArchive,
  selectedShapeKeyword,
  selectedMoodKeyword
) {
  const { filterOptions } = useFilterStore();

  const imageList = useMemo(() => {
    let list = [];

    if (selectedArchive === "all") {
      list = Object.values(archives).flatMap((archive) => archive.images);
    } else {
      list = archives[selectedArchive]?.images || [];
    }

    // 2. Shape Keyword 필터링
    if (selectedShapeKeyword) {
      list = list.filter((image) => {
        return image["Shape Keyword"]?.includes(selectedShapeKeyword);
      });
    }

    // 3. Mood Keyword 필터링
    if (selectedMoodKeyword) {
      list = list.filter((image) => {
        return image["Mood Keyword"]?.includes(selectedMoodKeyword);
      });
    }

    // 4. Filter Options 필터링
    if (filterOptions.type && filterOptions.value) {
      console.log("useImageList.js - filterOptions:", list);
      if (filterOptions.type === "year") {
        list = list.filter((image) => {
          return image.year === filterOptions.value;
        });
      } else {
        list = list.filter((image) => {
          return (
            image[FILTER_OPTIONS[filterOptions.type]] === filterOptions.value
          );
        });
      }
    }

    // 5. Year 필터링 (ALL이 아닌 경우에만)
    if (filterOptions.year && filterOptions.year !== "ALL") {
      list = list.filter((image) => {
        return image.year === filterOptions.year;
      });
    }

    return list;
  }, [
    selectedArchive,
    selectedShapeKeyword,
    selectedMoodKeyword,
    filterOptions,
  ]);

  return {
    imageList,
  };
}
