import { ShoppingCartIcon } from "@heroicons/react/20/solid";
import NavigationBar from "../components/ui/navigationBar";
import ProductCard from "../components/ui/productCard";
import Cart from "../components/ui/cart";
import { useEffect, useState } from "react";
import { ADD_PERSISITED_DATA } from "../features/products/productsSlice";
import { useDispatch } from "react-redux";
import Toast from "../components/ui/customToast";

const Home = () => {
  const [showCart, setShowCart] = useState(false);
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

  const closeCart = () => {
    setShowCart(false);
  };
  const toggleCart = () => {
    setShowCart(!showCart);
  };

  return (
    <div>
      <div style={{ zIndex: 1 }} onClick={closeCart}>
        <NavigationBar />
        <ProductCard />
      </div>
      <div
        className='cartCircleContainer'
        onClick={toggleCart}
        style={{ zIndex: 2 }}
      >
        <ShoppingCartIcon className='cartIcon' />
      </div>
      {showCart && <Cart />}
    </div>
  );
};

export default Home;
