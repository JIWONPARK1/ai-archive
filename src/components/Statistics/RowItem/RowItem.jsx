import { ICONS } from "../../../constants/config";
import styles from "./RowItem.module.scss";

export default function RowItem({ category, list }) {
  return (
    <ul className={styles.container}>
      {list?.map((item) => {
        const name = Object.keys(item);
        const value = Object.values(item);
        return (
          <li key={name} className={styles.item}>
            <img
              src={ICONS[category][name]}
              alt={String(name).toLowerCase()}
              className={styles.image}
            />
            <div className={styles.name}>
              {name}
              <p className={styles.value}>{value}%</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
