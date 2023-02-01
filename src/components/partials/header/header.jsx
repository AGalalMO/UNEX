import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import ALink from "~/src/components/features/alink";
import WishlistMenu from "~/src/components/partials/header/partials/wishlist-menu";
import CartMenu from "~/src/components/partials/header/partials/cart-menu";
import MainMenu from "~/src/components/partials/header/partials/main-menu";
import StickyHeader from "~/src/components/features/sticky-header";
import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "~/src/store/cart";

function Header(props) {
  const router = useRouter();
  const [containerClass, setContainerClass] = useState("container");
  const dispatch = useDispatch();
  function openMobileMenu() {
    document.querySelector("body").classList.add("mmenu-active");
  }

  useEffect(() => {
    setContainerClass(
      router.asPath.includes("fullwidth") ? "container-fluid" : "container"
    );
  }, [router.asPath]);

  useEffect(() => {
    dispatch(getCart());
  }, []);
  return (
    <header className={`header header-11 ${props.adClass}`}>
      <StickyHeader>
        <div className='header-middle sticky-header'>
          <div className={containerClass}>
            <div className='header-left'>
              <MainMenu />

              <button className='mobile-menu-toggler' onClick={openMobileMenu}>
                <span className='sr-only'>Toggle mobile menu</span>
                <i className='icon-bars'></i>
              </button>
            </div>

            <div className='header-center'>
              <ALink href='/' className='logo'>
                <img
                  src='images/home/logo.png'
                  alt='Molla Logo'
                  width='82'
                  height='25'
                />
              </ALink>
            </div>

            <div className='header-right'>
              <WishlistMenu />

              <CartMenu />
              <Typography
                sx={{
                  marginLeft: "2.3rem",
                  color: "white",
                  fontSize: "14px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  const newlocale = router?.locale == 'ar' ? 'en' : 'ar'
                  console.log("newLocale",newlocale)
                  console.log("newLocale router.asPath", router.asPath);
                  router.push(
                    {
                      route: router.pathname,
                      query: router.query,
                    },
                    router.asPath,
                    { locale:newlocale }
                  );
            }}
                
                   
                >
                {router.locale == "en" ? "العربية" : "EN"}
              </Typography>
            </div>
          </div>
        </div>
      </StickyHeader>
    </header>
  );
}
export default Header;
