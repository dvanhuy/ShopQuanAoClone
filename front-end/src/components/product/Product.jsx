import { Link } from 'react-router-dom';
import NumberFormat from 'react-number-format';
import { capitalize } from '../../utils/capitalizeString';
import { useContext } from 'react';
import { Context } from '../Layout';

const Product = ({
  id,
  name,
  color,
  img_url,
  price,
  discount,
  salePrice,
  textcolor = '#aeaeae'
}) => {
  const { closeSearch } = useContext(Context);

  return (
    <div className='relative group '>
      <div>
        <Link
          to={`../product/${id}`}
          onClick={() => {
            closeSearch();
            window.scrollTo(0, 0);
          }}
          style={{ backgroundImage: `url(${img_url})` }}
          className=' block pt-[125%] bg-center bg-no-repeat bg-cover group-hover:brightness-90 transition-all duration-300'
        ></Link>
      </div>
      {discount !== 0 && (
        <div className='absolute top-0 right-0 p-[1rem] rounded-bl-[0.6rem] bg-[#c1272d] text-[1.2rem] font-semibold text-white'>
          <span>-{discount}%</span>
        </div>
      )}
      <div className='text-left font-semibold mt-[0.4rem] ml-[0.6rem]'>
        <h6 className='text-[1.4rem] capitalize'>{capitalize(name)}</h6>
        <div className='text-[1.8rem] md:flex gap-[0.4rem] items-center tracking-wide'>
          <p>
            <NumberFormat
              thousandsGroupStyle='thousand'
              value={+salePrice || price}
              decimalSeparator='.'
              displayType='text'
              thousandSeparator={true}
            />

            <span className='text-[1.8rem]'>₫</span>
          </p>
          {+salePrice !== 0 && (
            <p
              style={{ color: textcolor }}
              className='line-through mt-[-0.4rem] md:mt-0 text-[1.4rem]'
            >
              <NumberFormat
                thousandsGroupStyle='thousand'
                value={price}
                displayType='text'
                decimalSeparator='.'
                thousandSeparator={true}
              />{' '}
              <span className='text-[1.8rem]'>₫</span>
            </p>
          )}
        </div>

        <div style={{ color: textcolor }} className='text-[1.2rem]'>
          <p>+{color} màu</p>
        </div>
      </div>
    </div>
  );
};

export default Product;
