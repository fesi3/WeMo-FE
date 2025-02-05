import LightningMap from '@/components/lightning/lightningMap';
// import { GetServerSideProps } from 'next';

const LightningPage = () => {
  return (
    <div>
      <LightningMap />
    </div>
  );
};

// export const getSurverSideProps: GetServerSideProps = async () => {
//   // 서버에서 기본 위치 (서울 시청) 기준 번개팟 데이터를 미리 가져옴
//   const response = await fetch(
//     `https://your-api.com/lightning-meetups?lat=37.5665&lng=126.9780`,
//   );
//   const initialMeetups = await response.json();

//   return {
//     props: {
//       initialMeetups,
//     },
//   };
// };

export default LightningPage;
