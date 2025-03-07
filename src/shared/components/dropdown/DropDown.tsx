import React from 'react';
import { Listbox } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

interface DropdownProps<T> {
  options: T[];
  selectedOption: T | null;
  onSelect: (option: T) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  customTrigger?: React.ReactNode; // 트리거를 커스텀해서 쓸 수 있도록 전달하는 Prop
}

const Dropdown = <T extends { id: number; name: string }>({
  options,
  selectedOption,
  onSelect,
  placeholder = '옵션을 선택해주세요',
  className = '',
  disabled = false,
  customTrigger,
}: DropdownProps<T>) => {
  return (
    <div className={`relative inline-block ${className}`}>
      <Listbox value={selectedOption} onChange={onSelect} disabled={disabled}>
        {customTrigger ? (
          <Listbox.Button as="div">{customTrigger}</Listbox.Button>
        ) : (
          <Listbox.Button
            className={`inline-flex items-center justify-between rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-black shadow-md focus:ring-2 focus:ring-blue-500 ${disabled ? 'cursor-not-allowed opacity-50' : ''}`} // ✅ 비활성화 시 스타일 변경
            disabled={disabled}
          >
            <span className="truncate">
              {selectedOption ? selectedOption.name : placeholder}
            </span>
            <ChevronDownIcon
              className="ml-2 h-5 w-5 text-violet-200 hover:text-violet-100"
              aria-hidden="true"
            />
          </Listbox.Button>
        )}

        {!disabled && (
          <Listbox.Options className="absolute left-0 z-10 mt-2 min-w-[10rem] max-w-[12rem] rounded-lg border border-gray-300 bg-white text-sm text-black shadow-lg">
            {options.map((option) => (
              <Listbox.Option
                key={option.id}
                value={option}
                className="cursor-pointer px-4 py-2 text-left text-gray-900 hover:bg-blue-100 hover:text-blue-900"
              >
                {option.name}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        )}
      </Listbox>
    </div>
  );
};

export default Dropdown;
