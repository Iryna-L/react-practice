import { UseFormRegisterReturn } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

type TextAreaProps = {
  name: string;
  placeholder: string;
  registerProps: UseFormRegisterReturn;
  errors: Object;
  rows?: number;
};

export function TextArea(props: TextAreaProps) {
  const { name, placeholder, registerProps, errors, rows } = props;
  return (
    <>
      <textarea
        name={name}
        onBlur={registerProps.onBlur}
        onChange={registerProps.onChange}
        ref={registerProps.ref}
        rows={rows || 8}
        className="form-control form-control-lg"
        placeholder={placeholder}
      />
      <div className="error-messages">
        <ErrorMessage
          errors={errors}
          name={name}
        />
      </div>
    </>
  );
}
