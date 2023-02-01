import { Stack } from "@mui/system";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import ALink from "~/src/components/features/alink";
import axiosInstance from "~/src/utils/axios/axiosInstance";
import { APIS } from "~/src/utils/ServiceUrls";
import { useDispatch, useSelector } from "react-redux";

function CartMenu(props) {
  const { t, i18n } = useTranslation(["common"]);
  const dispatch = useDispatch();

 
  const { cartList ,removeFromCart} = props;
  console.log({ cartList });
  const router = useRouter();
  const getCartTotalPrice = (cart) => {
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].discountedPrice) total += cart[i].discountedPrice;
      else total += cart[i].price;
    }
    return total;
  };

  return (
    <div className='dropdown cart-dropdown'>
      <ALink
        href='/shop/cart'
        className='dropdown-toggle'
        role='button'
        data-toggle='dropdown'
        aria-haspopup='true'
        aria-expanded='false'
        data-display='static'>
        <i className='icon-shopping-cart'></i>
        <span className='cart-count'>{cartList.length}</span>
      </ALink>
      <div
        className={`dropdown-menu dropdown-menu-right ${
          cartList.length === 0 ? "text-center" : ""
        }`}>
        {0 === cartList.length ? (
          <p>No products in the cart.</p>
        ) : (
          <>
            <div className='dropdown-cart-products'>
              {cartList.map((item, index) => (
                <div
                  style={{ position: "relative" }}
                  className='product justify-content-between'
                  key={index}>
                  <div
                    style={{ width: "100%" }}
                    className='product-cart-details'>
                    <h4 className='product-title'>
                      <ALink href={`/product/default/${item.slug}`}>
                        {item.name}
                      </ALink>
                    </h4>
                    <Stack
                      direction={"row"}
                      alignItems={"center"}
                      width={"100%"}
                      justifyContent='space-between'>
                      <span className='cart-product-info'>
                        <span className='cart-product-qty'>
                          X {item?.count}
                        </span>
                      </span>
                      <span className='cart-product-info'>
                        <span className='cart-product-qty'>
                          {item.discountedPrice
                            ? item.discountedPrice.toFixed(2)
                            : item.price.toFixed(2)}
                        </span>
                      </span>
                    </Stack>
                  </div>

                  <button
                    className='btn-remove'
                    style={{ position: "absolute", top: "20%" }}
                    title='Remove Product'
                    onClick={() => removeFromCart(item)}>
                    <i className='icon-close'></i>
                  </button>
                </div>
              ))}
            </div>
            <div className='dropdown-cart-total'>
              <span>{t("TOTAL", { ns: "common" })} : </span>

              <span className='cart-total-price'>
                {getCartTotalPrice(cartList)}
              </span>
            </div>

            <div className='dropdown-cart-action'>
              <ALink href='/shop/cart' className='btn btn-primary'>
                {t("VIEW_CART", { ns: "common" })}
              </ALink>
              <ALink
                href='/shop/checkout'
                className='btn btn-outline-primary-2'>
                <span style={{ marginInlineEnd: "10px" }}>
                  {t("CHECKOUT", { ns: "common" })}
                </span>
                <i
                  className={`icon-long-arrow-${
                    router.locale == "ar" ? "left" : "right"
                  }`}></i>
              </ALink>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CartMenu;
