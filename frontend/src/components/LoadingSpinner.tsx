interface LoadingSpinnerProps {
  message?: string;
}

/**
 * Reusable loading spinner displayed while fetching data.
 */
const LoadingSpinner = ({ message = 'Loading...' }: LoadingSpinnerProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-64 gap-4">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      <p className="text-gray-400 text-sm">{message}</p>
    </div>
  );
};

export default LoadingSpinner;
