import axios from 'axios';
import { useEffect } from 'react';
import { useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { BASE_URL } from '../config';
import { userContext } from '../context/userContext';
const LoginApplication = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setUserInfor } = useContext(userContext);
  // const []

  const params = {};

  searchParams.forEach((value, key) => {
    params[key] = value;
  });

  const googleLogin = async () => {
    const res = await axios.get(BASE_URL + 'callback', { params });
    setUserInfor(res.data.data, res.data.token);
    console.log(res);
    navigate('/');
  };

  useEffect(() => {
    googleLogin();
  }, []);

  return (
    <div className='flex w-screen h-screen text-center'>
      <div className='m-auto'>
        <h1 className='font-semibold text-3xl'>
          Chào mừng bạn đến mua sắm tại ssstutter
        </h1>
        <p className='text-[14px]'>
          Vui lòng chờ chuyển hướng đến trang mua sắm
        </p>
      </div>
    </div>
  );
};

export default LoginApplication;
