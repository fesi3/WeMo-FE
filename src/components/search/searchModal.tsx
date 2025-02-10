import { PropsWithChildren, useEffect } from 'react';
import ModalPortal from '@/components/shared/modals/ModalPortal';
import ModalBackDrop from '@/components/shared/modals/ModalBackDrop';
import CloseIcon from '@/assets/icons/close.svg';
import { ModalProps } from '@/components/shared/modals/Modal';
import { twMerge } from 'tailwind-merge';
import { useRouter } from 'next/router';

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

    // 기존 쿼리에서 `q`만 제거
    const updatedQuery = { ...query };
    delete updatedQuery.q;

    replace({ pathname, query: updatedQuery }, undefined, { shallow: true });
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
