interface StatusBadgeProps {
  status: string;
  size?: 'sm' | 'md';
}

const statusStyles: Record<string, string> = {
  HEALTHY:  'bg-green-500/20 text-green-400',
  LOW:      'bg-yellow-500/20 text-yellow-400',
  CRITICAL: 'bg-red-500/20 text-red-400',
  INBOUND:  'bg-green-500/20 text-green-400',
  OUTBOUND: 'bg-red-500/20 text-red-400',
  TRANSFER: 'bg-blue-500/20 text-blue-400',
  ADMIN:    'bg-purple-500/20 text-purple-400',
  MANAGER:  'bg-blue-500/20 text-blue-400',
  EMPLOYEE: 'bg-gray-500/20 text-gray-400',
};

/**
 * Reusable status badge component with color-coded styling.
 */
const StatusBadge = ({ status, size = 'sm' }: StatusBadgeProps) => {
  const sizeClass = size === 'md' ? 'px-3 py-1.5 text-sm' : 'px-2.5 py-1 text-xs';
  return (
    <span className={`${sizeClass} rounded-full font-medium ${statusStyles[status] || 'bg-gray-500/20 text-gray-400'}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
