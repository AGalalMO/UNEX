import { useEffect } from "react";

import Accordion from "~/src/components/features/accordion/accordion";
import Card from "~/src/components/features/accordion/card";
import PageHeader from "~/src/components/features/page-header";
import { useDispatch, useSelector } from "react-redux";

import ALink from "~/src/components/features/alink";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { getCart } from "~/src/store/cart";
import { APIS } from "~/src/utils/ServiceUrls";
import axiosInstance from "~/src/utils/axios/axiosInstance";
import { useState } from "react";
import { useRouter } from "next/router";

function Checkout(props) {
  const dispatch = useDispatch();
  const router = useRouter();
  const cartlist = useSelector((state) => state.cart.cartList);
  const [userData, setUserData] = useState({
    Address: "",
    City: "",
    PostalCode: "",
    Email: "",
    PhoneNumber: "",
  });

  const getCartTotalPrice = (cart) => {
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].discountedPrice)
        total += cart[i].discountedPrice * cart[i].count;
      else total += cart[i].price * cart[i].count;
    }
    return total;
  };

  const updateUserData = (event) => {
    setUserData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const placeOrder = async () => {
    event.preventDefault();
    await axiosInstance.post(APIS.ORDER.PLACE_ORDER, userData, {
      params: {
        token: localStorage.getItem("accessToken"),
      },
    });
    router.push("/");
  };

  useEffect(() => {
    dispatch(getCart());
  }, []);

  return (
    <div className="main">
      <PageHeader title="Checkout" subTitle="Shop" />
      <nav className="breadcrumb-nav">
        <div className="container">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <ALink href="/">Home</ALink>
            </li>
            <li className="breadcrumb-item">
              <ALink href="/shop/sidebar/list">Shop</ALink>
            </li>
            <li className="breadcrumb-item active">Checkout</li>
          </ol>
        </div>
      </nav>

      <div className="page-content">
        <div className="checkout">
          <div className="container">
            <form action="#">
              <div className="row">
                <div className="col-lg-9">
                  <h2 className="checkout-title">Billing Details</h2>
                  <div className="row">
                    <div className="col-sm-12">
                      <label>Email *</label>
                      <input
                        type="text"
                        className="form-control"
                        name="Email"
                        required
                        onChange={updateUserData}
                      />
                    </div>

                    <div className="col-sm-12">
                      <label>Mobile Number *</label>
                      <input
                        type="text"
                        maxLength={11}
                        className="form-control"
                        required
                        name="PhoneNumber"
                        onChange={updateUserData}
                      />
                    </div>
                  </div>

                  <label>City *</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    name="City"
                    onChange={updateUserData}
                  />

                  <label> Postal Code *</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    name="PostalCode"
                    onChange={updateUserData}
                  />

                  <label> Address *</label>
                  <textarea
                    type="text"
                    className="form-control"
                    placeholder="House number and Street name"
                    required
                    name="Address"
                    onChange={updateUserData}
                  />
                </div>

                <aside className="col-lg-3">
                  <div className="summary">
                    <h3 className="summary-title">Your Order</h3>

                    <table className="table table-summary">
                      <thead>
                        <tr>
                          <th>Product</th>
                          <th>Total</th>
                        </tr>
                      </thead>

                      <tbody>
                        {cartlist?.map((item, index) => (
                          <tr key={index}>
                            <td>
                              {" "}
                              <ALink href={`/product/default/${item.slug}`}>
                                {item.name}
                              </ALink>
                            </td>
                            <td>
                              {item.discountedPrice
                                ? item.discountedPrice * item.count
                                : item.price * item.count}
                            </td>
                          </tr>
                        ))}
                        <tr className="summary-subtotal">
                          <td>Subtotal:</td>
                          <td>
                            EGP{" "}
                            {getCartTotalPrice(cartlist).toLocaleString(
                              undefined,
                              {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              }
                            )}
                          </td>
                        </tr>
                        <tr>
                          <td>Shipping:</td>
                          <td>Free Shipping</td>
                        </tr>
                        <tr className="summary-total">
                          <td>Total:</td>
                          <td>
                            EGP{" "}
                            {getCartTotalPrice(cartlist).toLocaleString(
                              undefined,
                              {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              }
                            )}
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <Accordion type="checkout">
                      <Card disabled={true} title="Cash on delivery"></Card>
                    </Accordion>

                    <button
                      type="submit"
                      className="btn btn-outline-primary-2 btn-order btn-block"
                      onClick={placeOrder}
                    >
                      <span className="btn-text">Place Order</span>
                      <span className="btn-hover-text">Place Order</span>
                    </button>
                  </div>
                </aside>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "about"])),
    },
  };
};

export default Checkout;
