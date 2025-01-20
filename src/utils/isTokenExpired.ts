// 토큰 만료시 true를 반환
export const isTokenExpired = (token: string) => {
  if (token.startsWith('Bearer ')) {
    token = token.slice(7);
  }
  const [, payload] = token.split('.');

  const base64Decode = (splittedString: string) => {
    return decodeURIComponent(
      atob(splittedString.replace(/-/g, '+').replace(/_/g, '/'))
        .split('')
        .map((c) => `%${c.charCodeAt(0).toString(16).padStart(2, '0')}`)
        .join(''),
    );
  };

  const decodedPayload = JSON.parse(base64Decode(payload));
  const expirationTime = decodedPayload.exp * 1000;
  const currentTime = Date.now();

  return currentTime >= expirationTime;
};
