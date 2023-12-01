import classNames from 'classnames';
import * as React from 'react';

const FieldContainer = ({ label, error, children, required }) => {
  return (
    <div>
      <label className='relative'>
        {label && (
          <p className='font-medium text-[12px] mb-1'>
            {label} {required && <span className='text-red-400'>*</span>}
          </p>
        )}
        <div
          className={classNames([
            'border border-transparent rounded',
            error && 'border-red-400'
          ])}
        >
          {children}
        </div>
      </label>
      <p className='h-6 text-[12px] font-medium mt-1 text-red-400'>{error}</p>
    </div>
  );
};

export default FieldContainer;
