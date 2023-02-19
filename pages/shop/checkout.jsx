import { useEffect, useMemo } from "react";

import Accordion from "~/src/components/features/accordion/accordion";
import Card from "~/src/components/features/accordion/card";
import PageHeader from "~/src/components/features/page-header";
import { useDispatch, useSelector } from "react-redux";

import ALink from "~/src/components/features/alink";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { APIS } from "~/src/utils/ServiceUrls";
import axiosInstance from "~/src/utils/axios/axiosInstance";
import { useState } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import Layout from "~/src/components/layout";

function Checkout(props) {
  const { t } = useTranslation(["checkout", "common"]);
  const [submitted,setSubmitted]=useState(false)
  const router = useRouter();
  const [fees, setFees] = useState(50)
  const[required,setRequired]=useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [cities,setCities]=useState()
  const cartlist = useSelector((state) => state.cart.cartList);
  const [userData, setUserData] = useState({
    Address: "",
    City: "",
    PostalCode: "",
    Email: "",
    PhoneNumber: "",
  });

  const getCities = async () => {
    const response = await axiosInstance.get(APIS.UTILS.DELIVERY_CITIES)
    setCities(response.data)
  }
  useEffect(() => {
    getCities()
  },[])
  const getCartTotalPrice = (cart,isSub) => {
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].discountedPrice)
        total += cart[i].discountedPrice * cart[i].count;
      else total += cart[i].price * cart[i].count;
    }
    if(isSub)
      return total;
    else
      return parseInt(total) + parseInt(cities?.[fees]?.deliveryFees??0);
  };

  const updateUserData = (event) => {
    setUserData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };
  const goToProduct = (id) => {
    router.push(`/product/${id}`, null, { locale: router.locale });
  };
  const validation = useMemo(() => {
     if (
       userData.Address &&
       userData.City &&
       userData.Email &&
       userData.PhoneNumber
     )
       return true;
  
     else {
       setRequired(false)
       return false;
     }
  },[userData])


  const placeOrder = async (e) =>
  {
    e.preventDefault();
    if (!validation)
    {
      setRequired(true)
       return;
     }
    
    setSubmitted(true)
    await axiosInstance.post(
      APIS.ORDER.PLACE_ORDER,
      { ...userData, PostalCode: "12222", City: cities?.[fees]?.city },
      {
        params: {
          token: localStorage.getItem("accessToken"),
        },
      }
    );
    router.push("/");
  };

  return (
    <Layout>
      <div className='main'>
        <PageHeader
          title={t("CHECKOUT", { ns: "common" })}
          subTitle={t("SHOP", { ns: "common" })}
        />
        <nav className='breadcrumb-nav'>
          <div className='container'>
            <ol className='breadcrumb'>
              <li className='breadcrumb-item'>
                <ALink href='/'>{t("HOME", { ns: "common" })}</ALink>
              </li>
              <li className='breadcrumb-item'>
                <ALink
                  href={
                    router.locale == "ar" ? "/ar/shop/3cols" : "/shop/3cols"
                  }>
                  {t("SHOP", { ns: "common" })}
                </ALink>
              </li>
              <li className='breadcrumb-item active'>
                {t("CHECKOUT", { ns: "common" })}
              </li>
            </ol>
          </div>
        </nav>

        <div className='page-content'>
          <div className='checkout'>
            <div className='container'>
              <form action={placeOrder}>
                <div className='row'>
                  <div className='col-lg-9'>
                    <h2 className='checkout-title' style={{ display: "flex" }}>
                      {t("BILLING_DETAILS")}
                    </h2>
                    <div className='row'>
                      <div className='col-sm-12'>
                        <label style={{ display: "flex" }}>{t("EMAIL")}</label>
                        <input
                          style={{
                            border: required ? "1px solid red" : "none",
                          }}
                          type='email'
                          className={
                            !validation && submitted
                              ? "form-control22"
                              : "form-control"
                          }
                          name='Email'
                          required
                          onChange={updateUserData}
                        />
                      </div>

                      <div className='col-sm-12'>
                        <label style={{ display: "flex" }}>
                          {t("MOBILE_NUMBER")}
                        </label>
                        <input
                          style={{
                            border: required ? "1px solid red" : "none",
                          }}
                          type='text'
                          maxLength={11}
                          className={
                            !validation && submitted
                              ? "form-control22"
                              : "form-control"
                          }
                          required
                          name='PhoneNumber'
                          onChange={updateUserData}
                        />
                      </div>
                    </div>

                    <label style={{ display: "flex" }}>{t("CITY")}</label>
                    <select
                      style={{ border: required ? "1px solid red" : "none" }}
                      name='city'
                      className={
                        !validation && submitted
                          ? "form-control22"
                          : "form-control"
                      }
                      value={fees}
                      onChange={(e) => {
                        setFees(e.target.value);
                        setUserData({
                          ...userData,
                          City: cities[e.target.value]?.deliveryFees,
                        });
                      }}>
                      <option value=''>{t("CITY")}</option>
                      {cities?.map((item, index) => (
                        <option value={index} key={index}>
                          {item?.city}
                        </option>
                      ))}
                    </select>

                    <label style={{ display: "flex" }}>{t("ADDRESS")}</label>
                    <textarea
                      type='text'
                      style={{ border: required ? "1px solid red" : "none" }}
                      className={
                        !validation && submitted
                          ? "form-control22"
                          : "form-control"
                      }
                      required
                      name='Address'
                      onChange={updateUserData}
                    />
                  </div>

                  <aside className='col-lg-3'>
                    <div className='summary'>
                      <h3 className='summary-title' style={{ display: "flex" }}>
                        {t("YOUR_ORDER")}
                      </h3>

                      <table className='table table-summary'>
                        <thead>
                          <tr>
                            <th style={{ width: "50%", textAlign: "start" }}>
                              {t("PRODUCT")}
                            </th>
                            <th style={{ width: "50%", textAlign: "end" }}>
                              {t("TOTAL")}
                            </th>
                          </tr>
                        </thead>

                        <tbody>
                          {cartlist?.map((item, index) => (
                            <tr key={index}>
                              <td style={{ width: "50%", textAlign: "start" }}>
                                {" "}
                                <span
                                  onClick={() => goToProduct(item?.productId)}>
                                  {item.name}
                                </span>
                              </td>
                              <td style={{ width: "50%", textAlign: "end" }}>
                                {item.discountedPrice
                                  ? item.discountedPrice * item.count
                                  : item.price * item.count}
                              </td>
                            </tr>
                          ))}
                          <tr className='summary-subtotal'>
                            <td style={{ width: "50%", textAlign: "start" }}>
                              {t("SUB_TOTAL")}:
                            </td>
                            <td style={{ width: "50%", textAlign: "end" }}>
                              {getCartTotalPrice(cartlist, true).toLocaleString(
                                undefined,
                                {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                }
                              )}
                            </td>
                          </tr>
                          <tr>
                            <td style={{ width: "50%", textAlign: "start" }}>
                              {t("SHIPPING")}
                            </td>
                            <td style={{ width: "50%", textAlign: "end" }}>
                              {cities?.[fees]?.deliveryFees}
                            </td>
                          </tr>
                          <tr className='summary-total'>
                            <td style={{ width: "50%", textAlign: "start" }}>
                              {t("TOTAL")}:
                            </td>
                            <td style={{ width: "100%", textAlign: "end" }}>
                              {router?.locale == "en" && " EGP "}
                              {getCartTotalPrice(cartlist).toLocaleString(
                                undefined,
                                {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                }
                              )}
                              {router?.locale == "ar" && " جم "}
                            </td>
                          </tr>
                        </tbody>
                      </table>

                      <button
                        type='submit'
                        className={`btn btn-outline-primary-2 btn-order btn-block`}
                        onClick={placeOrder}>
                        <span className='btn-text'>{t("PLACE_ORDER")}</span>
                        <span className='btn-hover-text'>
                          {t("PLACE_ORDER")}
                        </span>
                      </button>
                    </div>
                  </aside>
                </div>

               
              </form>
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
      ...(await serverSideTranslations(locale, ["common", "checkout"])),
    },
  };
};

export default Checkout;
