import * as Yup from 'yup';

const rules = {
  username: Yup.string()
    .matches(
      /^[a-zA-Z]/,
      'Please, provide a name in the correct form, for example, "John Smith"',
    )
    .min(3, 'Name is too short')
    .required('Name is required'),
  email: Yup.string()
    .email('Something is missing. please type a valid email')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'The password must be at least 6 characters long')
    .required('Password is required'),
  teammateId: Yup.string().required(
    'The ID is required to find the correspond person',
  ),
  location: Yup.string().required('Location has not found'),
};

export const loginSchema = Yup.object().shape({
  email: rules.email,
  password: rules.password,
});

export const signUpSchema = Yup.object().shape({
  username: rules.username,
  email: rules.email,
  password: rules.password,
});

export const resetPasswordSchema = Yup.object().shape({
  email: rules.email,
});

export const teammateSchema = Yup.object().shape({
  teammateId: rules.teammateId,
});

export const locationSchema = Yup.object().shape({
  location: rules.location,
});

export const activitiesSchema = Yup.object().shape({
  heading: Yup.string().required('Activities heading is required'),
  description: Yup.string().required('Activities description is required'),
});

export const profileSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'The name couldn`t be less than 3 characters')
    .required('Name is required'),
});

export const feedbackSchema = Yup.object().shape({
  message: Yup.string().required('Feedback is required'),
});
