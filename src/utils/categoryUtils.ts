export const getCategoryId = (
  selectedCategory: string,
  selectedSubCategory: string | null,
): number => {
  if (selectedCategory === '달램핏') {
    if (selectedSubCategory === '오피스 스트레칭') return 3;
    if (selectedSubCategory === '마인드풀니스') return 4;
    return 1;
  }
  if (selectedCategory === '워케이션') {
    return 2;
  }
  return 0;
};
