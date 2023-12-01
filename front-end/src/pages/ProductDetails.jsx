import { useEffect } from 'react';
import { useState } from 'react';
import NumberFormat from 'react-number-format';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { BsFillArrowRightCircleFill } from 'react-icons/bs';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { CSSTransition } from 'react-transition-group';
import { useContext } from 'react';
import { CgDanger } from 'react-icons/cg';
import { RiRulerLine } from 'react-icons/ri';

import Product from '../components/product/Product';
import { filterProducts, getDetail } from '../services/productServices';
import Button from '../shared/Button';
import { Context } from '../components/Layout';
import NoImg from '../assets/images/No_image.png';
import HimSize from '../assets/images/HimSize.jpg';
import HerSize from '../assets/images/HerSize.jpg';
import SizeChart from '../components/modals/SizeChart';

const ProductDetails = () => {
  const { addToCart, openOverlay } = useContext(Context);
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [products, setProducts] = useState([]);
  const [variant, setVariant] = useState({});
  const [selected, setSelected] = useState({
    productId: null,
    variantId: null,
    size: null,
    maxQty: null
  });
  const [addMessage, setAddMessage] = useState({
    mess: '',
    type: 'success',
    visible: false
  });
  const windowWidth = window.innerWidth;
  const navigate = useNavigate();

  useEffect(() => {
    const getProduct = async () => {
      const data = await getDetail(productId);
      const { variants } = data;
      !data?.id && navigate('../NotFound');

      setProduct(data);

      if (variants) {
        const availableColor = variants.find(({ qty }) => qty !== 0) || {};
        const { sizes = [] } = availableColor;
        const availableSize =
          sizes.find(({ quantity }) => quantity !== 0) || {};

        setVariant(availableColor || data.variants[0]);
        setSelected({
          productId: productId * 1,
          variantId: availableColor?.id,
          size: availableSize?.size,
          maxQty: availableSize?.quantity
        });
      }

      const { products } = await filterProducts({
        start: 0,
        colors: [],
        sizes: [],
        sort: 'desc',
        price: [0, -1],
        cateId: data?.categoryId || 0,
        limit: 10
      });
      setProducts(products.filter(({ id }) => id !== productId * 1));
    };

    getProduct();
  }, [navigate, productId]);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setAddMessage({ ...addMessage, visible: false });
    }, 2500);

    return () => clearTimeout(timeOut);
  }, [addMessage]);

  const onChange = (data, type) => (e) => {
    switch (type) {
      case 'color':
        const { sizes } = data;
        const currentSize = sizes.find(({ size }) => size === selected.size);
        const availableSize =
          currentSize?.quantity > 0
            ? currentSize
            : sizes.find(({ quantity }) => quantity !== 0);

        setVariant(data);
        setSelected({
          ...selected,
          variantId: data?.id,
          size: availableSize?.size,
          maxQty: availableSize?.quantity
        });

        break;
      case 'size':
        const { size, quantity: maxQty } = data;
        setSelected({
          ...selected,
          size,
          maxQty
        });
        break;
      default:
        break;
    }
  };

  const add = () => {
    const newItem = {
      ...selected,
      name: product.name,
      price: product.price,
      salePrice: product.salePrice,
      img_url: variant.thumbnail,
      color: variant.name,
      qty: 1
    };
    const response = addToCart(newItem);

    setAddMessage({ ...response, visible: true });
  };

  const openSizeChart = () => {
    const list = [
      {
        gender: 'nam',
        img: HimSize
      },
      {
        gender: 'nữ',
        img: HerSize
      }
    ];

    openOverlay(<SizeChart list={list} />);
  };

  return (
    <div className='md:grid md:grid-cols-3 pb-[2rem]'>
      <div className='md:col-span-2 md:col-end-3'>
        {variant?.images?.length === 0 && (
          <div className='relative pt-[125%] md:pt-[60%] bg-[#f1f1f1]'>
            <p className='font-semibold text-[1.8rem] text-[#aeaeae] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
              Chưa có hình ảnh
            </p>
          </div>
        )}
        <ul className='w-[100%] flex overflow-x-auto snap-x snap-mandatory md:block md:snap-none md:overflow-x-visible lg:grid grid-cols-2'>
          {variant?.images &&
            variant.images.map(({ id, url }) => (
              <li
                key={id}
                className='snap-start pt-[125%] min-w-[100%] bg-center bg-no-repeat bg-cover'
                style={{ backgroundImage: `url(${url})` }}
              ></li>
            ))}
        </ul>
      </div>
      <div className='md:col-end-4 md:row-start-1 px-[2rem] row-end-3'>
        <div className='sticky top-[7.8rem]'>
          <div className=' flex justify-between items-baseline pt-[1.4rem] flex-col'>
            <h1 className='text-[2.4rem] font-semibold'>{product?.name}</h1>
            <div className='text-[2rem] font-semibold'>
              <p>
                <NumberFormat
                  thousandsGroupStyle='thousand'
                  value={+product?.salePrice || product?.price}
                  decimalSeparator='.'
                  displayType='text'
                  thousandSeparator={true}
                />

                <span className='text-[1.8rem]'>₫</span>
              </p>
              {+product?.salePrice !== 0 && (
                <p className='line-through mt-[-0.4rem] md:mt-0 text-[1.4rem] text-[#aeaeae]'>
                  <NumberFormat
                    thousandsGroupStyle='thousand'
                    value={product?.price}
                    displayType='text'
                    decimalSeparator='.'
                    thousandSeparator={true}
                  />{' '}
                  <span className='text-[1.8rem]'>₫</span>
                </p>
              )}
            </div>
          </div>
          <div className='mt-[2rem]'>
            <h2 className='text-[1.6rem] font-semibold'>
              Chọn màu: {variant?.name}
            </h2>
            <ul className='grid grid-cols-4 gap-[1.6rem] mt-[0.8rem]'>
              {product?.variants &&
                product.variants.map((v) => (
                  <li key={v.id} className='relative'>
                    <input
                      type='radio'
                      className='peer absolute appearance-none'
                      id={`variant${v.id}`}
                      onChange={onChange(v, 'color')}
                      checked={variant.id === v.id}
                    />
                    <label
                      htmlFor={`variant${v.id}`}
                      className={`shadow-lg block w-[100%] pt-[100%] bg-center bg-no-repeat bg-cover rounded-[0.4rem] transition-all duration-300 border-2 border-[#d3d3d3] lg:peer-hover:scale-[0.95]  peer-checked:border-[#000] peer-checked:animate-clickA lg:peer-checked:animate-clickB cursor-pointer peer-disabled:cursor-default ${
                        v.qty === 0 ? 'disabled' : ''
                      }`}
                      style={{
                        backgroundImage: `url(${v.thumbnail || NoImg})`
                      }}
                    ></label>
                    {/* <div className="opacity-0 transition-all duration-300 peer-checked:opacity-100 absolute z-[-1] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-[0.4rem] bg-[#000] w-[50%] h-[50%] peer-checked:w-[105%] peer-checked:h-[105%]"></div> */}
                  </li>
                ))}
            </ul>
          </div>
          <div className='mt-[2rem]'>
            <div className='flex justify-between items-baseline'>
              <h2 className='text-[1.6rem] font-semibold'>Chọn size</h2>

              <button
                className='font-semibold text-[1.6rem] flex items-center gap-[0.4rem] hover:opacity-90 transition-all duration-300'
                onClick={openSizeChart}
              >
                <RiRulerLine size={20} className='translate-y-[-0.2rem]' />
                <span>Bảng size</span>
              </button>
            </div>
            {selected.maxQty <= 10 && (
              <span className='text-[#ff3548] text-[1.4rem] font-medium'>{`Còn ${selected.maxQty} sản phẩm`}</span>
            )}
            <ul className='grid grid-cols-4 gap-[1.6rem] mt-[0.8rem]'>
              {variant?.sizes &&
                variant.sizes.map(({ size, quantity }) => (
                  <li key={size} className='relative'>
                    <input
                      type='radio'
                      className='peer absolute appearance-none'
                      id={`size${size}`}
                      onChange={onChange({ size, quantity }, 'size')}
                      checked={selected.size === size}
                      disabled={quantity === 0}
                    />
                    <label
                      htmlFor={`size${size}`}
                      className={`block py-[1rem] border-2 border-[#f1f1f1] text-[1.8rem] font-semibold text-center rounded-[0.4rem] transition-all duration-300 cursor-pointer peer-disabled:cursor-default ${
                        quantity !== 0
                          ? 'lg:peer-hover:scale-[0.95] peer-checked:animate-clickA   lg:peer-checked:animate-clickB peer-checked:text-[#fff] peer-checked:border-[#000] peer-checked:bg-[#000]'
                          : 'disabled'
                      } `}
                    >
                      {size}
                    </label>
                  </li>
                ))}
            </ul>
          </div>
          <div className='mt-[3rem] relative'>
            <Button
              type={variant.qty === 0 ? 'disabled' : ''}
              text={variant.qty === 0 ? 'HẾT HÀNG' : 'THÊM VÀO GIỎ HÀNG'}
              className={`w-[100%] lg:hover:scale-[0.95]`}
              onclick={add}
            />
            <CSSTransition
              in={addMessage.visible}
              timeout={300}
              classNames='blur'
              unmountOnExit
            >
              <div className='absolute bottom-[120%] left-[50%] translate-x-[-50%] w-max max-w-[100%] flex gap-[1.6rem] items-center px-[1.6rem] py-[0.8rem] shadow-lg rounded-[0.6rem] bg-white'>
                {addMessage.type === 'success' && (
                  <AiOutlineCheckCircle size={28} color='#2abbac' />
                )}
                {addMessage.type === 'danger' && (
                  <CgDanger size={36} color='#ff3548' />
                )}
                <p className='text-[1.4rem] font-semibold'>{addMessage.mess}</p>
              </div>
            </CSSTransition>
          </div>
        </div>
      </div>
      <div className='md:col-end-3 md:col-span-2 mt-[3rem] px-[2rem]'>
        <h2 className='font-semibold text-[2.4rem] text-center'>CHI TIẾT</h2>
        <div
          className={`py-[2rem] text-[1.6rem] ${
            product.description ? '' : 'text-center'
          }`}
          dangerouslySetInnerHTML={{
            __html: product.description ?? 'Chưa có mô tả'
          }}
        ></div>
      </div>
      <div className='mt-[3rem] px-[2rem] md:col-end-4 md:col-span-3'>
        <h2 className='font-semibold text-[2rem] mb-[1.2rem]'>
          SẢN PHẨM TƯƠNG TỰ
        </h2>
        <Swiper
          slidesPerView={(windowWidth / 220).toFixed() * 1 + 0.2}
          spaceBetween={windowWidth < 768 ? 10 : 20}
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <Product {...product} />
            </SwiperSlide>
          ))}
          {
            <SwiperSlide>
              <div className='relative bg-[#f1f1f1] pt-[125%] rounded-[0.4rem]'>
                <div className='absolute w-[100%] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col gap-[0.4rem] items-center'>
                  <BsFillArrowRightCircleFill fill='#aeaeae' size={48} />
                  <span className='font-semibold text-[1.6rem] mt-[2.4rem]'>
                    Xem thêm
                  </span>
                </div>
                <Link
                  className='absolute block h-[100%] w-[100%] top-0 left-0 z-2'
                  to={`../category/${product.categoryId}`}
                  onClick={() => {
                    window.scrollTo(0, 0);
                  }}
                ></Link>
              </div>
            </SwiperSlide>
          }
        </Swiper>
      </div>
    </div>
  );
};

export default ProductDetails;
