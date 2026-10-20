interface ProgressBarProps {
  value: number;
}

export const ProgressBar = ({ value }: ProgressBarProps) => {
  return (
    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
      <div
        className="h-full bg-green-600 transition-all duration-300 ease-out"
        style={{ width: `${value}%` }}
      >
      </div>
    </div>
  );
}
