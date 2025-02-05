export const getCategoryId = (
  selectedCategory: string,
  //selectedSubCategory: string | null,
): number => {
  if (selectedCategory === '달램핏') {
    return 1;
  }
  if (selectedCategory === '워케이션') {
    return 2;
  }
  return 0;
};
