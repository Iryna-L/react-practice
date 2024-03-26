import { UseFormRegisterReturn } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

type InputProps = {
  type?: string;
  name: string;
  placeholder: string;
  registerProps: UseFormRegisterReturn;
  errors: Object;
};

export function Input(props: InputProps) {
  const { name, type, placeholder, registerProps, errors } = props;
  return (
    <>
      <input
        name={name}
        onBlur={registerProps.onBlur}
        onChange={registerProps.onChange}
        ref={registerProps.ref}
        className="form-control form-control-lg"
        type={type}
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
