import Link from 'next/link';
import router from 'next/navigation';

function GNBItem({ text, path }: { text: string; path: string }) {
  return (
    <Link href={path}>
      <li
        className={`${
          router.pathname === 'user' ? 'font-bold text-black' : 'text-gray-400'
        } cursor-pointer transition-colors hover:text-black`}
      >
        {text}
      </li>
    </Link>
  );
}

export default GNBItem;
