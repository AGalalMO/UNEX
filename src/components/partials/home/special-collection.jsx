import { LazyLoadImage } from 'react-lazy-load-image-component';

import ALink from '~/src/components/features/alink';
import OwlCarousel from '~/src/components/features/owl-carousel';
import ProductTwelve from '~/src/components/features/products/product-twelve';
import ProductThriteen from '~/src/components/features/products/product-thirteen'
import PostFour from '~/src/components/features/posts/post-four';

import { attrFilter } from '~/src/utils/shared';

function SpecialCollection ( props ) {
    const { products, posts } = props;

    return (
      <div className='row'>
        <div className='col-lg-9'>
          <h2 className='title'>Recent Arrivals</h2>

          <div className='products-container mb-7'>
            <div className='products-container mb-7'>
              <div className='row justify-content-center'>
                {products
                  ? products.slice(0, 9).map((item, index) => (
                      <div
                        className='col-6 col-md-4'
                        key={"product-one" + index}>
                        <ProductTwelve product={item} />
                      </div>
                    ))
                  : new Array(9).fill(1).map((item, index) => (
                      <div
                        className='col-6 col-md-4'
                        key={"product-one" + index}>
                        <div className='skel-pro skel-pro-grid'></div>
                      </div>
                    ))}
              </div>

              <div className='more-container text-center mt-0 mb-0'>
                <ALink
                  href='/shop/3cols'
                  className='btn btn-outline-primary-2 btn-more'>
                  <span>View more Products</span>
                </ALink>
              </div>
            </div>
          </div>
        </div>

        <aside className='col-lg-3'>
          <div className='sidebar sidebar-home'>
            <div className='row'>
              <div className='col-sm-6 col-lg-12'>
                <div className='widget widget-products'>
                  <h4 className='widget-title'>Best Selling</h4>

                  <div className='products'>
                    {products
                      ? attrFilter(products, "top")
                          .slice(0, 4)
                          .map((item, index) => (
                            <ProductThriteen
                              product={item}
                              key={"Best" + index}
                            />
                          ))
                      : new Array(4)
                          .fill(1)
                          .map((item, index) => (
                            <div
                              className='skel-pro skel-pro-list'
                              key={"Best" + index}></div>
                          ))}
                  </div>
                </div>
              </div>

              <div className='col-sm-6 col-lg-12'>
                <div
                  className='widget widget-subscribe'
                  style={{
                    backgroundImage: "url(images/home/bg-newsletter.jpg)",
                  }}>
                  <h2 className='widget-title'>
                    Sign up for email <br />& get 25% off{" "}
                  </h2>
                  <p>Subcribe to get information about products and coupons</p>

                  <form action='#'>
                    <input
                      type='email'
                      className='form-control'
                      placeholder='Enter your Email Address'
                      required
                    />

                    <input
                      type='submit'
                      className='btn btn-outline-white'
                      value='Subscribe'
                    />
                  </form>
                </div>
              </div>

              <div className='col-sm-6 col-lg-12'>
                <div className='widget widget-banner'>
                  <div className='banner banner-overlay lazy-media'>
                    <figure className='mb-0'>
                      <div className='lazy-overlay'></div>

                      <LazyLoadImage
                        alt='banner'
                        src='images/home/banners/banner-5.jpg'
                        threshold={200}
                        width='100%'
                        height='auto'
                        effect='blur'
                      />
                    </figure>

                    <div className='banner-content'>
                      <h4 className='banner-subtitle'>
                        <a href='#'>Spring 2019</a>
                      </h4>
                      <h3 className='banner-title'>
                        <a href='#'>
                          SAVE UP TO <br />
                          50% OFF
                        </a>
                      </h3>
                      <ALink href='/shop/3cols' className='banner-link'>
                        Shop Now
                      </ALink>
                    </div>
                  </div>
                </div>
              </div>

              <div className='col-sm-6 col-lg-12'>
                <div className='widget widget-posts'>
                  <h4 className='widget-title'>New Blog Posts</h4>

                  <OwlCarousel adClass='owl-simple carousel-with-shadow'>
                    {posts
                      ? posts.map((item, index) => (
                          <PostFour post={item} key={"Post:" + index} />
                        ))
                      : [0].map((item, index) => (
                          <div className='skel-pro' key={index}></div>
                        ))}
                  </OwlCarousel>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    );
}

export default SpecialCollection;
