import { useEffect, useMemo } from "react";
import { ADD_PERSISITED_DATA } from "../features/products/productsSlice";
import { useDispatch, useSelector } from "react-redux";
import { Button, IState, Table } from "../components";
import { Link } from "react-router-dom";
import { createColumnHelper } from "@tanstack/react-table";
import { IDebitNote } from "../utils/validation";
import clsx from "clsx";

const columnHelper = createColumnHelper<IDebitNote>();
const Home = () => {
  const dispatch = useDispatch();

  const debitNotesData = useSelector(
    (state: IState) => state?.ProductReducer?.debitNotes
  );
  const productsData = useSelector(
    (state: IState) => state?.ProductReducer?.products
  );

  useEffect(() => {
    const products = localStorage.getItem("products");
    const dabitNotes = localStorage.getItem("debitNotes");
    if (
      (dabitNotes && !debitNotesData?.length) ||
      (products && !productsData?.length)
    ) {
      dispatch(
        ADD_PERSISITED_DATA({
          products: products ? JSON.parse(products) : [],
          debitNotes: dabitNotes ? JSON.parse(dabitNotes) : [],
        })
      );
    }
  }, []);

  const columns = useMemo(
    () => [
      columnHelper.accessor("supplierName", {
        id: "productName",
        cell: (info) => <div className=''>{info.getValue()?.label}</div>,
        header: "Supplier Name",
      }),
      columnHelper.accessor("reference", {
        id: "qty",
        cell: (info) => info.getValue(),
        header: "Reference",
      }),
      columnHelper.accessor("date", {
        id: "Date",
        cell: (info) => info.getValue(),
        header: "Date",
      }),
      columnHelper.accessor("note", {
        id: "note",
        cell: (info) => info.getValue(),
        header: "Note",
      }),
      columnHelper.accessor("termsCondition", {
        id: "termsCondition",
        cell: (info) => `${info.getValue()}`,
        header: "Terms & Condition",
      }),
      columnHelper.accessor("products", {
        id: "products",
        cell: (info) => {
          return (
            <div className='flex gap-2 items-center'>
              {info.getValue()?.map((el) => (
                <p
                  key={el.productName}
                  className='px-2 py-2 bg-green-500 rounded-md font-semibold text-white'
                >
                  {el.productName}
                </p>
              ))}
            </div>
          );
        },

        header: "Products",
      }),
      columnHelper.accessor("products", {
        id: "products.description",
        cell: (info) => {
          return (
            <div className='flex flex-col  items-start'>
              {info.getValue()?.map((el) => (
                <p key={el.productName} className='flex gap-2'>
                  <>
                    <span className='font-bold'>{el.productName} :</span>
                    <span
                      className={clsx("", { "text-red-500": !el?.description })}
                    >
                      {el.description || "-"}
                    </span>
                  </>
                </p>
              ))}
            </div>
          );
        },

        header: "Product Description",
      }),
    ],
    [debitNotesData]
  );

  return (
    <div className='flex flex-col gap-4 '>
      <Link to='/debit-note'>
        <Button label='Add New Dabit Note' />
      </Link>
      <div className='overflow-x-scroll'>
        <Table
          columns={columns}
          data={debitNotesData || []}
          noDataMessage={!debitNotesData?.length ? "No data.." : ""}
        />
      </div>
    </div>
  );
};

export default Home;
