import { Loader2 } from "lucide-react";

type ButtonProps = {
  buttonText: string;
  loadingText: string;
  loading: boolean;
  disabled?: boolean;
  additionalClass?: string;
};

export const Button = ({ buttonText, loadingText, loading,  disabled = false, additionalClass }: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      type="submit"
      className={`flex justify-center items-center w-full bg-green-600 text-white py-2 h-12 rounded-xl hover:bg-green-700 transition cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed ${additionalClass}`}
    >
      {loading && <Loader2 className="animate-spin mr-2" size={18} />}
      {loading ? loadingText : buttonText}
    </button>
  );
};
