import styles from "./FilterOption.module.scss";
import { ICONS } from "../../constants/config";
import ColorCircle from "../ColorCircle";

export default function FilterOption({ year, type, value }) {
  return (
    <div className={styles.filterOptions}>
      <span className={styles.filterYear}>{year}</span>

      {type === "shape" || type === "mood" ? (
        <span className={styles.filterValue}>{value}</span>
      ) : type === "color" ? (
        <ColorCircle size="md" color={value} />
      ) : (
        <img
          src={ICONS[type][value]}
          alt={String(value).toLowerCase()}
          className={styles.filterIcon}
        />
      )}
    </div>
  );
}
