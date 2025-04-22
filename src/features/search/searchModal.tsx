import { PropsWithChildren, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';
import { useRouter } from 'next/router';
import ModalPortal from '@/shared/components/modals/ModalPortal';
import ModalBackDrop from '@/shared/components/modals/ModalBackDrop';
import CloseIcon from '@/shared/assets/icons/close.svg';
import { ModalProps } from '@/shared/components/modals/Modal';

//useToggle hook에서 isOpen과 handleClose를 연결해 주세요
function SearchModal({
  children,
  handleClose,
  isOpen,
  className,
}: PropsWithChildren<ModalProps>) {
  const router = useRouter();
  const handleSearchClose = () => {
    const { pathname, query, replace } = router;
    // `q`를 제외한 새로운 객체 생성
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { q, ...updateQuery } = query;

    replace({ pathname, query: updateQuery }, undefined, { shallow: true });
    handleClose();
  };
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleSearchClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    isOpen && (
      <ModalPortal>
        <ModalBackDrop
          isSearch
          isOpen={isOpen}
          handleClose={handleSearchClose}
          className="z-[13]"
        >
          <CloseIcon
            onClick={handleSearchClose}
            className="absolute right-2 top-2 cursor-pointer"
          />
          <div className={twMerge('z-[14]', className)}>{children}</div>
        </ModalBackDrop>
      </ModalPortal>
    )
  );
}

export default SearchModal;
