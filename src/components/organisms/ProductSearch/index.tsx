import { useForm } from "react-hook-form";
import { Input, CheckBox, Button } from "../..";
import { useSelector } from "react-redux";
import { IStore } from "../../../types";
import { TProduct } from "../../../utils/validation";
import { useEffect, useState } from "react";

export interface IState {
  ProductReducer: IStore;
}

export const ProductSearch = ({
  onAddNew,
  setProduct,
  onAddProduct,
}: {
  onAddNew: () => void;
  setProduct: (key: string, data: TProduct[]) => void;
  onAddProduct: () => void;
}) => {
  const { register, watch, setValue } = useForm();
  const [filteredData, setFilteredData] = useState<TProduct[] | null>(null);

  const productsData = useSelector(
    (state: IState) => state?.ProductReducer?.products
  );

  useEffect(() => {
    if (productsData?.length && watch("search")) {
      const data = productsData?.filter((el) =>
        el.productName.toLowerCase().includes(watch("search").toLowerCase())
      );
      setFilteredData(data);
    } else {
      productsData?.length && setFilteredData(productsData);
    }
  }, [productsData, watch("search")]);

  const handleCheck = (name: string) => {
    if (
      watch(name) &&
      !watch("products")?.some(
        (el: TProduct) =>
          el.productName === JSON.parse(watch(name))?.productName
      )
    ) {
      watch("products")?.length
        ? setValue("products", [...watch("products"), JSON.parse(watch(name))])
        : setValue("products", [JSON.parse(watch(name))]);
    }

    if (
      !watch(name) &&
      watch("products")?.length &&
      watch("products")?.some((el: TProduct) => el.productName === name)
    ) {
      const tempData = watch("products")?.filter(
        (el: TProduct) => el.productName !== name
      );
      setValue("products", tempData);
    }
  };

  const onSubmitProduct = () => {
    const selectedProducts = watch("products");
    setProduct("products", selectedProducts);
    onAddProduct();
  };

  const isProducts = watch("products")?.length;
  return (
    <div className='py-4'>
      <Input
        name='search'
        placeholder='Search products'
        inputClassName='mb-3'
        register={register}
      />
      <div className=' max-h-[35vh] overflow-y-auto'>
        <div className='flex flex-col justify-center px-3   divide-y divide-neutral-100'>
          {filteredData?.length ? (
            filteredData?.map((product: TProduct) => (
              <div
                className='flex justify-between items-center py-2 gap-2'
                key={product.productName}
              >
                <div className='flex  items-center'>
                  <CheckBox
                    id={product.productName}
                    name={product.productName}
                    onClick={handleCheck(product.productName)}
                    value={JSON.stringify({ ...product, qty: "1" })}
                    register={register}
                  />
                  <div className=''>
                    <p className='font-medium'>{product.productName}</p>
                    <p className='text-gray-500'>Quantity: {product.qty}</p>
                  </div>
                </div>
                <p className='text-gray-500'>Rs. {product.rate}</p>
              </div>
            ))
          ) : (
            <p className='text-sm text-red-500'>No data found..</p>
          )}
        </div>
      </div>
      {isProducts ? (
        <div className='w-full'>
          <Button
            label='Add product'
            className='w-full mt-3'
            onClick={onSubmitProduct}
          />
        </div>
      ) : (
        <button
          className='text-primary-500 py-4 text-center w-full font-bold text-base'
          onClick={onAddNew}
        >
          Add New
        </button>
      )}
    </div>
  );
};
