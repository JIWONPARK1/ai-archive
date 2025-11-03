import clsx from "clsx";
import styles from "./MainTab.module.scss";
import archives from "../../datas/archives.json";
import { useFilterStore } from "../../stores/filterState";
import { useShallow } from "zustand/react/shallow";
import { useEffect } from "react";
import { useImageListStore } from "../../stores/imageState";

export default function MainTab() {
  const allArchives = { all: { id: 0, name: "ALL" }, ...archives };
  const {
    selectedArchive,
    setSelectedArchive,
    setFilterOptions,
    setFilterMode,
    setTab,
  } = useFilterStore(useShallow((state) => state));

  const { setImageList } = useImageListStore();

  const handleSelectArchive = (archive) => {
    setSelectedArchive(archive);
    setFilterOptions({ year: "ALL", type: null, value: null });
    setFilterMode("tab");
    setTab(null);
  };

  useEffect(() => {
    if (selectedArchive === "all") {
      const images = Object.values(archives).flatMap(
        (archive) => archive.images
      );
      setImageList(images);
    } else {
      const images = archives[selectedArchive]?.images || [];
      setImageList(images);
    }
  }, [setImageList, selectedArchive]);

  return (
    <ul className={clsx(styles.accountList, styles.line)}>
      {Object.keys(allArchives).map((item) => (
        <li key={item} className={styles.accountItem}>
          <button
            className={clsx(
              styles.accountButton,
              selectedArchive === item && styles.selected
            )}
            onClick={() => handleSelectArchive(item)}
          >
            {allArchives[item]?.name}
          </button>
        </li>
      ))}
    </ul>
  );
}
