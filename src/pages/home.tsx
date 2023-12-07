import { useEffect } from "react";
import { ADD_PERSISITED_DATA } from "../features/products/productsSlice";
import { useDispatch } from "react-redux";
import { Button, GlobalModal, Input, ProductSearch } from "../components";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

const Home = () => {
  const dispatch = useDispatch();

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

  const { register: registerSearch } = useForm();

  const openProductSearchModal = ({ props }: { props?: Record<any, any> }) => {
    GlobalModal.open({
      component: ProductSearch,
      headerClassName: "z-[99999] bg-white  ",
      headerComponent: () => (
        <div className=' '>
          <Input
            name='search'
            type='search'
            placeHolder='Search product'
            register={registerSearch}
          />
        </div>
      ),
      modalSize: "screen",
      position: "bottom",
      hideCloseIcon: true,
      contentClassName: "px-4 w-auto !important h-[100vh]",
      props: { ...props },
    });
  };

  return (
    <div className='flex flex-col gap-4 items-center'>
      <p>This is home Page.</p>
      <Link to='/debit-note'>
        <Button label='Add New Dabit Note' />
      </Link>
      <Button label='Add' onClick={()=>openProductSearchModal({})} />

    </div>
  );
};

export default Home;
