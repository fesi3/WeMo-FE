import Link from 'next/link';
import { useRouter } from 'next/router';

function GNBItem({ text, path }: { text: string; path: string }) {
  const router = useRouter();
  return (
    <Link href={path}>
      <li
        className={`${
          router.pathname === path ? 'font-bold text-black' : 'text-gray-400'
        } cursor-pointer transition-colors hover:text-black`}
      >
        {text}
      </li>
    </Link>
  );
}

export default GNBItem;
