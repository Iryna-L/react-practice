import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { RouterConfig } from '@/constants/routes';
import { useLogout, useGetUserQuery, useUpdateUserMutation } from '@/hooks/auth';
import { Input, Button, FormErrors } from '@/components';
import { validationSettingsSchema } from '@/utils';
import { showModal } from '@/store/modal.store';
import { TextArea } from '@/components/TextArea';

type FormValues = {
  image?: string;
  username: string;
  bio?: string;
  email: string;
  password?: string;
};

export default function Settings() {
  const { isLoading, error, mutate } = useUpdateUserMutation();
  const { data } = useGetUserQuery();
  const user = data?.data.user;
  const defaultValues = {
    image: user?.image || '',
    username: user?.username || '',
    bio: user?.bio || '',
    email: user?.email || '',
    password: '',
  };
  const navigate = useNavigate();
  const logout = useLogout();

  const methods = useForm<FormValues>({
    defaultValues,
    resolver: yupResolver(validationSettingsSchema),
  });

  const {
    handleSubmit,
    register,
    formState: { isDirty, errors, dirtyFields },
  } = methods;

  const handleLogout = () => {
    logout();
    navigate(RouterConfig.Home);
  };
  const onSubmit = (payload: FormValues) => {
    const readyToSend = Object.keys(payload).reduce((acc: Object | {}, key: string) => {
      if (key in dirtyFields) {
        return { ...acc, [key]: payload[key as keyof FormValues] };
      }
      return acc;
    }, {});
    showModal({
      title: 'Update settings',
      text: 'Are you sure you want to update settings?',
      onConfirm: () => mutate({ user: readyToSend }),
    });
  };

  return (
    <div className="settings-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Your Settings</h1>
            <FormErrors error={error?.response?.data} />
            <form onSubmit={handleSubmit(onSubmit)}>
              <fieldset>
                <fieldset className="form-group">
                  <Input
                    name="image"
                    type="text"
                    placeholder="URL of profile picture"
                    registerProps={register('image')}
                    errors={errors}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <Input
                    name="username"
                    type="text"
                    placeholder="Your Name"
                    registerProps={register('username')}
                    errors={errors}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <TextArea
                    name="bio"
                    registerProps={register('bio')}
                    errors={errors}
                    placeholder="Short bio about you"
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
                    placeholder="New Password"
                    registerProps={register('password')}
                    errors={errors}
                  />
                </fieldset>
                <Button
                  className="btn btn-lg btn-primary pull-xs-right"
                  text="Update Settings"
                  type="submit"
                  loading={isLoading}
                  disabled={!isDirty}
                />
              </fieldset>
            </form>
            <hr />
            <Button
              className="btn btn-outline-danger"
              text="Or click here to logout."
              type="button"
              onClick={handleLogout}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
