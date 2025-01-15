import Link from 'next/link';
import arrow from '@/assets/icons/arrow.png';
import Image from 'next/image';

interface IndexNavProps {
  icon: string;
  title: string;
  link: string;
}

const IndexNav = ({ icon, title, link }: IndexNavProps) => {
  return (
    <li className="flex items-center gap-2 border-b border-gray-200 py-3">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-xl">
        {icon}
      </div>
      <h2 className="flex-1 text-sm font-medium">{title}</h2>
      <Link href={link}>
        {' '}
        <button>
          <Image src={arrow} alt="arrow" width={6} height={12} />
        </button>
      </Link>
    </li>
  );
};

export default IndexNav;
