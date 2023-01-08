import { useDispatch, useSelector } from "react-redux";

import ALink from "~/src/components/features/alink";

import { cartPriceTotal } from "~/src/utils/shared/index";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { getCart } from "~/src/store/cart";

function CartMenu(props) {
  const { cartList } = props;
  console.log({ cartList });

  const getCartTotalPrice = (cart) => {
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].discountedPrice) total += cart[i].discountedPrice;
      else total += cart[i].price;
    }
    return total;
  };

  return (
    <div className="dropdown cart-dropdown">
      <ALink
        href="/shop/cart"
        className="dropdown-toggle"
        role="button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
        data-display="static"
      >
        <i className="icon-shopping-cart"></i>
        <span className="cart-count">{cartList.length}</span>
      </ALink>

      <div
        className={`dropdown-menu dropdown-menu-right ${
          cartList.length === 0 ? "text-center" : ""
        }`}
      >
        {0 === cartList.length ? (
          <p>No products in the cart.</p>
        ) : (
          <>
            <div className="dropdown-cart-products">
              {cartList.map((item, index) => (
                <div className="product justify-content-between" key={index}>
                  <div className="product-cart-details">
                    <h4 className="product-title">
                      <ALink href={`/product/default/${item.slug}`}>
                        {item.name}
                      </ALink>
                    </h4>

                    <span className="cart-product-info">
                      <span className="cart-product-qty">{item.count} </span>x $
                      {item.discountedPrice
                        ? item.discountedPrice.toFixed(2)
                        : item.price.toFixed(2)}
                    </span>
                  </div>

                  <button
                    className="btn-remove"
                    title="Remove Product"
                    onClick={() => props.removeFromCart(item)}
                  >
                    <i className="icon-close"></i>
                  </button>
                </div>
              ))}
            </div>
            <div className="dropdown-cart-total">
              <span>Total</span>

              <span className="cart-total-price">
                ${getCartTotalPrice(cartList)}
              </span>
            </div>

            <div className="dropdown-cart-action">
              <ALink href="/shop/cart" className="btn btn-primary">
                View Cart
              </ALink>
              <ALink
                href="/shop/checkout"
                className="btn btn-outline-primary-2"
              >
                <span>Checkout</span>
                <i className="icon-long-arrow-right"></i>
              </ALink>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CartMenu;
