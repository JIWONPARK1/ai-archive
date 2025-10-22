import styles from "./App.module.scss";
import MainTab from "./components/MainTab/MainTab";
import dummy from "./datas/dummy.json";
import { useMemo, useState } from "react";
import ImageList from "./components/ImageList/ImageList";
import SubTab from "./components/SubTab/SubTab";
import Statistics from "./components/Statistics/Statistics";
import ImageDetailModal from "./components/ImageDetailModal";
import FilterModal from "./components/FilterModal";
import Header from "./components/Header";

function App() {
  const { archiveList, contents } = dummy;
  const [selectedArchive, setSelectedArchive] = useState(0);
  const [selectedContent, setSelectedContent] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isOpenFilterModal, setIsOpenFilterModal] = useState(false);

  const handleSelectArchive = (id) => {
    setSelectedArchive(id);
  };

  const handleSelectContent = (id) => {
    setSelectedContent(id);
  };

  const handleSelectImage = (image) => {
    setSelectedImage(image);
  };

  const handleApplyFilter = (option, value) => {
    console.log(option, value);
    setIsOpenFilterModal(false);
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
            <SubTab
              selected={selectedContent}
              list={contents[selectedArchive]?.shapes.concat(
                contents[selectedArchive]?.moods
              )}
              onSelect={handleSelectContent}
            />
            <button
              className={styles.filterButton}
              onClick={() => setIsOpenFilterModal(!isOpenFilterModal)}
            >
              Filter
            </button>
          </div>
          <ImageList list={imageList} onSelect={handleSelectImage} />
        </div>

        {/* 필터 모달*/}
        {isOpenFilterModal && (
          <FilterModal
            open={isOpenFilterModal}
            shapes={contents[selectedArchive]?.shapes}
            moods={contents[selectedArchive]?.moods}
            onClose={() => setIsOpenFilterModal(false)}
            onApply={handleApplyFilter}
          />
        )}
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
    </div>
  );
}
export default App;
