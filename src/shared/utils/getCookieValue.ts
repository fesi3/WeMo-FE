export const getCookieValue = (key: string): string | null => {
  return (
    document.cookie
      .split('; ')
      .find((cookie) => cookie.startsWith(`${key}=`))
      ?.split('=')[1] || null
  );
};
