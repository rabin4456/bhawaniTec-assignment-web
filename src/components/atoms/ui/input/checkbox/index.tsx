interface ICheckbox {
  label?: string;
  name: string;
  register?: any;
  subLabel?: string;
  [key: string]: any;
}

export const CheckBox: React.FC<ICheckbox> = (props: ICheckbox) => {
  const { label, name, register, subLabel, ...args } = props;
  return (
    <div className='my-2 flex items-center'>
      <div className='flex h-8 items-center'>
        <input
          id={label}
          type='checkbox'
          className=' h-5 w-5 rounded border-gray-300 accent-primary-500 focus:accent-primary-600 text-primary-600 focus:ring-primary-600 disabled:opacity-50'
          {...register(name, { required: false })}
          {...args}
        />
      </div>
      <div className='ml-3 text-sm'>
        <label htmlFor={label} className='font-medium text-gray-700'>
          {label}
        </label>
      </div>
    </div>
  );
};
