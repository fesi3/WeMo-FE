import Link from 'next/link';
import { useRouter } from 'next/router';
import { menuItems } from '@/constants/gnbMenu';

function GNBFooter() {
  const router = useRouter();
  return (
    <footer className="fixed bottom-0 z-10 flex h-[50px] w-full items-center bg-white shadow-md md:invisible">
      <ul className="flex w-full justify-around px-5">
        {menuItems.map((item) => (
          <Link href={item.path}>
            <li
              key={item.path}
              className={`${
                router.pathname === item.path
                  ? 'font-bold text-black'
                  : 'text-gray-400'
              } cursor-pointer space-x-6 transition-colors hover:text-black`}
            >
              {item.name}
            </li>
          </Link>
        ))}
      </ul>
    </footer>
  );
}

export default GNBFooter;
