import ColorCircle from "../../ColorCircle";
import styles from "./ColorItem.module.scss";

export default function ColorItem({ list }) {
  const totalFrequency = list?.reduce((acc, item) => acc + item.frequency, 0);
  return (
    <ul className={styles.container}>
      {list?.map((item) => (
        <li key={item.color} className={styles.item}>
          <ColorCircle size="lg" color={item.color} />
          <p className={styles.value}>
            {Math.round((item.frequency / totalFrequency) * 100)}%
          </p>
        </li>
      ))}
    </ul>
  );
}
