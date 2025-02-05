function decodeToken(token: string) {
  // 서버로 부터 내려받은 토큰을 . 을 기준으로 split
  const payload = token.replace('Bearer ', '').split('.')[1];
  // 인코딩된 데이터를 문자열로 반환 (base64 -> 문자열)
  const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
  // base64 문자열을 원래의 JSON 형식 객체로 변환
  const decodedJWT = JSON.parse(
    decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join(''),
    ),
  );
  return decodedJWT;
}

export default decodeToken;
