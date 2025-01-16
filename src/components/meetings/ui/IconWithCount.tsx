interface IconWithCountProps {
  count: number;
  suffix?: string;
}
export default function IconWithCount({
  count,
  suffix = '',
}: IconWithCountProps) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span>아이콘</span>
      <span>{`${count}${suffix}`}</span>
    </div>
  );
}
