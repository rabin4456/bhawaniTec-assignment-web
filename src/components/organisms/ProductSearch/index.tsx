import { useForm } from "react-hook-form";
import { Button, Input } from "../..";

const products = [
  { name: "asdas", price: 2344, qty: 234 },
  { name: "asdas", price: 2344, qty: 234 },
  { name: "asdas", price: 2344, qty: 234 },
  { name: "asdas", price: 2344, qty: 234 },
  { name: "asdas", price: 2344, qty: 234 },
  { name: "asdas", price: 2344, qty: 234 },
  { name: "asdas", price: 2344, qty: 234 },
  { name: "asdas", price: 2344, qty: 234 },
  { name: "asdas", price: 2344, qty: 234 },
  { name: "asdas", price: 2344, qty: 234 },
  { name: "asdas", price: 2344, qty: 234 },
  { name: "asdas", price: 2344, qty: 234 },
  { name: "asdas", price: 2344, qty: 234 },
];

export const ProductSearch = ({ onAddNew }: { onAddNew: () => void }) => {
  const { register } = useForm();
  return (
    <div className='py-4'>
      <Input
        name='search'
        placeHolder='Search products'
        inputClassName='mb-3'
        register={register}
      />
      <div className=' max-h-[35vh] overflow-y-auto'>
        <div className='flex flex-col justify-center px-3   divide-y divide-neutral-100'>
          {products?.map((product) => (
            <div>
              <div className='flex justify-between items-center py-2'>
                <div>
                  <p className='font-medium'>{product.name}</p>
                  <p className='text-gray-500'> {product.qty}</p>
                </div>
                <p className='text-gray-500'>Rs. {product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button
        className='text-primary-500 py-4 text-center w-full font-bold text-base'
        onClick={onAddNew}
      >
        Add New
      </button>
    </div>
  );
};
