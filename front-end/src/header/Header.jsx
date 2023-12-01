import { useEffect, useImperativeHandle } from 'react';
import { forwardRef, useState } from 'react';
import { useContext } from 'react';
import {
  HiOutlineMenuAlt2,
  HiOutlineShoppingBag,
  HiOutlineSearch
} from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { Context } from '../components/Layout';
import NavLink from '../components/nav/NavLink';
import { UserMenu } from './UserMenu';

const Header = forwardRef(({ handleSideNav, handleSearch, menu }, ref) => {
  const { closeSearch, openMiniCart, loadItems } = useContext(Context);
  const [cartQty, setCartQty] = useState(0);

  useEffect(() => {
    loadItems && setCartQty(loadItems().length);
  }, [loadItems]);

  useImperativeHandle(ref, () => ({
    setCartQty
  }));

  return (
    <header className='fixed top-0 left-0 right-0 bg-white border-b border-[#ececec] z-10 h-[5.8rem]'>
      <nav className='grid px-[0.6rem] md:px-[1.6rem] lg:px-[6.4rem] grid-cols-[1fr_2fr_1fr] gap-x-[5%] bg-white items-center h-[100%]'>
        <div className='md:hidden'>
          <button className='p-3.5' onClick={handleSideNav}>
            <HiOutlineMenuAlt2 size={'2.4rem'} />
          </button>
        </div>
        <div className='h-[100%]'>
          <Link
            to={'/'}
            onClick={() => {
              window.scrollTo(0, 0);
              closeSearch();
            }}
            className="relative h-[100%] before:absolute before:top-[50%] before:left-[50%] before:translate-x-[-50%] before:translate-y-[-50%] before:h-[100%] before:w-[76%] before:bg-center before:bg-no-repeat before:bg-contain before:bg-[url('../assets/images/logo.png')] md:before:hidden flex items-center"
          >
            <svg
              className='hidden md:block md:w-[3rem] md:h-[3rem]'
              xmlns='http://www.w3.org/2000/svg'
              version='1.0'
              width='157.000000pt'
              height='227.000000pt'
              viewBox='0 0 157.000000 227.000000'
              preserveAspectRatio='xMidYMid meet'
            >
              <g
                transform='translate(0.000000,227.000000) scale(0.100000,-0.100000)'
                fill=''
                stroke='none'
              >
                <path d='M169 2255 c-77 -24 -148 -109 -164 -197 -9 -46 11 -114 80 -277 29 -69 105 -250 168 -401 63 -151 194 -463 291 -694 108 -257 176 -431 176 -451 0 -21 -9 -45 -26 -64 -55 -66 -151 -58 -190 15 -18 33 -20 34 -82 34 l-64 0 7 -27 c13 -52 37 -92 80 -132 82 -76 202 -82 301 -15 30 21 41 24 54 15 8 -6 39 -23 69 -38 72 -34 150 -29 223 16 27 17 52 31 54 31 3 0 20 -11 37 -24 96 -71 223 -61 309 25 55 55 85 135 73 197 -8 44 -75 212 -192 487 -47 110 -139 326 -203 480 -64 154 -163 389 -219 521 -55 133 -101 254 -101 268 0 65 55 116 126 116 28 0 44 -8 70 -34 19 -19 34 -41 34 -50 0 -13 12 -16 66 -16 l66 0 -7 33 c-19 86 -81 154 -168 183 -64 21 -123 13 -197 -28 l-57 -31 -31 22 c-41 29 -106 51 -151 51 -39 0 -107 -28 -148 -60 l-25 -19 -34 25 c-68 52 -140 65 -225 39z m152 -143 c26 -23 33 -39 40 -88 8 -57 55 -179 217 -564 39 -91 136 -322 216 -515 81 -192 178 -424 216 -513 82 -192 85 -219 36 -268 -28 -28 -41 -34 -78 -34 -70 0 -111 42 -124 127 -9 65 -16 83 -274 693 -135 319 -367 871 -404 962 -20 48 -36 101 -36 118 0 93 121 145 191 82z m360 0 c26 -23 33 -39 40 -88 8 -60 51 -171 219 -569 194 -460 234 -554 297 -705 161 -384 203 -492 203 -515 0 -34 -25 -82 -49 -95 -33 -17 -96 -12 -125 11 -34 26 -66 89 -66 128 0 16 -36 116 -81 223 -45 106 -114 272 -154 368 -41 96 -119 283 -175 415 -182 430 -300 723 -300 745 0 93 121 145 191 82z'></path>
              </g>
            </svg>
          </Link>
        </div>
        <ul className='hidden md:flex justify-center gap-[1rem]'>
          {menu.map((item, index) => (
            <NavLink key={index} {...item} />
          ))}
        </ul>
        <div className='flex justify-end gap-2'>
          <button className='p-3.5' onClick={handleSearch}>
            <HiOutlineSearch size={'2.4rem'} className='scale-x-[-1]' />
          </button>
          <button className='p-3.5 relative' onClick={openMiniCart}>
            <HiOutlineShoppingBag size={'2.4rem'} />
            {cartQty > 0 && (
              <span className='block absolute top-[50%] left-[40%] rounded-full bg-[#b80f0a] text-white font-semibold text-[1rem] px-[0.6rem]'>
                {cartQty < 100 ? cartQty : '99+'}
              </span>
            )}
          </button>
          <div className='hidden md:flex items-center'>
            <UserMenu />
          </div>
        </div>
      </nav>
    </header>
  );
});

export default Header;
