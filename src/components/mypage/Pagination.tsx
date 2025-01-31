export interface PaginationProps {
  page: number;
  totalPage: number;
  onPageChange: (newPage: number) => void;
}

const Pagination = ({ page, totalPage, onPageChange }: PaginationProps) => {
  // totalPage 만큼의 배열 만들기
  const pageCount = Array.from({ length: totalPage }, (v, i) => i + 1);
  // console.log('페이지 번호', pageCount);

  return (
    <section className="mb-20 mt-6 flex items-center justify-center gap-2">
      {/* 이전 버튼 */}
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="rounded bg-gray-200 px-4 py-2 disabled:opacity-50"
      >
        이전
      </button>

      {/* 페이지 번호에 해당하는 버튼 생성 */}
      {pageCount.map((pageNum) => (
        <button
          key={pageNum}
          onClick={() => onPageChange(pageNum)}
          className={`rounded px-4 py-2 ${
            pageNum === page
              ? 'bg-primary-10 font-bold text-white'
              : 'bg-gray-200'
          }`}
        >
          {pageNum}
        </button>
      ))}

      {/* 다음 버튼 */}
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={totalPage >= totalPage}
        className="rounded bg-gray-200 px-4 py-2 disabled:opacity-50"
      >
        다음
      </button>
    </section>
  );
};

export default Pagination;
