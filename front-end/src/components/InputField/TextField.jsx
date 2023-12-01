import * as React from 'react';
import FieldContainer from './FieldContainer';

const TextField = ({
  required = false,
  label,
  value,
  error,
  name,
  placeHolder,
  onChange,
  onBlur
}) => {
  return (
    <FieldContainer required={required} label={label} error={error}>
      <input
        className='w-full text-[14px] font-medium py-[16px] px-[20px] rounded shadow-primary bg-slate-50'
        type='text'
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        name={name}
        placeholder={placeHolder}
      />
    </FieldContainer>
  );
};

export default TextField;
