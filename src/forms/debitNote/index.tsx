import { createColumnHelper } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Input,
  Dropdown,
  Table,
  Button,
  SimpleModal,
  ProductSearch,
} from "../../components";
import { suplierOptions } from "../../utils/data";
import NewProduct from "../newProduct";

const columnHelper = createColumnHelper<any>();

const DebitNoteForm = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openProductModal, setOpenProductModal] = useState(false);

  const { register, control } = useForm();
  const { register: registerSearch } = useForm();

  const columns = useMemo(
    () => [
      columnHelper.accessor("name", {
        id: "name",
        cell: (info) => (
          <div className='lg:min-w-[300px]'>{info.getValue()}</div>
        ),
        header: "Name",
      }),
      columnHelper.accessor("cast", {
        id: "cast",
        cell: (info) => info.getValue(),
        header: "Cast",
      }),
      columnHelper.accessor("age", {
        id: "age",
        cell: (info) => info.getValue(),
        header: "age",
      }),
      columnHelper.accessor((row: any) => row.courseCode, {
        id: "courseCode",
        cell: (info) => info.getValue(),
        header: "courseCode",
      }),
      columnHelper.accessor("action", {
        id: "action",
        cell: (info) => (
          <div>
            <Button
              label='Add'
              buttonType='link'
              onClick={() => setOpenModal(true)}
            />
          </div>
        ),
        header: "Action",
      }),
    ],
    []
  );

  const data = [
    {
      name: "sadfasd",
      courseCode: 23424,
      cast: "hindu",
      age: 23,
    },
    {
      name: "sadfasd",
      courseCode: 23424,
      cast: "hindu",
      age: 23,
    },
    {
      name: "sadfasd",
      courseCode: 23424,
      cast: "hindu",
      age: 23,
    },
    {
      name: "sadfasd",
      courseCode: 23424,
      cast: "hindu",
      age: 23,
    },
  ];

  return (
    <>
      <div className=' p-4 '>
        <div className='grid md:grid-cols-2  grid-cols-1 gap-x-5 '>
          <Dropdown
            label='Supplier Name'
            name='supplierName'
            placeholder='Eg: Global  Corporation'
            control={control}
            options={suplierOptions}
          />
          <Input label='Date' name='date' type='date' register={register} />
          <Input
            label='Reference'
            name='reference'
            placeholder='Enter reference'
            register={register}
          />
        </div>
        <div className='py-3'>
          <Table columns={columns} data={data} />
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
            <p className='text-sm text-gray-400'>*This will appear on print</p>
          </div>
          <div className='flex flex-col gap-4 text-gray-800 md:px-14'>
            <div className='flex justify-between'>
              <p>Total</p>
              <p>0</p>
            </div>
            <div className='flex justify-between'>
              <p>Discount</p>
              <p>0</p>
            </div>
            <div className='flex justify-between'>
              <p>Non-taxable Total</p>
              <p>0</p>
            </div>
            <div className='flex justify-between'>
              <p>Taxable Total</p>
              <p>0</p>
            </div>
            <div className='flex justify-between'>
              <p>VAT</p>
              <p>0</p>
            </div>
            <div className='flex justify-between border-t font-medium border-gray-600 pt-2'>
              <p>Grand Total</p>
              <p>0</p>
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
          />
        </div>
        <div className='flex justify-end py-4'>
          <Button label='Save' className='' />
        </div>
      </div>
      <SimpleModal show={openModal} onModalClose={() => setOpenModal(false)}>
        <ProductSearch onAddNew={() => setOpenProductModal(true)} />
      </SimpleModal>

      <SimpleModal
        show={openProductModal}
        onModalClose={() => setOpenProductModal(false)}
        title="Add New Product"
      >
        <NewProduct />
      </SimpleModal>
    </>
  );
};

export default DebitNoteForm;
