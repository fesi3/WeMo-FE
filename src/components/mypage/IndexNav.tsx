import Link from 'next/link';
import arrow from '@/assets/icons/arrow.png';
import Image from 'next/image';

const IndexNav = () => {
  const listItem = [
    {
      id: 1,
      icon: '📆',
      title: '나의 일정',
      link: `/user/plan`,
    },
    {
      id: 2,
      icon: '💑',
      title: '나의 모임',
      link: `/user/meeting`,
    },
    {
      id: 3,
      icon: '⭐',
      title: '나의 리뷰',
      link: `/user/review`,
    },
    {
      id: 4,
      icon: '♥️',
      title: '찜한 모임',
      link: `/saved-gathering`,
    },
  ];

  return (
    <>
      <Link href={`/user/calendar`}>
        <div className="-70 flex justify-between bg-yellow-200 px-4 py-2">
          <div className="hover:cursor flex-1 text-sm font-semibold hover:underline">
            {'캘린더에서 내 일정 확인하기'}
          </div>
          <button>
            <Image src={arrow} alt="arrow" width={6} height={12} />
          </button>
        </div>{' '}
      </Link>

      <ul className="mt-4 flex flex-col gap-3 md:gap-5">
        {listItem.map((item) => (
          <Link href={item.link} key={item.id}>
            <li className="flex items-center gap-2 border-b border-gray-200 py-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-xl">
                {item.icon}
              </div>
              <h2 className="flex-1 text-sm font-medium hover:underline">
                {item.title}
              </h2>
              <button>
                <Image src={arrow} alt="arrow" width={6} height={12} />
              </button>
            </li>
          </Link>
        ))}
      </ul>
    </>
  );
};

export default IndexNav;
