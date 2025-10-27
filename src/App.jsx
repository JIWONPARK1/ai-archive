import styles from "./App.module.scss";
import MainTab from "./components/MainTab";
import statistics from "./datas/statistics.json";
import archives from "./datas/archives.json";
import { useMemo, useState } from "react";
import ImageList from "./components/ImageList";
import SubTab from "./components/SubTab";
import Statistics from "./components/Statistics";
import ImageDetailModal from "./components/ImageDetailModal";
import FilterModal from "./components/FilterModal";
import Header from "./components/Header";
import { useFilterStore } from "./stores/filterState";
import FilterOption from "./components/FilterOption";

function App() {
  const [selectedArchive, setSelectedArchive] = useState("all");
  const [selectedShapeKeyword, setSelectedShapeKeyword] = useState(null);
  const [selectedMoodKeyword, setSelectedMoodKeyword] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isOpenFilterModal, setIsOpenFilterModal] = useState(false);
  const { filterOptions } = useFilterStore();

  const handleSelectArchive = (id) => {
    setSelectedArchive(id);
    setSelectedShapeKeyword(null);
    setSelectedMoodKeyword(null);
    setSelectedImage(null);
  };

  const handleSelectShapeKeyword = (type, id) => {
    if (type === "shape") {
      setSelectedShapeKeyword(id);
      setSelectedMoodKeyword(null);
    } else if (type === "mood") {
      setSelectedMoodKeyword(id);
      setSelectedShapeKeyword(null);
    }
  };

  const handleSelectImage = (image) => {
    setSelectedImage(image);
  };

  const imageList = useMemo(() => {
    let list = [];
    if (selectedArchive === "all") {
      list = Object.values(archives).flatMap((archive) => archive.images);
    } else {
      list = archives[selectedArchive]?.images;
    }
    if (selectedShapeKeyword) {
      list = list?.filter((image) => {
        return image["Shape Keyword"].includes(selectedShapeKeyword);
      });
    }
    if (selectedMoodKeyword) {
      list = list?.filter((image) => {
        return image["Mood Keyword"].includes(selectedMoodKeyword);
      });
    }
    return list;
  }, [selectedArchive, selectedMoodKeyword, selectedShapeKeyword]);

  return (
    <div className={styles.container}>
      <Header hasBorder />
      <div className={styles.wrapper}>
        <MainTab selected={selectedArchive} onSelect={handleSelectArchive} />

        <div className={styles.contents}>
          <div className={styles.row}>
            {filterOptions.type ? (
              <FilterOption
                year={filterOptions.year}
                type={filterOptions.type}
                value={filterOptions.value}
              />
            ) : (
              <SubTab
                selected={selectedShapeKeyword || selectedMoodKeyword}
                shapeKeywords={
                  statistics[selectedArchive]?.top_shape_keyword || []
                }
                moodKeywords={
                  statistics[selectedArchive]?.top_mood_keyword || []
                }
                onSelect={handleSelectShapeKeyword}
              />
            )}
            <button
              className={styles.filterButton}
              onClick={() => setIsOpenFilterModal(!isOpenFilterModal)}
            >
              Filter
            </button>
          </div>
          <ImageList list={imageList} onSelect={handleSelectImage} />
        </div>
      </div>
      <div className={styles.sidebar}>
        {/* 통계 */}
        <Statistics selectedArchive={selectedArchive} />
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
          statistics={statistics[selectedArchive]}
          onClose={() => setIsOpenFilterModal(false)}
        />
      )}
    </div>
  );
}
export default App;
