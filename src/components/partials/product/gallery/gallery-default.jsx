import { Magnifier } from "react-image-magnifiers";
import React, { useState, useEffect } from "react";
import LightBox from "react-image-lightbox";

function GalleryDefault(props) {
  const { product, adClass = "product-gallery-vertical" } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [outOfStock, setOutOfStock] = useState(false);
  const checkStock = () => {
    let count = 0;
    product.info.map((item) => (count = count + item.count));
    if (count == 0) setOutOfStock(true);
  };

  useEffect(() => {
    if (product) {
      setIsOpen(false);
      setPhotoIndex(0);
      checkStock();
    }
  }, [product]);

  function moveNextPhoto() {
    setPhotoIndex((photoIndex + 1) % product?.images?.length);
  }

  function movePrevPhoto() {
    setPhotoIndex(
      (photoIndex + product.images.length - 1) % product.images.length
    );
  }

  function openLightBox() {
    let index = parseInt(
      document.querySelector(".product-main-image").getAttribute("index")
    );

    if (!index) {
      index = 0;
    }
    setIsOpen(true);
    setPhotoIndex(index);
  }

  function closeLightBox() {
    setIsOpen(false);
  }

  function changeBgImage(e, image, index) {
    console.log("change BG");
    let imgs = document.querySelectorAll(".product-main-image img");
    console.log("change BG", imgs);
    for (let i = 0; i < imgs.length; i++) {
      imgs[i].src = image;
    }
    console.log("change BG", imgs);

    document
      .querySelector(".product-image-gallery .active")
      .classList.remove("active");

    document.querySelector(".product-main-image").setAttribute("index", index);
    e.currentTarget.classList.add("active");
  }

  return (
    <>
      <div className={`product-gallery ${adClass}`}>
        <div className='row m-0'>
          <figure className='product-main-image' index='0'>
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

            <Magnifier
              imageSrc={product?.images?.[0]?.url}
              imageAlt='product'
              largeImageSrc={product?.images?.[0]?.url} // Optional
              dragToMove={false}
              mouseActivation='hover'
              cursorStyleActive='crosshair'
              id='product-zoom'
              className='zoom-image position-relative overflow-hidden'
              width={498}
              height={638}
              style={{
                paddingTop: `${(638 / 498) * 100}%`,
                img: {
                  height: "100% !important",
                },
                height: "100% !important",
              }}
            />

            <button
              id='btn-product-gallery'
              className='btn-product-gallery'
              onClick={openLightBox}>
              <i className='icon-arrows'></i>
            </button>
          </figure>

          <div id='product-zoom-gallery' className='product-image-gallery'>
            {product?.images?.map((item, index) => (
              <button
                className={`product-gallery-item ${
                  0 === index ? "active" : ""
                }`}
                key={product.id + "-" + index}
                onClick={(e) => changeBgImage(e, `${item?.url}`, index)}>
                <div className='img-wrapper h-100'>
                  <img src={product?.images[index].url} alt='product back' />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {isOpen ? (
        <LightBox
          mainSrc={product?.images?.[photoIndex]?.url}
          nextSrc={product?.images?.[(photoIndex + 1) % product.images.length]?.url}
          prevSrc={
            product?.images?.[
              (photoIndex + product.images.length - 1) % product.images.length
            ]?.url
          }
          onCloseRequest={closeLightBox}
          onMovePrevRequest={moveNextPhoto}
          onMoveNextRequest={movePrevPhoto}
          reactModalStyle={{
            overlay: {
              zIndex: 1041,
            },
          }}
        />
      ) : (
        ""
      )}
    </>
  );
}

export default React.memo(GalleryDefault);
