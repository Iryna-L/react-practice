import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input, Button, FormErrors } from '@/components';
import { RouterConfig } from '@/constants/routes';
import { validationLoginSchema } from '@/utils';
import { useLoginMutation } from '@/hooks/auth';
import { showModal } from '@/store/modal.store';

type FormValues = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const { isLoading, error, mutate } = useLoginMutation();

  const methods = useForm<FormValues>({
    resolver: yupResolver(validationLoginSchema),
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
            <h1 className="text-xs-center">Sign in</h1>
            <p className="text-xs-center">
              <Link to={RouterConfig.SignUpPage}>Need an account?</Link>
            </p>
            <FormErrors error={error?.response?.data} />

            <form onSubmit={handleSubmit(onSubmit)}>
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
                text="Sign in"
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
