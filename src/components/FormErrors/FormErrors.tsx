import { ResponseErrors } from '@/types';

type ErrorProps = {
  error: ResponseErrors | string | undefined;
};

export function FormErrors(props: ErrorProps) {
  const { error } = props;
  if (!error) return null;

  if (typeof error === 'string') {
    return <div className="error-messages">{error}</div>;
  }

  return (
    <div className="error-messages">
      {Object.keys(error.errors).map((key) => {
        return <div key={key}>{`${key} ${error.errors[key][0]}`}</div>;
      })}
    </div>
  );
}
