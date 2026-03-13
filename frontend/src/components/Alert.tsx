interface AlertProps {
  type: 'error' | 'success' | 'info';
  message: string;
  onDismiss?: () => void;
}

const alertStyles = {
  error:   'bg-red-500/10 border-red-500/30 text-red-400',
  success: 'bg-green-500/10 border-green-500/30 text-green-400',
  info:    'bg-blue-500/10 border-blue-500/30 text-blue-400',
};

/**
 * Reusable alert banner for error, success, and info messages.
 */
const Alert = ({ type, message, onDismiss }: AlertProps) => {
  if (!message) return null;

  return (
    <div className={`p-3 border rounded-lg text-sm flex items-center justify-between ${alertStyles[type]}`}>
      <span>{message}</span>
      {onDismiss && (
        <button onClick={onDismiss} className="ml-3 opacity-60 hover:opacity-100 transition-opacity">✕</button>
      )}
    </div>
  );
};

export default Alert;
