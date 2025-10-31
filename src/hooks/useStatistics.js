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
    const calculateFrequency = (items, key, resultKey) => {
      const frequencyMap = {};
      items.forEach((item) => {
        const value = item[key];
        if (value) {
          frequencyMap[value] = (frequencyMap[value] || 0) + 1;
        }
      });
      const finalKey = resultKey || key.toLowerCase().replace(/\s+/g, "_");
      return Object.entries(frequencyMap).map(([value, frequency]) => ({
        [finalKey]: value,
        frequency,
      }));
    };

    // 각 카테고리별 빈도수 계산
    const yearFrequency = calculateFrequency(imageList, "year", "year");
    const colorFrequency = calculateFrequency(imageList, "Color", "color");
    const formFrequency = calculateFrequency(imageList, "Form", "form");
    const emphasisFrequency = calculateFrequency(
      imageList,
      "Emphasis",
      "emphasis"
    );
    const balanceFrequency = calculateFrequency(
      imageList,
      "Balance",
      "balance"
    );
    const contrastFrequency = calculateFrequency(
      imageList,
      "Contrast",
      "contrast"
    );
    const whiteSpaceFrequency = calculateFrequency(
      imageList,
      "White space",
      "white_space"
    );

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
