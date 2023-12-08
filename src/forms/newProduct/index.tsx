import { SubmitHandler, useForm } from "react-hook-form";
import { Button, Input } from "../../components";
import { useDispatch } from "react-redux";
import { ADD_PRODUCTS } from "../../features/products/productsSlice";
import { ProductsSchema, TProduct } from "../../utils/validation";
import { zodResolver } from "@hookform/resolvers/zod";

const NewProduct = ({ onAddSuccess }: { onAddSuccess: () => void }) => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TProduct>({
    resolver: zodResolver(ProductsSchema),
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<TProduct> = (data) => {
    dispatch(ADD_PRODUCTS(data));
    onAddSuccess();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='grid md:grid-cols-2 grid-cols-1 gap-4 '>
          <Input
            name='productName'
            label='Product name'
            register={register}
            error={errors?.productName?.message}
          />
          <Input
            name='qty'
            label='Quantity'
            type='number'
            register={register}
            error={errors?.qty?.message}
          />
          <Input
            name='rate'
            label='Rate'
            type='number'
            register={register}
            error={errors?.rate?.message}
          />
          <Input
            name='discount'
            label='Discount'
            type='number'
            register={register}
            error={errors?.discount?.message}
          />
          <Input
            name='tax'
            label='Tax'
            type='number'
            register={register}
            error={errors?.tax?.message}
          />
        </div>
        <div className='flex items-center justify-end my-4 '>
          <Button label='Add' className='w-full' type='submit' />
        </div>
      </form>
    </>
  );
};

export default NewProduct;
