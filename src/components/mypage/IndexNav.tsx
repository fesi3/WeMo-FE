import Link from 'next/link';
import arrow from '@/assets/icons/arrow.png';
import Image from 'next/image';

interface IndexNavProps {
  nickname: string;
}

const IndexNav = ({ nickname }: IndexNavProps) => {
  const listItem = [
    {
      icon: '📆',
      title: '나의 일정',
      link: `/user/${nickname}/plan`,
    },
    {
      icon: '💑',
      title: '나의 모임',
      link: `/user/${nickname}/meeting`,
    },
    {
      icon: '⭐',
      title: '나의 리뷰',
      link: `/user/${nickname}/review`,
    },
  ];

  return (
    <ul className="mt-4 flex flex-col gap-4 sm:gap-10">
      {listItem.map((item) => (
        <Link href={item.link}>
          <li
            key={item.link}
            className="flex items-center gap-2 border-b border-gray-200 py-3"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-xl">
              {item.icon}
            </div>
            <h2 className="flex-1 text-sm font-medium">{item.title}</h2>
            <button>
              <Image src={arrow} alt="arrow" width={6} height={12} />
            </button>
          </li>
        </Link>
      ))}
    </ul>
  );
};

export default IndexNav;
