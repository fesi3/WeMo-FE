import { useCallback, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSearchParams } from 'next/navigation';
import { debounce } from 'lodash';

import GNBItem from '@/widgets/gnb/ui/GNB-item';
import Search from '@/features/search';
import SearchModal from '@/features/search/searchModal';
import SearchContents from '@/features/search/searchContents';
import logo from '@/shared/assets/images/title.png';
import useToggle from '@/shared/hooks/useToggle';
import { API_PATHS } from '@/shared/constants/apiPath';
import axiosInstance from '@/shared/utils/axios';
import { PlanListData, PlanListResponse } from '@/shared/types/plans';
import useHeaderHeight from '@/shared/hooks/useHeaderHeight';
import { twMerge } from 'tailwind-merge';
import { hideGnbPathNames } from '@/shared/constants/gnb';

// GNB 레이아웃 컴포넌트에서 렌더링 되는 header 컴포넌트입니다.
// 페이지마다 출력이 달라 path를 조회해 조건부 렌더링 합니다.
// 로그인 여부를 전역객체에서 조회해 조건부 렌더링 합니다.
// 상위 컴포넌트로 부터 유저 정보 응답을 내려받아 라우팅 합니다.
function GNBHeader() {
  const { toggleValue, handleOpen, handleClose } = useToggle();
  const searchParams = useSearchParams();
  const searchKeyword = searchParams?.get('q');
  const encodedSearchKeyWord: string = searchKeyword
    ? encodeURIComponent(searchKeyword)
    : '';
  const router = useRouter();
  const { pathname, query, replace } = router;
  const queryClient = useQueryClient();
  const {
    PLAN: { GET_ALL },
  } = API_PATHS;

  const handleSearchBarClick = () => {
    handleOpen();
  };

  const handleSearchInputChange = useCallback(
    debounce((e: React.ChangeEvent<HTMLInputElement>) => {
      // 기존 쿼리를 유지하면서 검색어 추가
      replace(
        {
          pathname,
          query: { ...query, q: e.target.value },
        },
        undefined,
        { shallow: true },
      );
    }, 200),
    [pathname],
  );

  useQuery<PlanListResponse, Error, PlanListData>({
    queryKey: ['searchKeyword'],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `${GET_ALL(`query=${encodedSearchKeyWord}`)}`,
      );
      return response.data;
    },
    enabled: !!encodedSearchKeyWord, // 검색어가 있을 때만 요청
    gcTime: 0,
    staleTime: 0,
    select: (data) => data?.data,
  });

  useEffect(() => {
    if (!searchKeyword) {
      queryClient.setQueryData(['searchKeyword'], {
        planCount: 0,
        planList: [],
        nextCursor: null,
      });
    } else {
      queryClient.invalidateQueries({ queryKey: ['searchKeyword'] });
    }
  }, [searchKeyword]);

  //useHeaderHeight 훅을 사용하여 header 컴포넌트의 높이를 측정합니다다
  const { headerRef } = useHeaderHeight();

  const shouldHideGNB = hideGnbPathNames.includes(pathname);

  return (
    <header
      ref={headerRef}
      className={twMerge(
        'flex max-h-full w-full flex-col',
        shouldHideGNB ? 'invisible' : '',
      )}
    >
      <div className="fixed top-0 z-10 flex w-full items-center bg-white py-3 shadow-sm">
        <div className="mx-9 flex w-full items-center">
          {/* 로고 */}
          <Link href={'/plans'} className="my-auto">
            <Image width={70} height={0} src={logo} alt="wemo-gnb-logo" />
          </Link>
          {/* 검색바 */}
          <Search handleSearchBarClick={handleSearchBarClick} />
          {/* 알림 */}
          <div onClick={() => alert('구현 예정입니다.')}>
            <GNBItem name={'알림'} isHeader isRouteDisabled />
          </div>
        </div>
      </div>

      {/* 헤더 공간 확보 */}
      {/* <div className="invisible h-14" /> */}

      {/* 검색 모달 출력 */}
      <SearchModal
        isOpen={toggleValue}
        handleClose={handleClose}
        className="flex h-screen flex-col gap-[38px] px-[30px] pb-[119px] pt-28 md:px-[65px] md:pt-[188px] lg:max-w-none lg:items-center"
      >
        <SearchContents
          searchKeyword={searchKeyword}
          handleSearchInputChange={handleSearchInputChange}
          handleClose={handleClose}
        />
      </SearchModal>
    </header>
  );
}

export default GNBHeader;
