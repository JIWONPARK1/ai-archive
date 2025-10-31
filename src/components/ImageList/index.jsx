import styles from "./ImageList.module.scss";

export default function ImageList({ list, onSelect }) {
  return (
    <div className={styles.container}>
      {list.length === 0 ? (
        <div className={styles.empty}>
          <p>목록이 없습니다.</p>
        </div>
      ) : (
        <ul className={styles.list}>
          {list?.map((item) => (
            <li key={`${item.title}-${item.id}`} className={styles.item}>
              <img
                src={`/archives/${item.file_name}`}
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
