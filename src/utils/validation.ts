import * as yup from 'yup';

export const validationLoginSchema = yup.object({
  email: yup.string().email('Email format is not valid').required('Email is required'),
  password: yup.string().min(6, 'Minimum length is 6').required('Password is required'),
});
export const validationRegisterSchema = yup
  .object({
    username: yup.string().max(20, 'Maximum length is 20').required('Username is required'),
  })
  .concat(validationLoginSchema);
export const validationSettingsSchema = yup.object({
  password: yup.string().test({
    name: 'password-min-length',
    message: 'Minimum length is 6',
    test: (value, context) => {
      if (value === '') return true;
      return context.originalValue.length >= 6;
    },
  }),
  image: yup.string().url(),
  username: yup.string().max(20, 'Maximum length is 20').required('Username is required'),
  bio: yup.string().max(100, 'Maximum length is 100'),
  email: yup.string().email('Email format is not valid').required('Email is required'),
});

export const validationArticleEditorSchema = yup.object({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  body: yup.string().required('Body is required'),
  tagList: yup.string(),
});
