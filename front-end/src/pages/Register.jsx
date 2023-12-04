import { useState } from 'react';
import { useEffect } from 'react';
import { getGoogleLoginURL, register } from '../services/auth';
import Banner from '../assets/images/login-banner.jpeg';
import Logo from '../assets/images/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Formik } from 'formik';
import TextField from '../components/InputField/TextField';
import { IoLogoGoogle } from 'react-icons/io';
import { HiOutlineArrowNarrowLeft } from 'react-icons/hi';
import * as Yup from 'yup';
import { useContext } from 'react';
import { userContext } from '../context/userContext';
import PasswordField from '../components/InputField/PasswordField';

const initValue = {
  email: '',
  password: '',
  name: '',
  password_confirmation: ''
};

const schema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .required('Hãy nhập email!')
    .email('Email không đúng định dạng!'),
  password: Yup.string().trim().required('Hãy nhập mật khẩu!'),
  name: Yup.string().trim().required('Hãy nhập tên của bạn!'),
  password_confirmation: Yup.string()
    .trim()
    .required('Xác nhận mật khẩu!')
    .oneOf([Yup.ref('password'), null], 'Mật khẩu không khớp!')
});

const Register = () => {
  const [googleLogInURL, setGoogleLoginURL] = useState('');
  const { setUserInfor } = useContext(userContext);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetch() {
      const res = await getGoogleLoginURL();
      setGoogleLoginURL(res.url);
    }

    fetch();
  }, []);

  const handleSubmit = async (values) => {
    try {
      const res = await register(values);
      setUserInfor(res.user, res.token);
      navigate('/');
    } catch (error) {}
  };

  return (
    <div className='flex relative'>
      <div className='flex-1 hidden lg:block h-screen sticky top-0 left-0'>
        <img src={Banner} className='h-full w-full object-cover' alt='' />
      </div>
      <div className='flex-1 flex flex-col items-center p-10 min-h-screen relative'>
        <div className='grid grid-cols-3 mt-40 lg:mt-10 max-w-[600px] items-center'>
          <Link to='/' className=''>
            <HiOutlineArrowNarrowLeft size={24} />
          </Link>
          <img className='h-14 mx-' src={Logo} alt='' />
        </div>
        <Formik
          validationSchema={schema}
          initialValues={initValue}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            handleBlur,
            handleChange,
            isSubmitting,
            touched
          }) => (
            <Form className='flex w-full flex-col gap-3 mt-20 max-w-[600px]'>
              <TextField
                label='Họ tên'
                name='name'
                required
                error={touched.name ? errors.name : ''}
                value={values.name}
                onChange={handleChange}
                onBlur={(e) => {
                  handleBlur(e);
                }}
                placeHolder='Nhập tên của bạn'
              />
              <TextField
                label='Email'
                name='email'
                required
                error={touched.email ? errors.email : ''}
                value={values.email}
                onChange={handleChange}
                onBlur={(e) => {
                  handleBlur(e);
                }}
                placeHolder='Nhập email'
              />
              <PasswordField
                label='Mật khẩu'
                name='password'
                required
                error={touched.password ? errors.password : ''}
                value={values.password}
                onChange={handleChange}
                onBlur={(e) => {
                  handleBlur(e);
                }}
                placeHolder='Nhập mật khẩu'
              />
              <PasswordField
                label='Xác nhận mật khẩu'
                name='password_confirmation'
                required
                error={
                  touched.password_confirmation
                    ? errors.password_confirmation
                    : ''
                }
                value={values.password_confirmation}
                onChange={handleChange}
                onBlur={(e) => {
                  handleBlur(e);
                }}
                placeHolder='Nhập lại mật khẩu'
              />

              <button
                type='submit'
                disabled={isSubmitting}
                className='whitespace-nowrap mt-[40px] text-[14px] font-semibold py-[20px] bg-black rounded text-white'
              >
                Đăng ký
              </button>
            </Form>
          )}
        </Formik>
        <p className='text-[14px] py-12'>Hoặc</p>

        <a
          href={googleLogInURL}
          className='whitespace-nowrap flex items-center gap-[16px] w-full justify-center text-[14px] font-semibold py-[16px] text-black rounded border-2 border-black max-w-[600px]'
        >
          <IoLogoGoogle size={28} className='-translate-y-[1px]' />
          Tiếp tục với Google
        </a>

        <p className='text-[14px] pt-12 md:py-20'>
          Đã có tài khoản?{' '}
          <Link className='underline font-medium' to='/login'>
            đăng nhập
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
