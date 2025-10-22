import styles from "./ImageList.module.scss";

export default function ImageList({ list, onSelect }) {
  return (
    <div className={styles.container}>
      {list?.map((item) => (
        <div
          key={item.id}
          className={styles.item}
          onClick={() => onSelect(item)}
        >
          <img src={item.image} alt={item.name} className={styles.image} />
        </div>
      ))}
    </div>
  );
}
