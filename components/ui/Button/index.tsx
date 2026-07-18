import { Loader2 } from "lucide-react";

type ButtonProps = {
  buttonText: string;
  loadingText: string;
    disabled: boolean;
    loading: boolean;
};

export const Button = ({ buttonText, loadingText, disabled, loading }: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      type="submit"
      className="flex justify-center items-center w-full bg-green-600 text-white py-2 h-12 rounded-xl hover:bg-green-700 transition cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed"
    >
      {loading && <Loader2 className="animate-spin mr-2" size={18} />}
      {loading ? loadingText : buttonText}
    </button>
  );
};
