export const coordinateToAddress = (
  lat: number,
  lng: number,
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const geocoder = new window.kakao.maps.services.Geocoder();
    geocoder.coord2Address(lng, lat, (result, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        resolve(result[0].address.address_name);
      } else {
        reject(new Error('주소를 표시할 수 없습니다.'));
      }
    });
  });
};
