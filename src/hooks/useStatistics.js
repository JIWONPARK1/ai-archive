import { useMemo } from "react";

export default function useStatistics(imageList) {
  const statistics = useMemo(() => {
    if (!imageList || imageList.length === 0) {
      return {
        year_frequency: [],
        color_frequency: [],
        form_frequency: [],
        emphasis_frequency: [],
        balance_frequency: [],
        contrast_frequency: [],
        white_space_frequency: [],
      };
    }

    // 빈도수 계산 함수
    const calculateFrequency = (items, key) => {
      const frequencyMap = {};
      items.forEach((item) => {
        const value = item[key];
        if (value) {
          frequencyMap[value] = (frequencyMap[value] || 0) + 1;
        }
      });
      return Object.entries(frequencyMap).map(([value, frequency]) => ({
        [key.toLowerCase()]: value,
        frequency,
      }));
    };

    // 각 카테고리별 빈도수 계산
    const yearFrequency = calculateFrequency(imageList, "year").map((item) => ({
      year: item.year,
      frequency: item.frequency,
    }));

    const colorFrequency = calculateFrequency(imageList, "Color").map(
      (item) => ({
        color: item.color,
        frequency: item.frequency,
      })
    );

    const formFrequency = calculateFrequency(imageList, "Form").map((item) => ({
      form: item.form,
      frequency: item.frequency,
    }));

    const emphasisFrequency = calculateFrequency(imageList, "Emphasis").map(
      (item) => ({
        emphasis: item.emphasis,
        frequency: item.frequency,
      })
    );

    const balanceFrequency = calculateFrequency(imageList, "Balance").map(
      (item) => ({
        balance: item.balance,
        frequency: item.frequency,
      })
    );

    const contrastFrequency = calculateFrequency(imageList, "Contrast").map(
      (item) => ({
        contrast: item.contrast,
        frequency: item.frequency,
      })
    );

    const whiteSpaceFrequency = calculateFrequency(
      imageList,
      "White space"
    ).map((item) => ({
      white_space: item.white_space,
      frequency: item.frequency,
    }));

    return {
      year_frequency: yearFrequency,
      color_frequency: colorFrequency,
      form_frequency: formFrequency,
      emphasis_frequency: emphasisFrequency,
      balance_frequency: balanceFrequency,
      contrast_frequency: contrastFrequency,
      white_space_frequency: whiteSpaceFrequency,
    };
  }, [imageList]);

  return {
    statistics,
  };
}
