import Person2Outlined from '@mui/icons-material/Person2Outlined';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import SlideToggle from 'react-slide-toggle';

import ALink from '~/src/components/features/alink';
import useAuth from '~/src/hooks/useAuth';
import axiosInstance from '~/src/utils/axios/axiosInstance';
import { APIS } from '~/src/utils/ServiceUrls';

function MobileMenu () {
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
    const { isAuthenticated, user } = useAuth()
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");
    useEffect(() => {
        router.events.on('routeChangeComplete', hideMobileMenu);
    }, [])

    function hideMobileMenu () {
        document.querySelector('body').classList.remove('mmenu-active');
    }



    return (
      <div className='mobile-menu-container'>
        <div className='mobile-menu-wrapper'>
          <span className='mobile-menu-close' onClick={hideMobileMenu}>
            <i className='icon-close'></i>
          </span>

          <nav className='mobile-nav'>
            <ul className='mobile-menu'>
              <SlideToggle collapsed={true}>
                <li style={{ textAlign: "center", fontWeight: "700" }}>
                  <ALink href={isAuthenticated ? "/orders" : "/auth/signin"}>
                    <Person2Outlined /> {"  "}
                    {isAuthenticated ? user?.name : "LOGIN"}
                    <span
                      onClick={(e) => {
                        onToggle(e);
                        e.preventDefault();
                      }}></span>
                  </ALink>
                </li>
              </SlideToggle>
              <SlideToggle collapsed={true}>
                <li>
                  <ALink href='/'>
                    {t("HOME", { ns: "common" })}
                    <span
                      onClick={(e) => {
                        onToggle(e);
                        e.preventDefault();
                      }}></span>
                  </ALink>
                </li>
              </SlideToggle>
              <SlideToggle collapsed={true}>
                <li>
                  <ALink href='/shop/3cols'>
                    {t("SHOP", { ns: "common" })}
                    <span
                      onClick={(e) => {
                        onToggle(e);
                        e.preventDefault();
                      }}></span>
                  </ALink>
                </li>
              </SlideToggle>
              <SlideToggle collapsed={true}>
                {({ onToggle, setCollapsibleElement, toggleState }) => (
                  <li
                    className={
                      toggleState.toLowerCase() == "expanded" ? "open" : ""
                    }>
                    <ALink
                      href='/shop/3cols'
                      className='sf-with-ul'>
                      {t("PRODUCTS", { ns: "common" })}
                      <span
                        className='mmenu-btn'
                        onClick={(e) => {
                          onToggle(e);
                          e.preventDefault();
                        }}></span>
                    </ALink>
                    <ul ref={setCollapsibleElement}>
                      {categories.map((item) => {
                        return (
                          <>
                            {item?.subcategories?.map((subCat) => (
                              <li key={item?.id}>
                                <ALink
                                  href={{
                                    pathname: "/shop/3cols",
                                    query: { cat: item?.id },
                                    locale: router?.locale,
                                  }}>
                                  {subCat?.name}
                                </ALink>
                              </li>
                            ))}
                          </>
                        );
                      })}{" "}
                    </ul>
                  </li>
                )}
              </SlideToggle>

              <SlideToggle collapsed={true}>
                <li>
                  <ALink href='/contact'>
                    {t("CONTACT", { ns: "common" })}
                    <span
                      onClick={(e) => {
                        onToggle(e);
                        e.preventDefault();
                      }}></span>
                  </ALink>
                </li>
              </SlideToggle>
            </ul>
          </nav>
        </div>
      </div>
    );
}

export default React.memo(MobileMenu);