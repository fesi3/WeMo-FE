import { FieldValues, Path, UseFormRegister } from 'react-hook-form';
import { twJoin } from 'tailwind-merge';

const CATEGORY_LIST = [
  { value: '3', name: '오피스 스트레칭', parentsName: '달램핏' },
  { value: '4', name: '마인드 풀니스', parentsName: '달램핏' },
  { value: '2', name: '워케이션', parentsName: '워케이션' },
];

interface RadioInputProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  name: Path<T>;
  categoryValue: string;
}
export default function RadioInput<T extends FieldValues>({
  register,
  name,
  categoryValue,
}: RadioInputProps<T>) {
  return (
    <div className="flex gap-1">
      {CATEGORY_LIST.map((category) => (
        <label
          key={category.value}
          className={twJoin(
            'relative flex aspect-[5/3] w-[95px] items-center rounded-md border px-2',
            categoryValue === category.value
              ? 'bg-primary-30 text-white'
              : 'border-black-sub text-black-sub',
          )}
        >
          <div className="flex h-full flex-col justify-center">
            <span className="w-full text-sm font-bold">
              {category.parentsName}
            </span>
            <span className="w-full text-[11px] font-semibold">
              {category.name}
            </span>
            <span
              className={twJoin(
                'flex-center absolute right-1 top-1 h-4 w-4 rounded-full',
                categoryValue === category.value
                  ? 'bg-white'
                  : 'border border-black-sub',
              )}
            >
              {categoryValue === category.value && (
                <span className="h-2 w-2 rounded-full bg-primary-30"></span>
              )}
            </span>
          </div>

          <input
            className="hidden"
            value={category.value}
            type="radio"
            {...register(name)}
          />
        </label>
      ))}
    </div>
  );
}
