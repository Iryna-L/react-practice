type ButtonProps = {
  type: 'button' | 'submit';
  loading?: boolean;
  text?: string;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  icon?: string;
};

export function Button(props: ButtonProps) {
  const { type = 'button', loading, text, className, onClick, disabled, icon } = props;

  return (
    <button
      type={type === 'button' ? 'button' : 'submit'}
      disabled={disabled || loading}
      className={className}
      onClick={onClick}
    >
      {icon ? <i className={icon} /> : null}
      {loading ? 'Loading...' : text}
    </button>
  );
}
