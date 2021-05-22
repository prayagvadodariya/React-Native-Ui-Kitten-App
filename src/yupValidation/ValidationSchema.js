import * as yup from 'yup';

export const loginValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Please enter valid email")
      .required('Email Address is Required'),
    password: yup
      .string()
      .min(8, ({ min }) => `Password must be at least ${min} characters`)
      .required('Password is required'),
  })

export const signupValidationSchema = yup.object().shape({
  firstname: yup
    .string()
    .required('First Name is Required'),
  lastname: yup
    .string()
    .required('Last Name is Required'),
  email: yup
    .string()
    .email("Please enter valid email")
    .required('Email Address is Required'),
  phone: yup
    .string()
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(10, 'Must be exactly 10 digits')
    .max(10, 'Must be exactly 10 digits')
    .required('Phone no is Required'),      
  password: yup
    .string()
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required('Password is required'),
  confirmpassword: yup
    .string()
    .when("password", {
      is: val => (val && val.length > 0 ? true : false),
      then: yup.string().oneOf(
        [yup.ref("password")],
        "Both password need to be the same"
      )
    })
    .required('Confirm Password is required'),  
})  

export const forgetValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter valid email")
    .required('Email Address is Required'),

})

export const addressValidationSchema = yup.object().shape({
  firstname: yup
    .string()
    .required('First Name is Required'),
  lastname: yup
    .string()
    .required('Last Name is Required'),
  company: yup
    .string()
    .required('Company is Required'), 
  address1: yup
    .string()
    .required('Address 1 is Required'),
  address2: yup
    .string()
    .required('Address 2 is Required'),
  city: yup
    .string()
    .required('City is Required'), 
  pincode: yup
    .string()
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(6, 'Must be exactly 6 digits')
    .max(6, 'Must be exactly 6 digits')
    .required('Pincode is Required'),    
})