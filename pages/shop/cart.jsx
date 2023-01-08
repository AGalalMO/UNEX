import React, { useState, useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";

import ALink from "~/src/components/features/alink";
import Qty from "~/src/components/features/qty";
import PageHeader from "~/src/components/features/page-header";

import { actions as cartAction } from "~/store/cart";
import { cartPriceTotal } from "~/src/utils/shared/index";
import Layout from "~/src/components/layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { APIS } from "~/src/utils/ServiceUrls";
import { getCart } from "~/src/store/cart";
import axiosInstance from "~/src/utils/axios/axiosInstance";

function Cart (props) {
  const dispatch = useDispatch();
  const [cartList, setCartList] = useState([]);
  const [shippingCost, setShippingCost] = useState(0);
  const cartItems = useSelector((state) => state.cart.cartList);

  useEffect(() => {
    setCartList(cartItems);
  }, [cartItems]);

  function onChangeShipping (value) {
    setShippingCost(value);
  }

  const getCartTotalPrice = (cart) => {
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].discountedPrice) total += cart[i].discountedPrice;
      else total += cart[i].price;
    }
    return total;
  };

  async function changeQty (value, id) {
    await axiosInstance.post(APIS.CART.UPDATE, null, {
      params: {
        id,
        count: value,
      },
    });
    dispatch(getCart());
  }

  function updateCart (e) {
    let button = e.currentTarget;
    button.querySelector(".icon-refresh").classList.add("load-more-rotating");

    setTimeout(() => {
      props.updateCart(cartList);
      button
        .querySelector(".icon-refresh")
        .classList.remove("load-more-rotating");
    }, 400);
  }

  const removeFromCart = async (id) => {
    await axiosInstance.post(APIS.CART.DELETE, null, {
      params: {
        id,
      },
    });
    dispatch(getCart());
  };

  return (
    <Layout>
      <div className="main">
        <PageHeader title="Shopping Cart" subTitle="Shop" />
        <nav className="breadcrumb-nav">
          <div className="container">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <ALink href="/">Home</ALink>
              </li>
              <li className="breadcrumb-item">
                <ALink href="/shop/sidebar/list">Shop</ALink>
              </li>
              <li className="breadcrumb-item active">Shopping Cart</li>
            </ol>
          </div>
        </nav>

        <div className="page-content pb-5">
          <div className="cart">
            <div className="container">
              {true ? (
                <div className="row">
                  <div className="col-lg-9">
                    <table className="table table-cart table-mobile">
                      <thead>
                        <tr>
                          <th style={{textAlign:'start',width:'33%'}}>Product</th>
                          <th style={{textAlign:'start',width:'20%'}}>Price</th>
                          <th style={{textAlign:'start',width:'20%'}}>Quantity</th>
                          <th style={{textAlign:'start',width:'26%'}}>Total</th>
                          <th></th>
                        </tr>
                      </thead>

                      <tbody>
                        {cartList.length > 0 ? (
                          cartList.map((item, index) => (
                            <tr key={index}>
                              <td style={{ textAlign: 'start', width: '33%',marginInlineEnd:'5px' }}  className="product-col">
                                <div className="product" style={{paddingInlineStart:'0px'}}>
                                  <h4 className="product-title">
                                    {item.name} sdfsdf
                                  </h4>
                                </div>
                              </td>

                              <td style={{ textAlign: 'start', width: '20%', marginInlineEnd: '5px' }} className="price-col">
                                EGP{" "}
                                {item.discountedPrice
                                  ? item.discountedPrice.toLocaleString(
                                    undefined,
                                    {
                                      minimumFractionDigits: 2,
                                      maximumFractionDigits: 2,
                                    }
                                  )
                                  : item.price.toLocaleString(undefined, {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                  })}
                              </td>

                              <td style={{ textAlign: 'start', width: '20%', marginInlineEnd: '5px' }} className="quantity-col">
                                <Qty
                                  value={item.count}
                                  changeQty={(current) =>
                                    changeQty(current, item.cartId)
                                  }
                                  adClass="cart-product-quantity"
                                ></Qty>
                              </td>

                              <td style={{ textAlign: 'start', width: '26%', marginInlineEnd: '5px' }} className="total-col">
                                {(
                                  item.discountedPrice * item.count
                                ).toLocaleString(undefined, {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                })}
                              </td>

                              <td className="remove-col">
                                <button
                                  className="btn-remove"
                                  onClick={() => removeFromCart(item.cartId)}
                                >
                                  <i className="icon-close"></i>
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td>
                              <p className="pl-2 pt-1 pb-1">
                                {" "}
                                No Products in Cart{" "}
                              </p>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                  <aside className="col-lg-3">
                    <div className="summary summary-cart">
                      <h3 className="summary-title">Cart Total</h3>

                      <table className="table table-summary">
                        <tbody>
                          <tr className="summary-subtotal">
                            <td>Subtotal:</td>
                            <td>EGP {getCartTotalPrice(cartList)}</td>
                          </tr>
                          <tr className="summary-shipping">
                            <td>Shipping:</td>
                            <td>&nbsp;</td>
                          </tr>

                          <tr className="summary-shipping-row">
                            <td>
                              <div className="custom-control custom-radio">
                                <input
                                  type="radio"
                                  id="free-shipping"
                                  name="shipping"
                                  className="custom-control-input"
                                  onChange={(e) => onChangeShipping(0)}
                                  defaultChecked={true}
                                />
                                <label
                                  className="custom-control-label"
                                  htmlFor="free-shipping"
                                >
                                  Free Shipping
                                </label>
                              </div>
                            </td>
                            <td>EGP 0.00</td>
                          </tr>

                          <tr className="summary-shipping-row">
                            <td>
                              <div className="custom-control custom-radio">
                                <input
                                  type="radio"
                                  id="standard-shipping"
                                  name="shipping"
                                  className="custom-control-input"
                                  onChange={(e) => onChangeShipping(10)}
                                />
                                <label
                                  className="custom-control-label"
                                  htmlFor="standard-shipping"
                                >
                                  Standard:
                                </label>
                              </div>
                            </td>
                            <td>EGP 10.00</td>
                          </tr>

                          <tr className="summary-shipping-row">
                            <td>
                              <div className="custom-control custom-radio">
                                <input
                                  type="radio"
                                  id="express-shipping"
                                  name="shipping"
                                  className="custom-control-input"
                                  onChange={(e) => onChangeShipping(20)}
                                />
                                <label
                                  className="custom-control-label"
                                  htmlFor="express-shipping"
                                >
                                  Express:
                                </label>
                              </div>
                            </td>
                            <td>EGP 20.00</td>
                          </tr>

                          <tr className="summary-shipping-estimate">
                            <td>
                              Estimate for Your Country
                              <br />{" "}
                              <ALink href="/shop/dashboard">
                                Change address
                              </ALink>
                            </td>
                            <td>&nbsp;</td>
                          </tr>

                          <tr className="summary-total">
                            <td>Total:</td>
                            <td>EGP {getCartTotalPrice(cartList)}</td>
                          </tr>
                        </tbody>
                      </table>

                      <ALink
                        className="btn btn-outline-primary-2 btn-order btn-block"
                        href="/shop/checkout"
                      >
                        PROCEED TO CHECKOUT
                      </ALink>
                    </div>

                    <ALink
                      href="/shop/sidebar/list"
                      className="btn btn-outline-dark-2 btn-block mb-3"
                    >
                      <span>CONTINUE SHOPPING</span>
                      <i className="icon-refresh"></i>
                    </ALink>
                  </aside>
                </div>
              ) : (
                <div className="row">
                  <div className="col-12">
                    <div className="cart-empty-page text-center">
                      <i
                        className="cart-empty icon-shopping-cart"
                        style={{ lineHeight: 1, fontSize: "15rem" }}
                      ></i>
                      <p className="px-3 py-2 cart-empty mb-3">
                        No products added to the cart
                      </p>
                      <p className="return-to-shop mb-0">
                        <ALink
                          href="/shop/sidebar/list"
                          className="btn btn-primary"
                        >
                          RETURN TO SHOP
                        </ALink>
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "about"])),
    },
  };
};

export default Cart;
