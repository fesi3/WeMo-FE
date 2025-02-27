export const addressToCoordinate = (
  Address: string,
): Promise<{ lat: number; lng: number }> => {
  return new Promise((resolve, reject) => {
    const geocoder = new window.kakao.maps.services.Geocoder();
    geocoder.addressSearch(Address, (result, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        const coords = result[0];
        resolve({
          lat: parseFloat(coords.y), // ✅ 위도와 경도 순서 수정
          lng: parseFloat(coords.x),
        });
      } else {
        reject(new Error('주소를 좌표로 변환할 수 없습니다.'));
      }
    });
  });
};
