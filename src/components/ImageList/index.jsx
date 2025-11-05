import { useImageListStore } from "../../stores/imageState";
import styles from "./ImageList.module.scss";

export default function ImageList({ onSelect }) {
  const { imageList } = useImageListStore();

  return (
    <div className={styles.container}>
      {imageList.length === 0 ? (
        <div className={styles.empty}>
          <p>목록이 없습니다.</p>
        </div>
      ) : (
        <ul className={styles.list}>
          {imageList?.map((item) => (
            <li key={`${item.title}-${item.id}`} className={styles.item}>
              <img
                loading="lazy"
                src={`/archives/${item.file_name.replace("#", "")}`}
                alt={item.name}
                className={styles.image}
                onClick={() => onSelect(item)}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
