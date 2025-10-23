import clsx from "clsx";
import styles from "./MainTab.module.scss";

export default function MainTab({ list, selected, onSelect }) {
  return (
    <ul className={clsx(styles.accountList, styles.line)}>
      {list?.map((item, index) => (
        <li key={item.id} className={styles.accountItem}>
          <button
            className={clsx(
              styles.accountButton,
              selected === index && styles.selected
            )}
            onClick={() => onSelect(index)}
          >
            {item.name}
          </button>
        </li>
      ))}
    </ul>
  );
}
