import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { connect } from "react-redux";

import ALink from "~/src/components/features/alink";

import { actions as wishlistAction } from "~/store/wishlist";
import { actions as cartAction } from "~/store/cart";
import { actions as compareAction } from "~/store/compare";
import { actions as demoAction } from "~/store/demo";
import { useTranslation } from "next-i18next";

function ProductEleven(props) {
  const router = useRouter();
  const { product } = props;
  console.log("product", product);
  const { t, i18n } = useTranslation(["common"]);

  const [outOfStock, setOutOfStock] = useState(false);
  const checkStock = () => {
    let count = 0;
    product.info.map((item) => (count = count + item.count));
    if (count == 0) setOutOfStock(true);
  };

  useEffect(() => {
    checkStock();
  }, []);

  function onCartClick(e) {
    e.preventDefault();
    props.addToCart(product);
  }

  return (
    <div className='product product-7 text-center w-100'>
      <figure className='product-media'>
        {product?.discount ? (
          <span className='product-label label-sale'>
            {product.discount}% {t("Sale", { ns: "common" })}
          </span>
        ) : (
          <span className='product-label label-new'>
            {t("newArrival", { ns: "common" })}
          </span>
        )}
        {outOfStock ? (
          <span className='product-label label-out'>
            {t("outOfStock", { ns: "common" })}
          </span>
        ) : (
          ""
        )}

        <ALink href={`/product/${product?.productId}`}>
          <img
            height={"100%"}
            style={{ height: "100% !important" }}
            src={product?.images?.[0]?.url}
          />
          {product?.images?.length >= 2 ? (
            <img
              height={"100%"}
              style={{ height: "100% !important" }}
              src={product?.images[1]?.url}
            />
          ) : (
            ""
          )}
        </ALink>

        {!outOfStock ? (
          <div className='product-action'>
            {product?.info?.length > 0 ? (
              <ALink
                href={`/product/${product?.productId}`}
                className='btn-product btn-cart btn-select'>
                <span>{t("SELECT_OPTIONS", { ns: "common" })}</span>
              </ALink>
            ) : (
              <button className='btn-product btn-cart' onClick={onCartClick}>
                <span>{t("Add_To_Cart", { ns: "common" })}</span>
              </button>
            )}
          </div>
        ) : (
          ""
        )}
      </figure>

      <div className='product-body'>
        <div
          className='product-cat'
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}>
          {product?.info?.map?.((item, index) => (
            <React.Fragment key={item.color + "-" + index}>
              <>
                {item.count !== 0 && (
                  <>
                    <span
                      style={{
                        backgroundColor: item.color,
                        display: "block",
                        borderRadius: "50%",
                        width: "24px",
                        height: "24px",
                      }}
                    />
                    {index < product?.info?.length - 1 ? ", " : ""}
                  </>
                )}
              </>{" "}
            </React.Fragment>
          ))}
        </div>

        <h3 className='product-title'>
          <ALink href={`/product/${product?.productId}`}>{product?.name}</ALink>
        </h3>

        <div className='product-price'>
          <span>{product?.price?.toFixed(2)} EGP</span>
        </div>

        {product?.variants?.length > 0 ? (
          <div className='product-nav product-nav-dots'>
            <div className='row no-gutters'>
              {product?.variants?.map((item, index) => (
                <ALink
                  href='#'
                  style={{ backgroundColor: item.color }}
                  key={index}>
                  <span className='sr-only'>
                    {t("Color", { ns: "common" })}
                  </span>
                </ALink>
              ))}
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    wishlist: [],
    comparelist: [],
  };
};

export default connect(mapStateToProps, {
  ...wishlistAction,
  ...cartAction,
  ...compareAction,
  ...demoAction,
})(ProductEleven);
