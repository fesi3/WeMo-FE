import React from 'react';
import { Listbox } from '@headlessui/react';

interface Option {
  id: number;
  name: string;
}

interface DropdownProps {
  options: Option[];
  selectedOption: Option | null;
  onSelect: (option: Option) => void;
  placeholder?: string;
  className?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  selectedOption,
  onSelect,
  placeholder = '옵션을 선택해주세요',
  className = '',
}) => {
  return (
    <div className={`relative w-full max-w-[8rem] ${className}`}>
      <Listbox value={selectedOption} onChange={onSelect}>
        <Listbox.Button className="w-full py-1.5 px-2 text-center text-sm text-black bg-white border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-orange-500">
          {selectedOption ? selectedOption.name : placeholder}
        </Listbox.Button>

        <Listbox.Options className="absolute mt-1 w-full max-w-full text-sm text-black bg-white border border-gray-300 rounded-lg shadow-md z-10 overflow-hidden">
          {options.map((option) => (
            <Listbox.Option
              key={option.id}
              value={option}
              className="cursor-pointer w-full py-2 px-4 text-center hover:bg-orange-100 text-black"
            >
              {option.name}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </div>
  );
};

export default Dropdown;
