import { InputNumber,message } from 'antd';
import './cart.css';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react";
import { scrollToTop } from '../../../service/config.service';
import { useStoreCart } from '../../../store/hooks';
import { getCart, removeProductInCart, updateCart } from '../../../service/cart.service';

const Cart = () => {
  const navigate = useNavigate();
  const userId = JSON.parse(localStorage.getItem('userId')!);
  const { cart, dispatch } = useStoreCart();
  // const [messageApi, contextHolder] = message.useMessage();
  useEffect(() => {
    if (!userId) {
      navigate("/auth/login");
    }
  }, []);

  useEffect(() => {
    getCart(userId)
      .then(({ data }) => {
        dispatch({
          type: "GET_CART",
          payload: data.cart
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const updateQuantity = async (quantity: number, id: string, sizeId: string) => {
    console.log(quantity);
    if(quantity==null){
      quantity = 1
    }
    const checkCount = cart.products.find((item: any) => item._id === id);
    const check = checkCount.productId.sizes.find((item: any) => item.sizeId === sizeId);
    const { inStock } = check; 
    if (quantity > inStock) {
      quantity = inStock;
      // messageApi.open({
      //   type: 'error',
      //   content: 'Quantity limited in Stock',
      // });
      toast.error("Quantity limited in Stock.");
    }
    const data = {
      quantity,
      userId,
    };

    try {
      await updateCart(id, data);
      const { data: updatedCartData } = await getCart(userId);
      dispatch({
        type: "GET_CART",
        payload: updatedCartData.cart
      });
    } catch (error) {
      console.log('Error updating cart:', error);
    }
  };

  const removeInCart = async (id: string) => {
    removeProductInCart(id, userId);
    dispatch({
      type: "DELETE_PRODUCT_IN_CART",
      payload: id
    });
  };

  return (
    <div>
      <ToastContainer></ToastContainer>
      <div className="cart-main">
        {cart?.products?.length > 0 ? (
          <div id="show-cart">
            <h3>Shopping Bag</h3>
            <table id='cart'>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Image</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Sum</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.products?.map((item: any) => {
                  let sum = item.price * item.quantity;
                  return (
                    <tr key={item._id}>
                      <td>{item.productId.name}<p style={{ color: "#015E6B", fontWeight: "bold" }}>( {item.sizeId.name} )</p></td>
                      <td><Link to={`/product/${item.productId._id}`} ><img src={item.productId.image} alt="" /></Link></td>
                      <td style={{ color: "#fca120" }}> ${item.price}</td>
                      <td>
                        <InputNumber
                          min={1}
                          // max={item.sizeId.inStock} 
                          value={item.quantity} 
                          onChange={(quantity) => updateQuantity(quantity, item._id, item.sizeId._id)}
                        />
                      </td>
                      <td>${sum}</td>
                      <td>
                        <button className='btn-removeCart' onClick={() => removeInCart(item._id)}>
                          <i className="fa-regular fa-circle-xmark"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div id="checkout">
              <h3>TotalPrice: ${cart.totalPrice}</h3>
              <Link to="/checkout">
                <button>Checkout</button>
              </Link>
            </div>
          </div>
        ) : (
          <div className='cart-err'>   
            <img src="https://bizweb.dktcdn.net/100/331/465/themes/684469/assets/empty-bags.jpg?1541753997372" alt="" /> <br />
            <Link to="/products">
              <Button onClick={() => scrollToTop()}>GO TO WHICH SHOP?</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;