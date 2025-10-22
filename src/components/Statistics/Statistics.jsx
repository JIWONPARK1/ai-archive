import styles from "./Statistics.module.scss";
import YearItem from "./YearItem/YearItem";
import ColorItem from "./ColorItem/ColorItem";
import EmphasisItem from "./EmphasisItem/EmphasisItem";
import RowItem from "./RowItem/RowItem";

export default function Statistics({ statistics }) {
  return (
    <ul className={styles.container}>
      <li className={styles.item}>
        <p className={styles.title}>Year</p>
        <YearItem list={statistics?.year} />
      </li>
      <li className={styles.item}>
        <p className={styles.title}>COLOR</p>
        <ColorItem list={statistics?.color} />
      </li>
      <li className={styles.item}>
        <p className={styles.title}>FORM</p>
        <RowItem category="form" list={statistics?.form} />
      </li>
      <li className={styles.item}>
        <p className={styles.title}>EMPHASIS</p>
        <EmphasisItem list={statistics?.emphasis} />
      </li>
      <li className={styles.item}>
        <p className={styles.title}>BALANCE</p>
        <RowItem category="balance" list={statistics?.balance} />
      </li>
      <li className={styles.item}>
        <p className={styles.title}>CONTRAST</p>
        <RowItem category="contrast" list={statistics?.contrast} />
      </li>
      <li className={styles.item}>
        <p className={styles.title}>WHITE SPACE</p>
        <RowItem category="whitespace" list={statistics?.whiteSpace} />
      </li>
    </ul>
  );
}
