import styles from "./EmphasisItem.module.scss";

export default function EmphasisItem({ list }) {
  return (
    <ul className={styles.container}>
      {list?.map((item) => {
        const name = Object.keys(item);
        const value = Object.values(item);
        return (
          <li key={name} className={styles.item}>
            <img
              src={`/images/image_emphasis_${name}.png`}
              alt={name}
              className={styles.image}
            />
            <p className={styles.value}>{value}%</p>
          </li>
        );
      })}
    </ul>
  );
}
