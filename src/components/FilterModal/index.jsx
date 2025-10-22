import styles from "./FilterModal.module.scss";
import {
  YEAR_OPTIONS,
  COLOR_OPTIONS,
  FORM_OPTIONS,
  EMPHASIS_OPTIONS,
  BALANCE_OPTIONS,
  CONTRAST_OPTIONS,
  WHITE_SPACE_OPTIONS,
} from "../../constants/config";
import ColorCircle from "../ColorCircle/ColorCircle";
import { useEffect, useState } from "react";
import FilterDetail from "../FilterDetail";
import clsx from "clsx";

export default function FilterModal({ open, onClose, shapes, moods, onApply }) {
  const [isOpenFilterDetailModal, setIsOpenFilterDetailModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    if (open) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [open]);

  const handleSeeAll = (option) => {
    setIsOpenFilterDetailModal(true);
    setSelectedOption(option);
  };

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      onClose();
    }, 500);
  };

  return (
    <>
      <div
        className={clsx(
          styles.container,
          isOpen && styles.open,
          !isOpen && styles.close
        )}
      >
        <button className={styles.closeButton} onClick={handleClose}>
          <img
            src="/images/icon_close.png"
            alt="close"
            className={styles.closeIcon}
          />
        </button>
        <div className={styles.listContainer}>
          <Title
            label="Year"
            seeAll={false}
            onSeeAll={() => handleSeeAll("year")}
          />
          <List list={YEAR_OPTIONS} onSelect={() => {}} selected={null} />
        </div>

        <div className={styles.divider} />
        <div className={styles.listContainer}>
          <Title
            label="SHAPE"
            seeAll={true}
            onSeeAll={() => handleSeeAll("shape")}
          />
          <List
            list={shapes}
            onSelect={(item) => onApply("shape", item)}
            selected={null}
          />
        </div>
        <div className={styles.listContainer}>
          <Title
            label="MOOD"
            seeAll={true}
            onSeeAll={() => handleSeeAll("mood")}
          />
          <List
            list={moods}
            onSelect={(item) => onApply("mood", item)}
            selected={null}
          />
        </div>
        <div className={styles.listContainer}>
          <Title
            label="COLOR"
            seeAll={true}
            onSeeAll={() => handleSeeAll("color")}
          />
          <ColorList
            list={COLOR_OPTIONS}
            onSelect={(item) => onApply("color", item)}
            selected={null}
            r
          />
        </div>
        <div className={styles.listContainer}>
          <Title
            label="FORM"
            seeAll={true}
            onSeeAll={() => handleSeeAll("form")}
          />
          <List
            list={FORM_OPTIONS}
            onSelect={(item) => onApply("form", item)}
            selected={null}
            range={{ min: 0, max: 9 }}
          />
        </div>
        <div className={styles.listContainer}>
          <Title
            label="EMPHASIS"
            seeAll={true}
            onSeeAll={() => handleSeeAll("emphasis")}
          />
          <List
            list={EMPHASIS_OPTIONS}
            onSelect={(item) => onApply("emphasis", item)}
            selected={null}
            range={{ min: 0, max: 9 }}
          />
        </div>
        <div className={styles.listContainer}>
          <Title
            label="BALANCE"
            seeAll={true}
            onSeeAll={() => handleSeeAll("balance")}
          />
          <List
            list={BALANCE_OPTIONS}
            onSelect={(item) => onApply("balance", item)}
            selected={null}
            range={{ min: 0, max: 9 }}
          />
        </div>
        <div className={styles.listContainer}>
          <Title
            label="CONTRAST"
            seeAll={true}
            onSeeAll={() => handleSeeAll("contrast")}
          />
          <List
            list={CONTRAST_OPTIONS}
            onSelect={(item) => onApply("contrast", item)}
            selected={null}
            range={{ min: 0, max: 9 }}
          />
        </div>
        <div className={styles.listContainer}>
          <Title
            label="WHITE SPACE"
            seeAll={true}
            onSeeAll={() => handleSeeAll("whitespace")}
          />
          <List
            list={WHITE_SPACE_OPTIONS}
            onSelect={(item) => onApply("whitespace", item)}
            selected={null}
          />
        </div>
      </div>
      {isOpenFilterDetailModal && (
        <FilterDetail
          option={selectedOption}
          onClose={() => setIsOpenFilterDetailModal(false)}
        />
      )}
    </>
  );
}
const Title = ({ label, seeAll = true, onSeeAll }) => {
  return (
    <div className={styles.title}>
      {label}
      {seeAll && (
        <button className={styles.seeAllButton} onClick={() => onSeeAll(label)}>
          See All
        </button>
      )}
    </div>
  );
};
const ColorList = ({ list }) => {
  return (
    <ul className={styles.list}>
      {list.map((item) => (
        <li key={item.id}>
          <ColorCircle color={item.value} />
        </li>
      ))}
    </ul>
  );
};
const List = ({ list, onSelect, selected }) => {
  return (
    <ul className={styles.list}>
      {list.map((item) => (
        <li key={item.id} className={styles.option}>
          <button
            onClick={() => onSelect(item.value)}
            className={selected === item.id ? styles.selected : ""}
          >
            {item.label || item.name}
          </button>
        </li>
      ))}
    </ul>
  );
};
