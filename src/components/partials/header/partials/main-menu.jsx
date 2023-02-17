import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";

import ALink from "~/src/components/features/alink";
import axiosInstance from "~/src/utils/axios/axiosInstance";
import { APIS } from "~/src/utils/ServiceUrls";

function MainMenu() {
  const router = useRouter();
  let path = router.asPath;
  const { t, i18n } = useTranslation(["common"]);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    if (categories.length == 0) getCategories();
  }, [i18n]);

  const getCategories = async () => {
    let response = await axiosInstance.get(APIS.CATEGORIES.LIST, {
      headers: {
        common: {
          "accept-language": router.language ?? router.locale,
        },
      },
    });
    setCategories(response.data);
  };

  return (
    <nav className='main-nav'>
      <ul className='menu sf-arrows'>
        <li
          className={`megamenu-container ${path === "/" ? "active" : ""}`}
          id='menu-home'>
          <ALink href='/'>{t("HOME", { ns: "common" })}</ALink>
        </li>
        <li className={path.indexOf("/shop") > -1 ? "active" : ""}>
          <ALink href='/shop/3cols'>{t("SHOP", { ns: "common" })}</ALink>
        </li>
        <li className={path.indexOf("product/") > -1 ? "active" : ""}>
          <ALink className='sf-with-ul' href=''>
            {t("PRODUCTS", { ns: "common" })}
          </ALink>

          <div className='megamenu megamenu-sm'>
            <div className='row no-gutters'>
              <div className='col-md-6'>
                <div className='menu-col'>
                  <ul>
                    {categories.map((item) => {
                      return (
                        <>
                          {item?.subcategories?.map((subCat) => (
                            <li key={item?.id}>
                              <ALink
                                href={{
                                  pathname: "/shop/3cols",
                                  query: {   cat: item?.id },
                                  locale:router?.locale
                                }}>
                                {subCat?.name}
                              </ALink>
                            </li>
                          ))}
                        </>
                      );
                    })}{" "}
                  </ul>
                </div>
              </div>

              <div className='col-md-6'>
                <div className='banner banner-overlay'>
                  <ALink href='/shop/'>
                    <img src='images/menu/banner-2.jpg' alt='Banner' />

                    <div className='banner-content banner-content-bottom'>
                      <div className='banner-title text-white'>
                        {t("NEW_TRENDS", { ns: "common" })}
                        <br />
                        <span>
                          <strong> {new Date().getFullYear()}</strong>
                        </span>
                      </div>
                    </div>
                  </ALink>
                </div>
              </div>
            </div>
          </div>
        </li>

        {/* <li className={path.indexOf("About/") > -1 ? "active" : ""}>
          <ALink href='/about'>{t("ABOUT", { ns: "common" })}</ALink>
        </li> */}
        <li className={path.indexOf("About/") > -1 ? "active" : ""}>
          <ALink href='/contact'>{t("CONTACT", { ns: "common" })}</ALink>
        </li>
      </ul>
    </nav>
  );
}

export default MainMenu;
