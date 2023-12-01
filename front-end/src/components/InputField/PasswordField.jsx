import * as React from 'react';
import { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import FieldContainer from './FieldContainer';

const PasswordField = ({
  required = false,
  label,
  value,
  error,
  name,
  placeHolder,
  onChange,
  onBlur
}) => {
  const [show, setShow] = useState(false);

  return (
    <FieldContainer required={required} label={label} error={error}>
      <input
        className='w-full text-[14px] font-medium py-[16px] px-[20px] rounded shadow-primary bg-slate-50'
        type={show ? 'text' : 'password'}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        name={name}
        placeholder={placeHolder}
      />
      <button
        type='button'
        className='absolute top-[36px] right-[16px]'
        onClick={() => setShow(!show)}
      >
        {!show ? <AiFillEye size={24} /> : <AiFillEyeInvisible size={24} />}
      </button>
    </FieldContainer>
  );
};

export default PasswordField;
