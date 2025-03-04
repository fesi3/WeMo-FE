export const scoreRender = (score: number) => {
  const stars = ['⭐', '⭐⭐', '⭐⭐⭐', '⭐⭐⭐⭐', '⭐⭐⭐⭐⭐'];
  return stars[score - 1] || null;
};
