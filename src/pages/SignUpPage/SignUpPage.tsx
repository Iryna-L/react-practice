import { Link } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Input, Button, FormErrors } from '@/components';
import { RouterConfig } from '@/constants/routes';
import { validationRegisterSchema } from '@/utils';
import { useRegisterMutation } from '@/hooks/auth';
import { showModal } from '@/store/modal.store';

type FormValues = {
  username: string;
  email: string;
  password: string;
};

export default function SignUpPage() {
  const { isLoading, error, mutate } = useRegisterMutation();

  const methods = useForm<FormValues>({
    resolver: yupResolver(validationRegisterSchema),
  });
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods;
  const onSubmit = (data: FormValues) => {
    showModal({
      title: 'Confirmation',
      text: 'Do you agree to the processing of this data?',
      onConfirm: () => mutate({ user: data }),
    });
  };
  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign up</h1>
            <p className="text-xs-center">
              <Link to={RouterConfig.LoginPage}>Have an account?</Link>
            </p>
            <FormErrors error={error?.response?.data} />

            <form onSubmit={handleSubmit((data: FormValues) => onSubmit(data))}>
              <fieldset className="form-group">
                <Input
                  name="username"
                  type="text"
                  placeholder="Username"
                  registerProps={register('username')}
                  errors={errors}
                />
              </fieldset>
              <fieldset className="form-group">
                <Input
                  name="email"
                  type="text"
                  placeholder="Email"
                  registerProps={register('email')}
                  errors={errors}
                />
              </fieldset>
              <fieldset className="form-group">
                <Input
                  name="password"
                  type="password"
                  placeholder="Password"
                  registerProps={register('password')}
                  errors={errors}
                />
              </fieldset>
              <Button
                className="btn btn-lg btn-primary pull-xs-right"
                text="Sign up"
                type="submit"
                loading={isLoading}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
