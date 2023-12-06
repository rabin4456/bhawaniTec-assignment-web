import { ShoppingCartIcon } from "@heroicons/react/20/solid";
import NavigationBar from "../components/ui/navigationBar";
import { useEffect, useMemo, useState } from "react";
import { ADD_PERSISITED_DATA } from "../features/products/productsSlice";
import { useDispatch } from "react-redux";
import Toast from "../components/ui/customToast";
import { Input, Table } from "../components";
import { useForm } from "react-hook-form";
import Dropdown from "../components/ui/input/dropdown";
import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper<any>();

const Home = () => {
  const [showCart, setShowCart] = useState(false);
  const dispatch = useDispatch();

  const { register, control } = useForm();

  useEffect(() => {
    const data = localStorage.getItem("cartItems");
    const discount: any = localStorage.getItem("discount");
    const total: any = localStorage.getItem("total");
    if (data) {
      dispatch(
        ADD_PERSISITED_DATA({
          cart: JSON.parse(data),
          total: total,
          discount: discount,
        })
      );
    }
  }, []);

  const closeCart = () => {
    setShowCart(false);
  };
  const toggleCart = () => {
    setShowCart(!showCart);
  };

  const columns = useMemo(
    () => [
      columnHelper.accessor("name", {
        id: "name",
        cell: (info) => <div className="lg:min-w-[300px]">{info.getValue()}</div>,
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
    <div>
      <div className='z-10 fixed' onClick={closeCart}>
        <NavigationBar />
      </div>
      <div className='flex flex-col gap-10 p-20'>
        <Input
          name='awd'
          size='md'
          type='textArea'
          required
          placeholder='aad awd aw dawd'
          label='label'
          register={register}
        />
        <Input
          name='awd'
          size='md'
          required
          type='search'
          placeholder='aad awd aw dawd'
          label='label'
          register={register}
        />
        <Dropdown
          label='asdwdd'
          name='adfdw'
          control={control}
          options={[
            { label: "asd", value: "asdsd" },
            { label: "asasfasdd", value: "asdsdds" },
          ]}
        />
        <Table columns={columns} data={data} />
      </div>
    </div>
  );
};

export default Home;
