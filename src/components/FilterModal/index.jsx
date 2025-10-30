import styles from "./FilterModal.module.scss";
import ColorCircle from "../ColorCircle";
import { useEffect, useMemo, useState } from "react";
import FilterDetail from "../FilterDetail";
import clsx from "clsx";
import { useFilterStore } from "../../stores/filterState";

export default function FilterModal({ open, onClose, statistics }) {
  const [isOpenFilterDetailModal, setIsOpenFilterDetailModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDetailOption, setSelectedDetailOption] = useState("");
  const { filterOptions, setFilterOptions } = useFilterStore();

  const yearList = useMemo(() => {
    if (!statistics) return [];
    return [
      {
        keyword: "ALL",
        value: "ALL",
      },
      ...(statistics.year_frequency?.map((item) => ({
        keyword: item.year,
        value: item.year,
      })) || []),
    ];
  }, [statistics]);

  useEffect(() => {
    if (open) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [open]);

  const handleSeeAll = (option) => {
    setIsOpenFilterDetailModal(true);
    setSelectedDetailOption(option);
  };

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      onClose();
    }, 500);
  };

  const handleSelectFilter = (type, value) => {
    setFilterOptions({ year: filterOptions.year, type, value });
    onClose();
  };

  const handleSelectYear = (_, value) => {
    if (value === "ALL") {
      setFilterOptions({ year: "ALL", type: null, value: null });
      onClose();
    } else {
      setFilterOptions({ year: value, type: null, value: null });
    }
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
        <div className={styles.item}>
          <Title
            label="Year"
            seeAll={false}
            onSeeAll={() => handleSeeAll("year")}
          />
          <div className={styles.gap}></div>
          <List
            list={yearList}
            onSelect={handleSelectYear}
            type="year"
            selected={filterOptions.year}
          />
        </div>

        <div className={styles.divider} />
        <div className={styles.item}>
          <Title
            label="SHAPE"
            seeAll={true}
            onSeeAll={() => handleSeeAll("shape")}
          />
          <List
            list={statistics?.top_shape_keyword || []}
            type="shape"
            onSelect={handleSelectFilter}
            selected={null}
          />
        </div>
        <div className={styles.item}>
          <Title
            label="MOOD"
            seeAll={true}
            onSeeAll={() => handleSeeAll("mood")}
          />
          <List
            list={statistics?.top_mood_keyword || []}
            type="mood"
            onSelect={handleSelectFilter}
            selected={null}
          />
        </div>
        <div className={styles.item}>
          <Title
            label="COLOR"
            seeAll={true}
            onSeeAll={() => handleSeeAll("color")}
          />
          <ColorList
            list={
              statistics?.color_frequency?.map((item) => ({
                keyword: item.color,
                value: item.color,
              })) || []
            }
            onSelect={handleSelectFilter}
            selected={null}
          />
        </div>
        <div className={styles.item}>
          <Title
            label="FORM"
            seeAll={true}
            onSeeAll={() => handleSeeAll("form")}
          />
          <List
            list={
              statistics?.form_frequency?.map((item) => ({
                keyword: item.form,
                value: item.form,
              })) || []
            }
            type="form"
            onSelect={handleSelectFilter}
            selected={null}
            range={{ min: 0, max: 9 }}
          />
        </div>
        <div className={styles.item}>
          <Title
            label="EMPHASIS"
            seeAll={true}
            onSeeAll={() => handleSeeAll("emphasis")}
          />
          <List
            list={
              statistics?.emphasis_frequency?.map((item) => ({
                keyword: item.emphasis,
                value: item.emphasis,
              })) || []
            }
            type="emphasis"
            onSelect={handleSelectFilter}
            selected={null}
            range={{ min: 0, max: 9 }}
          />
        </div>
        <div className={styles.item}>
          <Title
            label="BALANCE"
            seeAll={true}
            onSeeAll={() => handleSeeAll("balance")}
          />
          <List
            list={
              statistics?.balance_frequency?.map((item) => ({
                keyword: item.balance,
                value: item.balance,
              })) || []
            }
            type="balance"
            onSelect={handleSelectFilter}
            selected={null}
            range={{ min: 0, max: 9 }}
          />
        </div>
        <div className={styles.item}>
          <Title
            label="CONTRAST"
            seeAll={true}
            onSeeAll={() => handleSeeAll("contrast")}
          />
          <List
            list={
              statistics?.contrast_frequency?.map((item) => ({
                keyword: item.contrast,
                value: item.contrast,
              })) || []
            }
            type="contrast"
            onSelect={handleSelectFilter}
            selected={null}
            range={{ min: 0, max: 9 }}
          />
        </div>
        <div className={styles.item}>
          <Title
            label="WHITE SPACE"
            seeAll={true}
            onSeeAll={() => handleSeeAll("whitespace")}
          />
          <List
            list={
              statistics?.white_space_frequency?.map((item) => ({
                keyword: item.white_space,
                value: item.white_space,
              })) || []
            }
            type="whitespace"
            onSelect={handleSelectFilter}
            selected={null}
          />
        </div>
      </div>
      {isOpenFilterDetailModal && (
        <FilterDetail
          option={selectedDetailOption}
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
const ColorList = ({ list, onSelect }) => {
  return (
    <ul className={styles.colorList}>
      {list.map((item) => (
        <li
          key={item.id}
          className={clsx(styles.colorOption)}
          onClick={() => onSelect("color", item.value)}
        >
          <ColorCircle color={item.value} />
        </li>
      ))}
    </ul>
  );
};
const List = ({ list, type, onSelect, selected }) => {
  return (
    <ul className={styles.list}>
      {list.map((item) => (
        <li
          key={item.value || item.keyword}
          className={clsx(
            styles.option,
            selected === (item.value || item.keyword) ? styles.selected : ""
          )}
        >
          <button onClick={() => onSelect(type, item.value || item.keyword)}>
            {item.keyword}
          </button>
        </li>
      ))}
    </ul>
  );
};
