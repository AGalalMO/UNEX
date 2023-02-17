import { useRouter } from "next/router";
import ALink from "~/src/components/features/alink";
import React, { useState, useEffect } from "react";
import { useTranslation } from "next-i18next";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
function Footer() {
  const { t } = useTranslation("common");
  
  const router = useRouter("");
  const [isBottomSticky, setIsBottomSticky] = useState(false);
  const [containerClass, setContainerClass] = useState("container");
  useEffect(() => {
    handleBottomSticky();
    setContainerClass(
      router.asPath.includes("fullwidth") ? "container-fluid" : "container"
    );
  }, [router.asPath]);

  useEffect(() => {
    window.addEventListener("resize", handleBottomSticky, { passive: true });
    return () => {
      window.removeEventListener("resize", handleBottomSticky);
    };
  }, []);

  function handleBottomSticky() {
    setIsBottomSticky(
      router.pathname.includes("product/default") && window.innerWidth > 991
    );
  }

  return (
    <footer className='footer footer-dark'>
      <div className='icon-boxes-container'>
        <div className={containerClass}>
          <div className='row'>
            <div className='col-sm-6 col-lg-3'>
              <div className='icon-box icon-box-side'>
                <span className='icon-box-icon'>
                  <i className='icon-rocket'></i>
                </span>

                <div className='icon-box-content'>
                  <h3 className='icon-box-title'>
                    {t("FREE_SHIPPING", { ns: "common" })}
                  </h3>
                  <p style={{ textAlign: "center" }}>
                    {t("ORDERS_ABOVE", { ns: "common" })}
                  </p>
                </div>
              </div>
            </div>

            <div className='col-sm-6 col-lg-3'>
              <div className='icon-box icon-box-side'>
                <span className='icon-box-icon'>
                  <i className='icon-rotate-left'></i>
                </span>

                <div className='icon-box-content'>
                  <h3 className='icon-box-title'>
                    {t("FREE_RETURNS", { ns: "common" })}
                  </h3>
                  <p style={{ textAlign: "center" }}>
                    {t("WITHIN_30_DAYS", { ns: "common" })}
                  </p>
                </div>
              </div>
            </div>

            <div className='col-sm-6 col-lg-3'>
              <div className='icon-box icon-box-side'>
                <span className='icon-box-icon'>
                  <i className='icon-info-circle'></i>
                </span>

                <div className='icon-box-content'>
                  <h3 className='icon-box-title'>
                    {t("GET_OFF_1", { ns: "common" })}
                  </h3>
                  <p style={{ textAlign: "center" }}>
                    {" "}
                    {t("WHEN_SIGN_UP", { ns: "common" })}
                  </p>
                </div>
              </div>
            </div>

            <div className='col-sm-6 col-lg-3'>
              <div className='icon-box icon-box-side'>
                <span className='icon-box-icon'>
                  <i className='icon-life-ring'></i>
                </span>

                <div className='icon-box-content'>
                  <h3 className='icon-box-title'>
                    {t("WE_SUPPORT", { ns: "common" })}
                  </h3>
                  <p>{t("AMAZING_SERVICE", { ns: "common" })}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='footer-middle'>
        <div className={containerClass}>
          <div className='row'>
            <div
              className='col-sm-6 col-lg-4'
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}>
              <div className='widget widget-about'>
                <ALink href='/'>
                  <img
                    src='images/home/logo-footer.png'
                    className='footer-logo'
                    alt='Footer Logo'
                    width='82'
                    height='25'
                  />
                </ALink>
                <div
                  style={{
                    gap: "10px",
                    alignItems: "center",
                    display: "flex",
                    flexDirection: "row",
                    marginBottom: "10px !important",
                  }}>
                  {" "}
                  <LocationOnOutlinedIcon />
                  <p style={{ marginBottom: "0px !important" ,textAlign:'start'}}>
                    {router.locale == "en"
                      ? "56 El Nozha Street, Heliopolis, next to Link Me and Ezz El Din Pharmacy"
                      : " 56 شارع النزهة مصر الجديدة بجوار لينك مي وصيدلية عز الدين "}
                  </p>
                </div>
                <div
                  style={{
                    gap: "10px",
                    alignItems: "center",
                    display: "flex",
                    flexDirection: "row",
                    marginBottom: "10px !important",
                  }}>
                  <EmailOutlinedIcon />
                  <a href='mailto:#'>unex-city@gmail.com</a>
                </div>
                <div
                  style={{
                    gap: "10px",
                    alignItems: "center",
                    display: "flex",
                    flexDirection: "row",
                    marginBottom: "20px !important",
                  }}>
                  <CallOutlinedIcon />
                  <a href='tel:#'>+2 0 100 028 8168</a>
                </div>
                <div style={{ gap: "10px" }} className='social-icons'>
                  <a
                    href='https://web.facebook.com/unex.city.active/?_rdc=1&_rdr'
                    target={"_blank"}
                    className='social-icon'
                    title='Facebook'>
                    <i className='icon-facebook-f'></i>
                  </a>
                  <a
                    href='https://www.instagram.com/unex_city_active/'
                    target={"_blank"}
                    className='social-icon'
                    title='Instagram'>
                    <i className='icon-instagram'></i>
                  </a>
                </div>
              </div>
            </div>
            <div
              className='col-sm-6 col-lg-4'
              style={{ display: "flex", justifyContent: "center" }}>
              <div className='widget' style={{ textAlign: "center !important" }}>
                <h4
                  className='widget-title'
                  style={{ textAlign: "center !important" }}>
                  {t("CUSTOMER_SERVICE", { ns: "common" })}
                </h4>

                <ul
                  className='widget-list'
                  style={{ textAlign: "center !important" }}>
                  <li>
                    <a
                      href='https://bit.ly/3d92D1Y'
                      target={"_blank"}
                      style={{ textAlign: "center !important" }}>
                      {t("branch1", { ns: "common" })}
                    </a>
                  </li>
                  <li>
                    <a href='https://bit.ly/3DdfeMs' target={"_blank"}>
                      {t("branch2", { ns: "common" })}
                    </a>
                  </li>
                  <li>
                    <a href='https://bit.ly/3RMeKAO' target={"_blank"}>
                      {t("branch3", { ns: "common" })}
                    </a>
                  </li>
                  <li>
                    <a href='https://bit.ly/3B3yTvA' target={"_blank"}>
                      {t("branch4", { ns: "common" })}
                    </a>
                  </li>
                  <li>
                    <a href='https://bit.ly/3TYfrco' target={"_blank"}>
                      {t("branch5", { ns: "common" })}
                    </a>
                  </li>
                  <li>
                    <a href='https://bit.ly/3RNFmS7' target={"_blank"}>
                      {t("branch6", { ns: "common" })}
                    </a>
                  </li>
                  <li>
                    <a href='https://bit.ly/3L53WvK' target={"_blank"}>
                      {t("branch7", { ns: "common" })}
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div
              className='col-sm-6 col-lg-4'
              style={{ display: "flex", justifyContent: "center" }}>
              <div className='widget'>
                <h4 className='widget-title'>
                  {t("USEFUL_LINKS", { ns: "common" })}
                </h4>

                <ul className='widget-list'>
                  <li>
                    <ALink href='/contact'>
                      {t("CONTACT", { ns: "common" })}
                    </ALink>
                  </li>
                  <li>
                    <ALink href='/shop/3cols'>
                      {t("SHOPNOW", { ns: "common" })}
                    </ALink>
                  </li>
                  <li>
                    <ALink href='/shop/3cols?filter=newarrival'>
                      {t("newArrival", { ns: "common" })}
                    </ALink>
                  </li>
                  <li>
                    <ALink href='/shop/3cols?filter=discount'>
                      {t("Discount", { ns: "common" })}
                    </ALink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='footer-bottom'>
        <div className={containerClass}>
          <p className='footer-copyright'>
            Copyright © {new Date().getFullYear()} UNEX. All Rights Reserved.
          </p>
        </div>
      </div>
      {isBottomSticky ? <div className='mb-10'></div> : ""}
    </footer>
  );
}

export default React.memo(Footer);
