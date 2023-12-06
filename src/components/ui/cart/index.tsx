import { CheckIcon } from "@heroicons/react/20/solid";
import Button from "../button";
import { useDispatch, useSelector } from "react-redux";
import Checkbox from "../checkbox";
import {
  DECREASE_QUANTITY,
  INCREASE_QUANTITY,
  REMOVE_PRODUCTS_FROM_CART,
} from "../../../features/products/productsSlice";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: any) => state?.ProductReducer?.cart);
  const totalAmount = useSelector((state: any) => state?.ProductReducer?.total);
  const discount = useSelector((state: any) => state?.ProductReducer?.discount);

  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [infoState, setInfoState] = useState({
    discount: 0,
    total: 0,
  });

  const handleRemove = (id: number) => {
    dispatch(REMOVE_PRODUCTS_FROM_CART({ id }));
  };

  const onIncreaseQuantity = (id: number) => {
    dispatch(INCREASE_QUANTITY({ id }));
  };

  const onDecreaseQuantity = (id: number, quantity: number) => {
    dispatch(DECREASE_QUANTITY({ id }));

    //remove items from cart if quantity is less than zero
    if (quantity - 1 === 0) {
      dispatch(REMOVE_PRODUCTS_FROM_CART({ id }));
    }
  };

  const handleItemSelect = (e: any, item: any) => {
    let selected = e.target.checked;
    if (selected) {
      const discount =
        (item.discountPercentage / 100) * item?.price * item.quantity;
      const newDiscount = infoState.discount + discount;
      const newTotal = infoState.total + item?.price * item.quantity - discount;
      setInfoState({ total: newTotal, discount: newDiscount });
    } else {
      const discount =
        (item.discountPercentage / 100) * item?.price * item.quantity;
      const newDiscount = infoState.discount - discount;
      const newTotal =
        infoState.total - (item?.price * item.quantity - discount);
      setInfoState({ total: newTotal, discount: newDiscount });
    }

    if (selectedItems.includes(item.id)) {
      const tempData = selectedItems.filter((val) => val != item.id);
      setSelectedItems(tempData);
    } else if (!selectedItems.includes(item.id)) {
      const tempData = [...selectedItems, item.id];
      setSelectedItems(tempData);
    }
  };
 
  useEffect(() => {
    //resetting values
    if (!selectedItems?.length) {
      setInfoState({
        discount: 0,
        total: 0,
      });
    }
  }, [selectedItems, setInfoState]);

  const handleSubmit=()=>{
    toast.success("Order created successfully.")
    setSelectedItems([]);
  }
  return (
    <div className='cartContainer'>
      <div className='cartSubContainer'>
        <form style={{ marginTop: 15 }}>
          <section aria-labelledby='cart-heading'>
            <ul role='list' className='cartlistContainer'>
              {cartItems?.length ? (
                cartItems?.map((product: any) => (
                  <li key={product.id} className='cartProduct'>
                    <div>
                      <Checkbox
                        onClick={(e: any) => handleItemSelect(e, product)}
                        checked={selectedItems?.includes(product.id)}
                      />
                    </div>
                    <div className='cartImageContainer'>
                      <img
                        src={product?.images?.length && product?.images[0]}
                        alt={product.imageAlt}
                        className='cartImage'
                      />
                    </div>

                    <div className='cartItemContainer'>
                      <div>
                        <div className='justifyBetween'>
                          <h4 className='cartItemName'>{product?.title}</h4>
                          <p className='cartProductPrice'>${product.price}</p>
                        </div>
                        <p className='cartProductText'>{product?.brand}</p>
                        <p className='cartProductText'>
                          {product?.discountPercentage}% off
                        </p>
                        <div
                          style={{
                            display: "flex",
                            gap: 2,
                            alignItems: "center",
                          }}
                        >
                          {product?.stock && (
                            <CheckIcon
                              className='cartCheckIcon'
                              aria-hidden='true'
                            />
                          )}
                          <p className='cartProductText'>
                            {product?.stock - 1} in stock
                          </p>
                        </div>
                      </div>

                      <div className='cartFooterContainer'>
                        <div className='quantityContainer'>
                          <div
                            className='actionIconContainer'
                            onClick={() =>
                              !selectedItems.includes(product.id) &&
                              onDecreaseQuantity(product?.id, product.quantity)
                            }
                          >
                            <p className='actionIcon'>-</p>
                          </div>
                          <p className='qtyValue'>{product?.quantity}</p>
                          <div
                            className='actionIconContainer'
                            onClick={() =>
                              !selectedItems.includes(product.id) &&
                              onIncreaseQuantity(product.id)
                            }
                          >
                            <p className='actionIcon'>+</p>
                          </div>
                        </div>
                        {!selectedItems.includes(product.id) && (
                          <div>
                            <button
                              type='button'
                              className='cartButton'
                              onClick={() => handleRemove(product.id)}
                            >
                              <span>Remove</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </li>
                ))
              ) : (
                <div className='errorContainer'>
                  <p>No data added in cart..</p>
                </div>
              )}
            </ul>
          </section>

          {/* Order summary */}
          {cartItems?.length ? (
            <section
              aria-labelledby='summary-heading'
              style={{ marginTop: 20 }}
            >
              <div>
                <dl style={{ marginTop: 5, marginBottom: 5 }}>
                  <div className='cartSubTotalContainer'>
                    <dt className='cartTotalText'>Discount</dt>
                    <dd className='cartTotalText' style={{ marginLeft: 16 }}>
                      $
                      {infoState.discount
                        ? infoState.discount?.toFixed(2)
                        : discount?.toFixed(2)}
                    </dd>
                  </div>
                </dl>
                <dl style={{ marginTop: 5, marginBottom: 5 }}>
                  <div className='cartSubTotalContainer'>
                    <dt className='cartTotalText'>Total</dt>
                    <dd className='cartTotalText' style={{ marginLeft: 16 }}>
                      $
                      {infoState?.total
                        ? infoState?.total?.toFixed(2)
                        : totalAmount?.toFixed(2)}
                    </dd>
                  </div>
                </dl>
                <p className='cartInfotext'>
                  Shipping and taxes will be calculated at checkout.
                </p>
              </div>
              <div style={{ marginTop: 15 }}>
                <Button   label="Checkout" buttonType='secondary' onClick={handleSubmit}/>
              </div>
            </section>
          ) : null}
        </form>
      </div>
    </div>
  );
};

export default Cart;
