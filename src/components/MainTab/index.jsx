import clsx from "clsx";
import styles from "./MainTab.module.scss";
import archives from "../../datas/archives.json";

export default function MainTab({ selected, onSelect }) {
  const allArchives = { all: { id: 0, name: "ALL" }, ...archives };

  return (
    <ul className={clsx(styles.accountList, styles.line)}>
      {Object.keys(allArchives).map((item) => (
        <li key={item} className={styles.accountItem}>
          <button
            className={clsx(
              styles.accountButton,
              selected === item && styles.selected
            )}
            onClick={() => onSelect(item)}
          >
            {allArchives[item]?.name}
          </button>
        </li>
      ))}
    </ul>
  );
}
