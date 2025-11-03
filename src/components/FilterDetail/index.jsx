import styles from "./FilterDetail.module.scss";
import filterDummy from "../../datas/filterDummy.json";
import statisticsData from "../../datas/statistics.json";
import archivesData from "../../datas/archives.json";
import { useEffect, useState } from "react";
import ColorCircle from "../ColorCircle";
import clsx from "clsx";
import { ICONS } from "../../constants/config";

const years = [2025, 2024, 2023, 2022, 2021];

export default function FilterDetail({ option, onClose }) {
  const [isOpen, setIsOpen] = useState(false);
  const allArchives = { all: { id: 0, name: "ALL" }, ...archivesData };
  const [selectedArchive, setSelectedArchive] = useState("ALL");

  useEffect(() => {
    if (option) {
      setIsOpen(true);
    }
  }, [option]);

  const handleSelectArchive = (id) => {
    setSelectedArchive(id);
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
        {Object.keys(allArchives).map((item, index) => (
          <li key={index}>
            <button
              onClick={() => handleSelectArchive(item)}
              className={selectedArchive === item ? styles.selected : ""}
            >
              {allArchives[item]?.name}
            </button>
          </li>
        ))}
      </ul>
      <div className={styles.optionContainer}>
        <p className={styles.optionTitle}>{option.toUpperCase()}</p>
        {option === "Shape" || option === "Mood" ? (
          <List
            data={statisticsData.keyword_ranks[selectedArchive]?.[option] || []}
          />
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
      {Object.keys(data)?.map((year, index) => (
        <div key={index}>
          <p className={styles.year}>{year}</p>
          <ul className={styles.dataList}>
            {data?.[year]?.map((item, listIndex) => (
              <li key={`${listIndex}-${item.name}`}>
                <span className={styles.name}>{item?.keyword}</span>
                <span className={styles.value}>{item?.frequency}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
