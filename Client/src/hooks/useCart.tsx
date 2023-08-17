import { message } from "antd";
import { useStoreCart } from "../store/hooks";
import { addToCart, getCart } from "../service/cart.service";
import { IProduct } from "../types/products";

type IAddCartService = {
  product: IProduct;
  sizeId: string;
  quantity: number;
  inStock: number;
  price: number;
  productId: string;
};
export const useCart =()=>{

const handleAddCart = (props: IAddCartService) => {
  const [messageApi] = message.useMessage();
  const { cart, dispatch } = useStoreCart();
  const accessToken = JSON.parse(localStorage.getItem("accessToken")!);
  if (!accessToken) {
    messageApi.open({
      type: "error",
      content: "Please log in!",
    });
    return;
  }
  if (!props.sizeId) {
    messageApi.open({
      type: "error",
      content: "Please choose a size(ml)!",
    });
    return;
  }
  getCart().then(({ data }) => {
    dispatch({
      type: "GET_CART",
      payload: data.cart,
    });
  });
  if (cart?.products) {
    const productExist = cart.products.find(
      (item: any) =>
        item.productId._id === props.product?._id &&
        item.sizeId._id === props.sizeId
    );
    if (productExist) {
      if (props.quantity > props.inStock - productExist.quantity) {
        messageApi.open({
          type: "error",
          content:
            "Maximum quantity reached. You cannot add more items to your cart!",
        });
        return;
      }
    }
  }
  if (!props.quantity || props.quantity === 0) {
    messageApi.open({
      type: "error",
      content: "Please check the quantity!",
    });
    return;
  }

  if (props.sizeId) {
    const data = {
      productId: props.productId,
      price: props.price,
      quantity: props.quantity,
      sizeId: props.sizeId,
    };
    addToCart(data)
      .then(() => {
        getCart().then(({ data }) => {
          dispatch({
            type: "GET_CART",
            payload: data.cart,
          });
        });
        messageApi.open({
          type: "success",
          content: "Add to Cart successfully",
        });
      })
      .catch(({ response }) => {
        alert(response.data.message);
      });
  }
};
 return {handleAddCart}
}