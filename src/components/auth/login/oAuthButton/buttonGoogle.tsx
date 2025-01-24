import buttonGoogle from '@/assets/images/btnW_google.png';
import Image from 'next/image';

function ButtonGoogle() {
  return (
    <button className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-gray-200">
      <Image src={buttonGoogle} width={30} height={30} alt="google-login" />
    </button>
  );
}

export default ButtonGoogle;
