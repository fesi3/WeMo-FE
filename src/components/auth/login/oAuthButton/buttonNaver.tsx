import buttonNaver from '@/assets/images/btnG_naver.png';
import Image from 'next/image';

function ButtonNaver() {
  return (
    <button className="h-[42px] w-[42px] rounded-full bg-green-500">
      <Image src={buttonNaver} width={48} height={48} alt="naver-login" />
    </button>
  );
}

export default ButtonNaver;
