import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { LazyLoadImage } from "react-lazy-load-image-component";

import ALink from "~/src/components/features/alink";

import { actions as wishlistAction } from "~/store/wishlist";
import { actions as cartAction } from "~/store/cart";
import { actions as compareAction } from "~/store/compare";
import { actions as demoAction } from "~/store/demo";

function ProductEleven(props) {
  const router = useRouter();
  const { product } = props;
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
            {product.discount}% OFF
          </span>
        ) : (
          <span className='product-label label-new'>New Arrival</span>
        )}
        {outOfStock ? (
          <span className='product-label label-out'>Out of Stock</span>
        ) : (
          ""
        )}

        <ALink href={`/product/${product?.productId}`}>
          <img
            height={"100%"}
            style={{ height: "100% !important" }}
            src={product?.images[0]?.url}
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
                <span>select options</span>
              </ALink>
            ) : (
              <button className='btn-product btn-cart' onClick={onCartClick}>
                <span>add to cart</span>
              </button>
            )}
          </div>
        ) : (
          ""
        )}
      </figure>

      <div className='product-body'>
        <div className='product-cat'>
          {product?.info?.map?.((item, index) => (
            <React.Fragment key={item.color + "-" + index}>
              <>
                {item.count !== 0 && (
                  <>
                    <span>{item.color}</span>
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
          {/* <div className="product-price">${minPrice.toFixed(2)}&ndash;${maxPrice.toFixed(2)}</div> */}
          <span>{product?.price?.toFixed(2)} EGP</span>
        </div>

        <div className='ratings-container'>
          <div className='ratings'>
            <div
              className='ratings-val'
              style={{ width: product?.rating * 20 + "%" }}></div>
            <span className='tooltip-text'>{product?.rating?.toFixed(2)}</span>
          </div>
          <span className='ratings-text'>( {product?.review} Reviews )</span>
        </div>

        {product?.variants?.length > 0 ? (
          <div className='product-nav product-nav-dots'>
            <div className='row no-gutters'>
              {product?.variants?.map((item, index) => (
                <ALink
                  href='#'
                  style={{ backgroundColor: item.color }}
                  key={index}>
                  <span className='sr-only'>Color Name</span>
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
