import Dropdown from 'rc-dropdown';
import Menu, { Item as MenuItem, Divider } from 'rc-menu';
import { useContext } from 'react';
import { ROLE, userContext } from '../context/userContext';
import 'rc-dropdown/assets/index.css';
import { Link } from 'react-router-dom';
import { HiOutlineUser } from 'react-icons/hi';

export const UserMenu = () => {
  const { user, isLogin, resetUserInfo } = useContext(userContext);

  const menu = (
    <Menu>
      <MenuItem key={1}>
        <h3 className='py-[8px] px-[16px] font-semibold text-[14px] block cursor-pointer'>
          {user.name}
        </h3>
      </MenuItem>
      {/* <MenuItem>Lịch sử mua hàng</MenuItem> */}
      <Divider className='h-[1px] bg-slate-100 mx-6' />
      {user.role === ROLE.ADMIN && (
        <MenuItem key={4}>
          <span className='py-[8px] px-[16px] font-medium text-[14px] block cursor-pointer'>
            Trang quản trị
          </span>
          ị
        </MenuItem>
      )}
      <MenuItem key={5} onClick={resetUserInfo}>
        <span className='py-[8px] px-[16px] font-medium text-[14px] block cursor-pointer'>
          Đăng xuất
        </span>
      </MenuItem>
    </Menu>
  );

  return isLogin ? (
    <Dropdown
      trigger={['click', 'scroll']}
      hideAction={['scroll']}
      overlay={menu}
      animation='slide-up'
    >
      <button className='p-[10px]'>
        <HiOutlineUser size={24} />
      </button>
    </Dropdown>
  ) : (
    <div className='flex gap-2 justify-start pr-3.5 items-center h-full'>
      <Link to='/login'>
        <button className='whitespace-nowrap px-6 text-xl font-semibold py-3'>
          Đăng nhập
        </button>
      </Link>
      <Link to='/register'>
        <button className='whitespace-nowrap px-6 text-xl font-semibold py-3 bg-black rounded text-white'>
          Đăng ký
        </button>
      </Link>
    </div>
  );
};
