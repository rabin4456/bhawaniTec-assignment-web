import { createColumnHelper } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Input,
  Dropdown,
  Table,
  Button,
  SimpleModal,
  ProductSearch,
  GlobalModal,
} from "../../components";
import { suplierOptions } from "../../utils/data";
import NewProduct from "../newProduct";
import { zodResolver } from "@hookform/resolvers/zod";
import { DebitNoteSchema, IDebitNote, TProduct } from "../../utils/validation";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useDispatch } from "react-redux";
import { ADD_DEBIT_NOTE } from "../../features/products/productsSlice";

interface TTableProduct extends TProduct {
  amount?: string;
}

const columnHelper = createColumnHelper<TTableProduct>();

const DebitNoteForm = (props: {
  onSuccess: () => void;
  isInModal: boolean;
}) => {
  const dispatch = useDispatch();

  const [openModal, setOpenModal] = useState(false);
  const [openProductModal, setOpenProductModal] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    watch,
    setError,
    getValues,
  } = useForm<IDebitNote>({
    resolver: zodResolver(DebitNoteSchema),
  });

  const closeProductModal = () => {
    setOpenProductModal(false);
  };

  const closeSearchModal = () => {
    setOpenModal(false);
  };

  const onSubmit: SubmitHandler<IDebitNote> = () => {
    if (!watch("products")?.length) {
      setError("products", { message: "Please select at least one product*" });
      return;
    }
    dispatch(ADD_DEBIT_NOTE(getValues()));
    GlobalModal.close();
    props.onSuccess();
  };

  const handleRemove = (name: string) => {
    const tempArr = watch("products")?.filter((el) => el.productName !== name);
    setValue("products", tempArr);
  };

  const total = useMemo(() => {
    if (watch("products")?.length) {
      let total = 0;
      watch("products")?.forEach((item) => {
        total += parseInt(item.qty) * parseFloat(item.rate);
      });

      return total;
    }
  }, [JSON.stringify(watch("products"))]);

  const discount = useMemo(() => {
    if (watch("products")?.length) {
      let discount = 0;
      watch("products")?.forEach((item) => {
        discount += parseInt(item.discount);
      });

      return discount;
    }
  }, [JSON.stringify(watch("products"))]);

  const tax = useMemo(() => {
    if (watch("products")?.length) {
      let tax = 0;
      watch("products")?.forEach((item) => {
        tax +=
          (parseInt(item.tax) / 100) *
          (parseInt(item.qty) * parseFloat(item.rate) -
            parseInt(item.discount));
      });

      return tax;
    }
  }, [JSON.stringify(watch("products"))]);

  const columns = useMemo(
    () => [
      columnHelper.accessor("productName", {
        id: "productName",
        cell: (info) => (
          <div className='lg:min-w-[300px] flex flex-col '>
            {info.getValue()}
            <input
              type='text'
              placeholder='description'
              className='appearance-none w-full border-b border-dashed	border-gray-400 py-2    focus:outline-none focus:ring-0 focus:ring-neutral-0 focus:border-neutral-0'
              {...register(`products.${info.row.index}.description`)}
            />
          </div>
        ),
        header: "Item/Product",
      }),
      columnHelper.accessor("qty", {
        id: "qty",
        cell: (info) => {
          return (
            <input
              type='number'
              className='appearance-none border-b border-dashed	border-gray-400 pb-8   w-16 focus:outline-none focus:ring-0 focus:ring-neutral-0 focus:border-neutral-0'
              {...register(`products.${info.row.index}.qty`)}
            />
          );
        },
        header: "Qty",
      }),
      columnHelper.accessor("rate", {
        id: "rate",
        cell: (info) => {
          return (
            <input
              type='number'
              className='appearance-none border-b border-dashed	border-gray-400 pb-8    w-16 focus:outline-none focus:ring-0 focus:ring-neutral-0 focus:border-neutral-0'
              {...register(`products.${info.row.index}.rate`)}
            />
          );
        },
        header: "Rate",
      }),
      columnHelper.accessor("discount", {
        id: "discount",
        cell: (info) => {
          return (
            <input
              type='number'
              className='appearance-none border-b border-dashed	border-gray-400 pb-8    w-16 focus:outline-none focus:ring-0 focus:ring-neutral-0 focus:border-neutral-0'
              {...register(`products.${info.row.index}.discount`)}
            />
          );
        },
        header: "Discount",
      }),
      columnHelper.accessor("tax", {
        id: "tax",
        cell: (info) => `${info.getValue()}%`,
        header: "Tax",
      }),
      columnHelper.accessor("amount", {
        id: "amount",
        cell: (info) => {
          return (
            <div className='flex justify-between items-center'>
              <p>
                {parseInt(info.row.original.qty) *
                  parseInt(info.row.original.rate)}
              </p>
              <XMarkIcon
                className='h-8 w-8 text-red-500 cursor-pointer'
                onClick={() => handleRemove(info.row.original.productName)}
              />
            </div>
          );
        },

        header: "Amount",
      }),
    ],
    [watch("products")]
  );

  return (
    <>
      <div className=' p-4 '>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='grid md:grid-cols-2  grid-cols-1 gap-x-5 '>
            <Dropdown
              label='Supplier Name'
              name='supplierName'
              placeholder='Eg: Global  Corporation'
              control={control as any}
              options={suplierOptions}
            />
            <Input
              label='Date'
              name='date'
              type='date'
              register={register}
              error={errors?.date?.message}
            />
            <Input
              label='Reference'
              name='reference'
              placeholder='Enter reference'
              register={register}
              error={errors?.reference?.message}
            />
          </div>
          <div className='py-3'>
            <Table
              columns={columns}
              showAddButton={true}
              buttonAction={() => setOpenModal(true)}
              data={watch("products") || []}
            />
            <p className='text-sm text-red-500 pt-1'>
              {errors?.products?.message}
            </p>
          </div>
          <div className='border-b border-neutral-100 py-5 grid  md:grid-cols-2  grid-cols-1 gap-5'>
            <div>
              <Input
                label='Note'
                name='note'
                type='textArea'
                placeholder='Enter notes'
                required={false}
                register={register}
              />
              <p className='text-sm text-gray-400'>
                *This will appear on print
              </p>
            </div>
            <div className='flex flex-col gap-4 text-gray-800 md:px-14'>
              <div className='flex justify-between'>
                <p>Total</p>
                <p>{total || "NAN"}</p>
              </div>
              <div className='flex justify-between'>
                <p>Discount</p>
                <p>{discount || "NAN"}</p>
              </div>
              <div className='flex justify-between'>
                <p>Non-taxable Total</p>
                <p>{total && discount ? total - discount : "NAN"}</p>
              </div>
              <div className='flex justify-between'>
                <p>Taxable Total</p>
                <p>{tax?.toFixed(2) || "NAN"}</p>
              </div>
              <div className='flex justify-between'>
                <p>VAT (13%)</p>
                <p>
                  {total && discount && tax
                    ? ((13 / 100) * (total - discount + tax))?.toFixed(2)
                    : "NAN"}
                </p>
              </div>
              <div className='flex justify-between border-t font-medium border-gray-600 pt-2'>
                <p>Grand Total</p>
                <p>
                  {total && discount && tax
                    ? (
                        total -
                        discount +
                        tax +
                        (13 / 100) * (total - discount + tax)
                      )?.toFixed(2)
                    : "NAN"}
                </p>
              </div>
            </div>
          </div>
          <div className='border-b border-neutral-100 pb-4 mt-8 '>
            <h1 className='text-lg'>Custom Fields</h1>
          </div>
          <div className='py-4'>
            <Input
              label='Terms & condition'
              name='termsCondition'
              type='textArea'
              placeholder='Enter terms & conditions'
              required={false}
              register={register}
              error={errors?.termsCondition?.message}
            />
          </div>
          <div className='flex justify-end py-4'>
            <Button label='Save' type='submit' disabled={!isValid} />
          </div>
        </form>
      </div>

      <SimpleModal show={openModal} onModalClose={() => setOpenModal(false)}>
        <ProductSearch
          onAddNew={() => setOpenProductModal(true)}
          onAddProduct={closeSearchModal}
          setProduct={setValue as any}
        />
      </SimpleModal>

      <SimpleModal
        show={openProductModal}
        onModalClose={() => setOpenProductModal(false)}
        title='Add New Product'
      >
        <NewProduct onAddSuccess={closeProductModal} />
      </SimpleModal>
    </>
  );
};

export default DebitNoteForm;
