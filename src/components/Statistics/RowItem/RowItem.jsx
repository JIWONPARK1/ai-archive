import { ICONS } from "../../../constants/config";
import styles from "./RowItem.module.scss";

export default function RowItem({ category, list }) {
  const totalFrequency = list?.reduce((acc, item) => acc + item.frequency, 0);

  return (
    <ul className={styles.container}>
      {list?.map((item) => (
        <li key={item[category]} className={styles.item}>
          <img
            src={ICONS[category.replace("_", "")][item[category]]}
            alt={String(item[category.replace("_", "")]).toLowerCase()}
            className={styles.image}
          />
          <p className={styles.name}>{item[category]}</p>
          <p className={styles.value}>
            {Math.round((item.frequency / totalFrequency) * 100)}%
          </p>
        </li>
      ))}
    </ul>
  );
}
