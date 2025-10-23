import styles from "./App.module.scss";
import MainTab from "./components/MainTab";
import dummy from "./datas/dummy.json";
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
  const { archiveList, contents } = dummy;
  const [selectedArchive, setSelectedArchive] = useState(0);
  const [selectedContent, setSelectedContent] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isOpenFilterModal, setIsOpenFilterModal] = useState(false);
  const { filterOptions } = useFilterStore();

  const handleSelectArchive = (id) => {
    setSelectedArchive(id);
  };

  const handleSelectContent = (id) => {
    setSelectedContent(id);
  };

  const handleSelectImage = (image) => {
    setSelectedImage(image);
  };

  const imageList = useMemo(() => {
    return contents[selectedArchive]?.datas[selectedContent]?.list;
  }, [contents, selectedArchive, selectedContent]);

  return (
    <div className={styles.container}>
      <Header hasBorder />
      <div className={styles.wrapper}>
        <MainTab
          list={archiveList}
          selected={selectedArchive}
          onSelect={handleSelectArchive}
        />

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
                selected={selectedContent}
                list={contents[selectedArchive]?.shapes.concat(
                  contents[selectedArchive]?.moods
                )}
                onSelect={handleSelectContent}
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
        <Statistics
          statistics={
            contents[selectedArchive]?.datas[selectedContent]?.statistics
          }
        />
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
          shapes={contents[selectedArchive]?.shapes}
          moods={contents[selectedArchive]?.moods}
          onClose={() => setIsOpenFilterModal(false)}
        />
      )}
    </div>
  );
}
export default App;
