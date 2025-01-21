// import { Review, FilterState } from '../types/reviewType';

// export const filterReviews = (reviews: Review[], filters: FilterState) => {
//   let filtered = [...reviews];

//   if (filters.region) {
//     filtered = filtered.filter(
//       (review) => review.location === filters.region?.name,
//     );
//   }

//   if (filters.subRegion) {
//     filtered = filtered.filter(
//       (review) => review.location === filters.subRegion?.name,
//     );
//   }

//   if (filters.date) {
//     filtered = filtered.filter(
//       (review) =>
//         new Date(review.createdAt).toDateString() ===
//         filters.date?.toDateString(),
//     );
//   }

//   // if (filters.sort) {
//   //   if (filters.sort.name === '참여자 많은순') {
//   //     filtered.sort((a, b) => b.score - a.score);
//   //   } else if (filters.sort.name === '참여자 적은순') {
//   //     filtered.sort((a, b) => a.score - b.score);
//   //   }
//   // }

//   return filtered;
// };
