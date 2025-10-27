import clsx from "clsx";
import styles from "./SubTab.module.scss";

export default function SubTab({
  shapeKeywords,
  moodKeywords,
  selected,
  onSelect,
}) {
  return (
    <ul className={styles.tabList}>
      {shapeKeywords?.map((tab) => (
        <Item
          key={tab.keyword}
          type="shape"
          keyword={tab.keyword}
          selected={selected}
          onSelect={onSelect}
        />
      ))}
      {moodKeywords?.map((tab) => (
        <Item
          type="mood"
          key={tab.keyword}
          keyword={tab.keyword}
          selected={selected}
          onSelect={onSelect}
        />
      ))}
    </ul>
  );
}

const Item = ({ type, keyword, selected, onSelect }) => {
  return (
    <li key={keyword} className={styles.tabItem}>
      <button
        className={clsx(
          styles.tabButton,
          selected === keyword && styles.selected
        )}
        onClick={() => onSelect(type, keyword)}
      >
        {keyword}
      </button>
    </li>
  );
};
