import styles from "./YearItem.module.scss";

export default function YearItem({ list }) {
  return (
    <ul className={styles.container}>
      {list?.map((item) => {
        const value = Object.keys(item);
        const name = Object.values(item);
        return (
          <li key={name} className={styles.item}>
            <p className={styles.year}>{value}</p>
            <div className={styles.bar}>
              <div
                className={styles.barInner}
                style={{ width: `${name}%` }}
              ></div>
            </div>
            <p className={styles.percentage}>{name}</p>
          </li>
        );
      })}
    </ul>
  );
}
