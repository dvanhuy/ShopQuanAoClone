import React, { forwardRef, useImperativeHandle } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { MdKeyboardBackspace } from 'react-icons/md';
import NumberFormat from 'react-number-format';
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import Button from '../../shared/Button';
import { Context } from '../Layout';
import EmptyCart from '../../assets/images/EmptyCart.jpg';
import NoImg from '../../assets/images/No_image.png';

const MiniCart = forwardRef((props, ref) => {
  const loadItems = () => JSON.parse(localStorage.getItem('cartItems')) || [];
  const [display, setDisplay] = useState(false);
  const [cartItems, setCartItems] = useState(loadItems());
  const { setCartQty, closeSearch, openOverlay, closeOverlay } =
    useContext(Context);
  const [price, setPrice] = useState({
    sum: 0,
    sale: 0,
    total: 0
  });

  const openMiniCart = () => setDisplay(true);

  const closeMiniCart = () => setDisplay(false);

  const setItems = (items) => {
    setCartItems(items);
    localStorage.setItem('cartItems', JSON.stringify(items));
  };

  const addToCart = (product) => {
    const oldItems = loadItems();
    const existsItem = oldItems.find(({ variantId, size }) => {
      return variantId === product.variantId && size === product.size;
    });

    if (existsItem) {
      const { qty, maxQty } = existsItem;
      if (qty === maxQty)
        return {
          mess: 'Số lượng trong giỏ hàng của sản phẩm này đã đạt mức tối đa!',
          type: 'danger'
        };
      else existsItem.qty++;
    }

    const newList = existsItem ? oldItems : [...oldItems, product];
    setItems(newList);
    return {
      mess: 'Đã thêm vào giỏ hàng!',
      type: 'success'
    };
  };

  const confirmRemove = (variantId, size) => () => {
    const dialog = (
      <div className='bg-white px-[2rem] py-[2.4rem] rounded-[0.6rem]'>
        <h2 className='font-semibold text-[1.6rem]'>
          Bạn có muốn bỏ sản phẩm này khỏi giỏ hàng không?
        </h2>
        <div className='pt-[2rem] flex justify-between gap-[1.4rem]'>
          <Button
            onclick={() => {
              closeOverlay();
            }}
            text='Quay lại'
            type='outline'
            className='flex-1'
          />
          <Button
            onclick={() => {
              remove(variantId, size);
              closeOverlay();
            }}
            text='Loại bỏ'
            className='flex-1'
          />
        </div>
      </div>
    );
    openOverlay && openOverlay(dialog);
  };

  const remove = (variantId, size) => {
    const items = loadItems().filter(
      ({ variantId: id, size: rSize }) => id !== variantId || rSize !== size
    );
    setItems(items);
  };

  const onBlur = (variantId, size) => (e) => {
    const items = loadItems();
    const item = items.find(
      ({ variantId: id, size: rSize }) => id === variantId && rSize === size
    );
    if (item.qty <= 0) {
      item.qty = 1;
      setItems(items);
    }
  };

  const onChange = (type, variantId, size) => (e) => {
    const items = loadItems();
    const item = items.find(
      ({ variantId: id, size: rSize }) => id === variantId && rSize === size
    );

    switch (type) {
      case 'increase':
        item.qty++;

        setItems(items);
        break;
      case 'decrease':
        if (item.qty <= 1) {
          confirmRemove(variantId, size)();
          break;
        }

        item.qty--;

        setItems(items);
        break;
      default:
        let { value } = e.target;
        value = value.replace(/\D/g, '') * 1;
        item.qty = value <= item.maxQty ? value : item.maxQty;
        setItems(items);
    }
  };

  useEffect(() => {
    setCartQty && setCartQty(cartItems.length);
  }, [cartItems, setCartQty]);

  useEffect(() => {
    let sum = 0;
    let sale = 0;
    let total = 0;

    cartItems.forEach(({ price, salePrice, qty }) => {
      sum += price * qty;
      sale += salePrice > 0 ? (price - salePrice) * qty : 0;
      total += salePrice > 0 ? salePrice * qty : price * qty;
    });
    setPrice({
      sum,
      sale,
      total
    });
  }, [cartItems]);

  useImperativeHandle(ref, () => ({
    openMiniCart,
    closeMiniCart,
    addToCart,
    loadItems
  }));

  return (
    <>
      <CSSTransition
        in={display}
        timeout={300}
        classNames='slide-up'
        unmountOnExit
      >
        <div className='fixed inset-0 md:left-[50%] md:top-[5.8rem] md:bottom-[30%] lg:left-[66%] lg:bottom-0 bg-white z-[12] border-l border-[#f1f1f1] flex flex-col'>
          <div className='flex justify-between items-center pr-[2rem] pl-[0.4rem] border-b border-[#f1f1f1]'>
            <button className='py-[1.2rem] px-[1.6rem]' onClick={closeMiniCart}>
              <MdKeyboardBackspace size={32} />
            </button>{' '}
            <h2 className='font-semibold text-[1.8rem]'>Giỏ hàng</h2>
          </div>
          {cartItems.length === 0 && (
            <div className='flex flex-col items-center md:mt-[6rem] mb-auto'>
              <img
                src={EmptyCart}
                alt='empty-cart'
                className='md:max-w-[50%]'
              />
              <h2 className='font-semibold text-[1.6rem] text-center '>
                Không có sản phẩm nào!
              </h2>
            </div>
          )}
          <ul className='p-[2rem] overflow-y-auto max-h-[72%] lg:max-h-[60%] lg:scrollbar mb-auto'>
            {cartItems.map(
              ({
                productId,
                name,
                color,
                size,
                qty,
                img_url,
                price,
                salePrice,
                variantId,
                maxQty
              }) => (
                <li
                  key={productId + color + size}
                  className='pt-[2.4rem] first:pt-0 last:pb-[1rem]'
                >
                  <div className='grid grid-cols-[8rem_1fr] gap-[1.4rem]'>
                    <div>
                      <Link
                        to={`../product/${productId}`}
                        onClick={() => {
                          closeSearch();
                          closeMiniCart();
                          window.scrollTo(0, 0);
                        }}
                        style={{ backgroundImage: `url(${img_url || NoImg})` }}
                        className=' block pt-[100%] bg-center bg-no-repeat bg-cover group-hover:brightness-90 transition-all duration-300'
                      ></Link>
                    </div>
                    <div className='relative translate-y-[-0.6rem]'>
                      <h2 className='font-semibold text-[1.6rem]'>{name}</h2>
                      <p className='text-[1.3rem]'>
                        {color + ', size: ' + size}
                      </p>
                      <div className='text-[1.4rem] font-semibold flex gap-[0.4rem] items-center tracking-wide'>
                        <p>
                          <NumberFormat
                            thousandsGroupStyle='thousand'
                            value={+salePrice || price}
                            decimalSeparator='.'
                            displayType='text'
                            thousandSeparator={true}
                          />{' '}
                          <span className='text-[1.4rem]'>₫</span>
                        </p>
                        {+salePrice !== 0 && (
                          <p
                            style={{ color: '#aeaeae' }}
                            className='line-through md:mt-0 text-[1.4rem]'
                          >
                            <NumberFormat
                              thousandsGroupStyle='thousand'
                              value={price}
                              displayType='text'
                              decimalSeparator='.'
                              thousandSeparator={true}
                            />{' '}
                            <span className='text-[1.4rem]'>₫</span>
                          </p>
                        )}
                      </div>
                      {maxQty <= 10 && (
                        <p className='text-[#ff3548] text-[1.3rem] font-medium'>{`Còn ${maxQty} sản phẩm`}</p>
                      )}
                      {maxQty > 10 && (
                        <p className='text-[1.3rem] font-medium'>{`Kho: ${maxQty}`}</p>
                      )}
                      <div className='inline-flex items-strength mt-[1rem] border border-[#f1f1f1] rounded-[0.6rem]'>
                        <button
                          onClick={onChange('decrease', variantId, size)}
                          className={`text-[2rem] font-semibold px-[1.6rem]`}
                        >
                          -
                        </button>
                        <input
                          className='text-[1.6rem] font-semibold w-[5.6rem] border-x border-[#f1f1f1] outline-none text-center appearance-none'
                          type='number'
                          value={(qty + '').replace(/^0*/g, '')}
                          onChange={onChange('', variantId, size)}
                          onBlur={onBlur(variantId, size)}
                          onKeyDown={(e) => {
                            const key = e.nativeEvent.key;
                            ['.', '-'].includes(key) &&
                              e.nativeEvent.preventDefault();
                          }}
                        />
                        <button
                          onClick={onChange('increase', variantId, size)}
                          className={`text-[2rem] font-semibold px-[1.6rem] ${
                            qty === maxQty ? 'bg-[#f1f1f1] text-[#aeaeae]' : ''
                          }`}
                          disabled={qty === maxQty}
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={confirmRemove(variantId, size)}
                        className='absolute top-[-1rem] right-[-1.6rem] p-[2.2rem]'
                      >
                        <span className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] block w-[2rem] h-[0.1rem] rotate-45 bg-[#aeaeae]'></span>
                        <span className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] block w-[2rem] h-[0.1rem] rotate-[-45deg] bg-[#aeaeae]'></span>
                      </button>
                    </div>
                  </div>
                </li>
              )
            )}
          </ul>
          <div className='bg-white p-[2rem]'>
            <div className='font-semibold text-[1.6rem] flex justify-between'>
              <span>Tổng:</span>
              <div>
                <NumberFormat
                  thousandsGroupStyle='thousand'
                  value={price.sum}
                  displayType='text'
                  decimalSeparator='.'
                  thousandSeparator={true}
                />{' '}
                <span className='text-[1.8rem]'>₫</span>
              </div>
            </div>
            <div className='font-semibold text-[1.6rem] flex justify-between'>
              <span>Ưu đãi:</span>
              <div>
                <NumberFormat
                  thousandsGroupStyle='thousand'
                  value={price.sale}
                  displayType='text'
                  decimalSeparator='.'
                  thousandSeparator={true}
                />{' '}
                <span className='text-[1.8rem]'>₫</span>
              </div>
            </div>
            <div className='font-semibold text-[1.6rem] flex justify-between'>
              <span>Thành tiền:</span>
              <div>
                <NumberFormat
                  thousandsGroupStyle='thousand'
                  value={price.total}
                  displayType='text'
                  decimalSeparator='.'
                  thousandSeparator={true}
                />{' '}
                <span className='text-[1.8rem]'>₫</span>
              </div>
            </div>
            <Button
              text='THANH TOÁN'
              className={`w-[100%] lg:hover:scale-[0.95] mt-[2rem] `}
            />
          </div>
        </div>
      </CSSTransition>
    </>
  );
});

export default MiniCart;
