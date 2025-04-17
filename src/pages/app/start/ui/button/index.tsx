import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';

interface SocialLoginButtonProps {
  authURL: string;
  buttonImage: StaticImageData;
}

function SocialLoginButton({ authURL, buttonImage }: SocialLoginButtonProps) {
  return (
    <Link href={authURL}>
      <button className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-gray-200">
        <Image src={buttonImage} width={30} height={30} alt="google-login" />
      </button>
    </Link>
  );
}

export default SocialLoginButton;
