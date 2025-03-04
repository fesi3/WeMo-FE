interface LightningCreateButtonProps {
  onClick: () => void;
  isModalOpen: boolean;
}

const LightningCreateButton = ({
  onClick,
  isModalOpen,
}: LightningCreateButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`fixed bottom-20 right-10 z-40 flex h-14 w-40 items-center justify-center rounded-lg bg-primary-10 text-white shadow-lg hover:bg-primary-40 active:bg-primary-10 ${isModalOpen ? 'hidden' : ''}`}
    >
      + 모임 만들기
    </button>
  );
};

export default LightningCreateButton;
