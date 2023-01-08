import Reveal from "react-awesome-reveal";
import { LazyLoadImage } from "react-lazy-load-image-component";

// Import Apollo Server And Queries

// Import Custom Component
import ALink from "~/src/components/features/alink";
import OwlCarousel from "~/src/components/features/owl-carousel";
import NewsletterModal from "~/src/components/features/modals/newsletter-modal";
import { useTranslation } from "next-i18next";

// Import Utils
import {
  brandSlider,
  fadeInLeftShorter,
  fadeInRightShorter,
  fadeIn,
  instagramSlider,
} from "~/src/utils/shared/data";
import ImageBanner from "./components/ImageSlider";

function HomeScreen() {
  // const { data, loading, error } = useQuery( GET_HOME_DATA );

  const loading = false;
  const { t } = useTranslation("common");

  return (
    <div
      className={`main home-page skeleton-body skel-shop-products ${
        loading ? "" : "loaded"
      }`}
    >
      <ImageBanner />

      <div className="container banners">
        <div className="row">
          <div className="col-sm-12 col-lg-3">
            <Reveal
              keyframes={fadeInRightShorter}
              delay={150}
              duration={1000}
              triggerOnce
            >
              <div className="banner banner-hover lazy-media height-1 banner-overlay">
                <figure className="mb-0">
                  <div className="lazy-overlay"></div>

                  <LazyLoadImage
                    alt="banner"
                    src="images/tops.jpeg"
                    threshold={200}
                    width="100%"
                    height="auto"
                    effect="blur"
                  />
                </figure>

                <div className="banner-content">
                  <h3 className="banner-title text-white">
                    <ALink
                      href={{
                        pathname: "/shop/3cols",
                      }}
                    >
                      {t("TOPS", { ns: "common" })}
                    </ALink>
                  </h3>
                  <ALink href="/shop/3cols" className="banner-link">
                    {t("SHOP", { ns: "common" })}
                    <i className="icon-long-arrow-right"></i>
                  </ALink>
                </div>
              </div>
            </Reveal>
          </div>
          <div className="col-lg-6">
            <Reveal
              keyframes={fadeInLeftShorter}
              delay={150}
              duration={1000}
              triggerOnce
            >
              <div className="banner banner-hover lazy-media height-1 banner-overlay">
                <figure className="mb-0">
                  <div className="lazy-overlay"></div>
                  <LazyLoadImage
                    alt="banner"
                    src="images/Banner1.jpeg"
                    threshold={200}
                    width="100%"
                    height="auto"
                    effect="blur"
                  />
                </figure>

                <div className="banner-content">
                  <h3 className="banner-title text-white">
                    <ALink
                      href={{
                        pathname: "/shop/3cols",
                      }}
                    >
                      {t("ALL_MEN", { ns: "common" })}
                    </ALink>
                  </h3>
                  <ALink href="/shop/3cols" className="banner-link">
                    {t("SHOP", { ns: "common" })}
                    <i className="icon-long-arrow-right"></i>
                  </ALink>
                </div>
              </div>
            </Reveal>
          </div>
          <div className="col-sm-12 col-lg-3">
            <Reveal
              keyframes={fadeInRightShorter}
              delay={150}
              duration={1000}
              triggerOnce
            >
              <div className="banner banner-hover lazy-media height-1 banner-overlay">
                <figure className="mb-0">
                  <div className="lazy-overlay"></div>

                  <LazyLoadImage
                    alt="banner"
                    src="images/pants.jpeg"
                    threshold={200}
                    width="100%"
                    height="auto"
                    effect="blur"
                  />
                </figure>

                <div className="banner-content">
                  <h3 className="banner-title text-white">
                    <ALink
                      href={{
                        pathname: "/shop/3cols",
                      }}
                    >
                      {t("BOTTOMS", { ns: "common" })}
                    </ALink>
                  </h3>
                  <ALink href="/shop/3cols" className="banner-link">
                    {t("SHOP", { ns: "common" })}
                    <i className="icon-long-arrow-right"></i>
                  </ALink>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      <div className="bg-lighter pt-5 pb-5">
        <div className="container">
          <div className="heading text-center">
            <h2 className="title">
              {t("INSTAGRAM_INSPIRE", { ns: "common" })}
            </h2>
            <p className="title-desc">
              Donec nec justo eget felis facilisis fermentum.
            </p>
          </div>

          <OwlCarousel adClass="owl-simple mb-3" options={instagramSlider}>
            <div className="instagram-feed lazy-media">
              <figure className="mb-0">
                <LazyLoadImage
                  alt="instagram"
                  src="images/home/instagram/1.jpg"
                  threshold={200}
                  width="100%"
                  height="auto"
                  effect="blur"
                />
              </figure>

              <div className="instagram-feed-content">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  <i className="icon-heart-o"></i>466
                </a>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  <i className="icon-comments"></i>65
                </a>
              </div>
            </div>

            <div className="instagram-feed lazy-media">
              <figure className="mb-0">
                <LazyLoadImage
                  alt="instagram"
                  src="images/home/instagram/2.jpg"
                  threshold={200}
                  width="100%"
                  height="auto"
                  effect="blur"
                />
              </figure>

              <div className="instagram-feed-content">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  <i className="icon-heart-o"></i>39
                </a>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  <i className="icon-comments"></i>78
                </a>
              </div>
            </div>

            <div className="instagram-feed lazy-media">
              <figure className="mb-0">
                <LazyLoadImage
                  alt="instagram"
                  src="images/home/instagram/3.jpg"
                  threshold={200}
                  width="100%"
                  height="auto"
                  effect="blur"
                />
              </figure>

              <div className="instagram-feed-content">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  <i className="icon-heart-o"></i>691
                </a>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  <i className="icon-comments"></i>87
                </a>
              </div>
            </div>

            <div className="instagram-feed lazy-media">
              <figure className="mb-0">
                <LazyLoadImage
                  alt="instagram"
                  src="images/home/instagram/4.jpg"
                  threshold={200}
                  width="100%"
                  height="auto"
                  effect="blur"
                />
              </figure>

              <div className="instagram-feed-content">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  <i className="icon-heart-o"></i>508
                </a>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  <i className="icon-comments"></i>124
                </a>
              </div>
            </div>

            <div className="instagram-feed lazy-media">
              <figure className="mb-0">
                <LazyLoadImage
                  alt="instagram"
                  src="images/home/instagram/5.jpg"
                  threshold={200}
                  width="100%"
                  height="auto"
                  effect="blur"
                />
              </figure>

              <div className="instagram-feed-content">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  <i className="icon-heart-o"></i>433
                </a>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  <i className="icon-comments"></i>27
                </a>
              </div>
            </div>
          </OwlCarousel>

          <div className="more-container text-center">
            <a
              href="https://www.instagram.com/unex_city_active/"
              className="btn btn-outline-primary-2 btn-more"
            >
              @ UNEX Instagram
            </a>
          </div>
        </div>
      </div>
      <NewsletterModal />
    </div>
  );
}

export default HomeScreen;
