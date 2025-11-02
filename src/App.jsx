import styles from "./App.module.scss";
import MainTab from "./components/MainTab";
import { useEffect, useMemo, useState } from "react";
import ImageList from "./components/ImageList";
import SubTab from "./components/SubTab";
import Statistics from "./components/Statistics";
import ImageDetailModal from "./components/ImageDetailModal";
import statisticsData from "./datas/statistics.json";
import FilterModal from "./components/FilterModal";
import Header from "./components/Header";
import { useFilterStore } from "./stores/filterState";
import FilterOption from "./components/FilterOption";
import useStatistics from "./hooks/useStatistics";
import useImageList from "./hooks/useImageList";
import { useSelectedStore } from "./stores/selectedState";

function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isOpenFilterModal, setIsOpenFilterModal] = useState(false);
  const { selectedArchive, mode } = useFilterStore();
  const { setShapes, setMoods } = useSelectedStore();
  useImageList(selectedArchive);
  const { statistics } = useStatistics();

  const handleSelectImage = (image) => {
    setSelectedImage(image);
  };
  const selectedStatistics = useMemo(() => {
    return statisticsData[selectedArchive];
  }, [selectedArchive]);

  useEffect(() => {
    if (selectedArchive) {
      setShapes(selectedStatistics?.top_shape_keyword || []);
      setMoods(selectedStatistics?.top_mood_keyword || []);
    }
  }, [
    setMoods,
    setShapes,
    selectedArchive,
    selectedStatistics?.top_shape_keyword,
    selectedStatistics?.top_mood_keyword,
  ]);

  return (
    <div className={styles.container}>
      <Header hasBorder />
      <div className={styles.wrapper}>
        <MainTab />

        <div className={styles.contents}>
          <div className={styles.row}>
            {mode === "modal" ? <FilterOption /> : <SubTab />}
            <button
              className={styles.filterButton}
              onClick={() => setIsOpenFilterModal(!isOpenFilterModal)}
            >
              Filter
            </button>
          </div>
          <ImageList onSelect={handleSelectImage} />
        </div>
      </div>
      <div className={styles.sidebar}>
        {/* 통계 */}
        <Statistics statistics={statistics} />
        {/* 이미지 상세 */}
        {selectedImage && (
          <ImageDetailModal
            image={selectedImage}
            onClose={() => setSelectedImage(null)}
          />
        )}
      </div>

      {/* 필터 모달*/}
      {isOpenFilterModal && (
        <FilterModal
          open={isOpenFilterModal}
          years={selectedStatistics?.year_frequency || []}
          statistics={statistics}
          onClose={() => setIsOpenFilterModal(false)}
        />
      )}
    </div>
  );
}
export default App;
