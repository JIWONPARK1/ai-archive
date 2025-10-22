import clsx from "clsx";
import styles from "./SubTab.module.scss";

export default function SubTab({ list, selected, onSelect }) {
  return (
    <ul className={styles.tabList}>
      {list?.map((tab, index) => (
        <li key={tab.id} className={styles.tabItem}>
          <button
            className={clsx(
              styles.tabButton,
              selected === index && styles.selected
            )}
            onClick={() => onSelect(index)}
          >
            {tab.name}
          </button>
        </li>
      ))}
    </ul>
  );
}
