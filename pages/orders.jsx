import { useState, useEffect } from "react";

import ALink from "~/src/components/features/alink";
import PageHeader from "~/src/components/features/page-header";

import Layout from "~/src/components/layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { APIS } from "~/src/utils/ServiceUrls";
import axiosInstance from "~/src/utils/axios/axiosInstance";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { Button, Stack } from "@mui/material";

function Orders(props) {
  const { locale } = useRouter();
  const [cartList, setCartList] = useState([]);
  const { t } = useTranslation(["cart", "common"]);
  useEffect(() => {
    getOrders();
  }, []);
  const getOrders = async () => {
    let orders = await axiosInstance.get(APIS.ORDER.get, {
      headers: {
        common: {
          "accept-language": locale ?? "en",
          "access-token": `${localStorage.getItem("accessToken")}`,
        },
      },
    });
    setCartList(orders?.data);
  };

  const getStatus = (status) => {
    let text = t("confirmed");
    if (status == 0) text = t("confirmed", { ns: "common" });
    else if (status == 1) text = t("Processing", { ns: "common" });
    else if (status == 2) text = t("OutForDelivery", { ns: "common" });
    else if (status == 3) text = t("Delivered", { ns: "common" });
    else if (status == 4) text = t("Canceled", { ns: "common" });
    return (
      <Stack direction={"row"} spacing={15}>
        <Button
          style={{fontSize:'13px'}}
          variant='contained'
          color={
            status == 0
              ? "info"
              : status == 1 || status == 2
              ? "warning"
              : status == 3
              ? "success"
              : "error"
          }>
          {text}
        </Button>
       
      </Stack>
    );
  };
  const cancelOrder = async(id) => {
    try {
      await axiosInstance.post(APIS.ORDER.CANCEL, {}, {
        params: {
          'orderId':id
        }
      })
      await getOrders()
    }
    catch {
      alert('something went wrong')
    }
  }

  return (
    <Layout>
      <div className='main'>
        <PageHeader title={t("MY_ORDERS", { ns: "common" })} />
        <nav className='breadcrumb-nav'>
          <div className='container'>
            <ol className='breadcrumb'>
              <li className='breadcrumb-item'>
                <ALink href='/'>{t("HOME", { ns: "common" })}</ALink>
              </li>
              <li className='breadcrumb-item'>
                <ALink href='/orders'>{t("MY_ORDERS", { ns: "common" })}</ALink>
              </li>
            </ol>
          </div>
        </nav>

        <div className='page-content pb-5'>
          <div className='cart'>
            <div className='container'>
              {true ? (
                <div className='row'>
                  <div className='col-lg-9'>
                    {cartList.map((cartItem, index) => {
                      return (
                        <>
                          <Stack
                            direction={"row"}
                            alignItems='center'
                            justifyContent={"space-between"}>
                            <Stack
                              direction={"row"}
                              alignItems='center'
                              gap={"20px"}>
                              <h6 style={{ marginBottom: "0px" }}>
                                {t("ORDER", { ns: "common" })} {index + 1}
                              </h6>
                              <div>{getStatus(cartItem?.status)}</div>
                            </Stack>
                            {cartItem?.status == 0 && (
                              <Button
                                style={{ fontSize: "13px" }}
                                onClick={() => cancelOrder(cartItem?.id)}
                                variant='outlined'
                                color={"error"}>
                                {t("cancel", { ns: "common" })}
                              </Button>
                            )}
                          </Stack>
                          <table className='table table-cart table-mobile'>
                            <thead>
                              <tr>
                                <th style={{ textAlign: "start" }}>
                                  {t("PRODUCT")}
                                </th>
                                <th style={{ textAlign: "start" }}>
                                  {t("SIZE")}
                                </th>
                                <th style={{ textAlign: "start" }}>
                                  {t("Color")}
                                </th>

                                <th style={{ textAlign: "start" }}>
                                  {t("QUANTITY")}
                                </th>
                              </tr>
                            </thead>
                            {cartItem?.products?.map((product) => (
                              <tbody>
                                <tr key={index}>
                                  <td
                                    style={{
                                      textAlign: "start",
                                      marginInlineEnd: "5px",
                                    }}
                                    className='product-col'>
                                    <div
                                      className='product'
                                      style={{ paddingInlineStart: "0px" }}>
                                      <h4 className='product-title'>
                                        {locale == "ar"
                                          ? product?.arname
                                          : product?.enname}
                                      </h4>
                                    </div>
                                  </td>
                                  <td
                                    style={{
                                      textAlign: "start",
                                      marginInlineEnd: "5px",
                                    }}
                                    className='size-col'>
                                    {product?.size}
                                  </td>
                                  <td
                                    style={{
                                      textAlign: "start",
                                      marginInlineEnd: "5px",
                                    }}
                                    className='price-col'>
                                    {
                                      <div
                                        style={{
                                          width: "25px",
                                          height: "25px",
                                          background: product?.color,
                                          borderRadius: "50%",
                                        }}></div>
                                    }
                                  </td>

                                  <td
                                    style={{
                                      textAlign: "start",
                                      marginInlineEnd: "5px",
                                    }}
                                    className='quantity-col'>
                                    {product.count}
                                  </td>
                                </tr>
                              </tbody>
                            ))}
                          </table>
                        </>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className='row'>
                  <div className='col-12'>
                    <div className='cart-empty-page text-center'>
                      <i
                        className='cart-empty icon-shopping-cart'
                        style={{ lineHeight: 1, fontSize: "15rem" }}></i>
                      <p className='px-3 py-2 cart-empty mb-3'>{t("empty")}</p>
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
      ...(await serverSideTranslations(locale, ["common", "cart"])),
    },
  };
};

export default Orders;
