import ColorCircle from "../../ColorCircle";
import styles from "./ColorItem.module.scss";

export default function ColorItem({ list }) {
  return (
    <ul className={styles.container}>
      {list?.map((item) => {
        const name = Object.keys(item);
        const value = Object.values(item);
        return (
          <li key={name} className={styles.item}>
            <ColorCircle size="lg" color={name} />
            <p className={styles.value}>{Math.round((value / 35) * 100)}%</p>
          </li>
        );
      })}
    </ul>
  );
}
