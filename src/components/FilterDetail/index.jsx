import styles from "./FilterDetail.module.scss";
import dummy from "../../datas/dummy.json";
import filterDummy from "../../datas/filterDummy.json";
import { useEffect, useState } from "react";
import ColorCircle from "../ColorCircle";
import clsx from "clsx";
import { ICONS } from "../../constants/config";

const years = [2025, 2024, 2023, 2022, 2021];

export default function FilterDetail({ option, onClose }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (option) {
      setIsOpen(true);
    }
  }, [option]);

  const [selectedArchive, setSelectedArchive] = useState(0);

  const handleSelectArchive = (id, index) => {
    setSelectedArchive(index);
  };

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      onClose();
    }, 500);
  };

  return (
    <div
      className={clsx(
        styles.container,
        isOpen && styles.open,
        !isOpen && styles.close
      )}
    >
      <button className={styles.backButton} onClick={handleClose}>
        <img src="/images/icon_back.png" alt="back" />
      </button>
      <ul className={styles.archiveList}>
        {dummy.archiveList.map((item, index) => (
          <li key={item.id}>
            <button
              onClick={() => handleSelectArchive(item.id)}
              className={selectedArchive === index ? styles.selected : ""}
            >
              {item.name}
            </button>
          </li>
        ))}
      </ul>
      <div className={styles.optionContainer}>
        <p className={styles.optionTitle}>{option.toUpperCase()}</p>
        {option === "shape" || option === "mood" ? (
          <List data={filterDummy[option]} />
        ) : (
          <TableList option={option} data={filterDummy[option]} />
        )}
      </div>
    </div>
  );
}

const TableList = ({ option, data }) => {
  return (
    <div>
      <ul className={styles.yearList}>
        {years.map((year, index) => (
          <div key={index}>
            <p className={styles.year}>{year}</p>
          </div>
        ))}
      </ul>
      <p className={styles.year}>{data?.year}</p>
      <ul className={styles.table}>
        {data?.map((item, listIndex) => {
          const { name, list } = item;
          return (
            <li key={listIndex} className={styles.tableItem}>
              {option === "color" ? (
                <span className={styles.colorCircle}>
                  <ColorCircle color={name} />
                </span>
              ) : (
                <div className={styles.imageContainer}>
                  <img
                    src={ICONS[option][name]}
                    alt={name}
                    className={styles.image}
                  />
                  <p>{name}</p>
                </div>
              )}
              <div className={styles.valueList}>
                {list?.map((item, index) => (
                  <div key={index} className={styles.valueContainer}>
                    <p className={styles.value}>{item.value} </p>
                    <p className={styles.percent}>{item.percent}%</p>
                  </div>
                ))}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const List = ({ data }) => {
  return (
    <div className={styles.dataContainer}>
      {years.map((year, index) => (
        <div key={index}>
          <p className={styles.year}>{year}</p>
          <ul className={styles.dataList}>
            {data?.[year]?.map((item, listIndex) => (
              <li key={`${listIndex}-${item.name}`}>
                <span className={styles.name}>{item.name}</span>
                <span className={styles.value}>{item.value}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
