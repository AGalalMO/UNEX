import { useTranslation } from "next-i18next";
import ALink from "~/src/components/features/alink";
import OwlCarousel from "~/src/components/features/owl-carousel";
function ImageBanner({ banners }) {
  const { t } = useTranslation(["common"]);

  console.log("hello BAnnner Data", banners);
  return (
    <div className='intro-slider-container mb-3 mb-lg-5'>
      <OwlCarousel
        adClass='intro-slider owl-nav-inside owl-light'
        options={{ dots: true, nav: false }}>
        {banners?.map((item) => {
          return (
            <div
              className='intro-slide'
              style={{
              backgroundImage: `url("${item?.url}") repeat 0 0`,
                backgroundSize: "cover",
              }}>
              <div className='container'>
                <div className='intro-content text-center'>
                  <h3 className='intro-subtitle text-primary cross-txt'>
                    {item?.category}
                  </h3>
                  <h1 className='intro-title text-white'>{"UNEX"}</h1>
                  <div className='intro-text text-white'>
                    {item?.subHeadText}
                  </div>
                  <div className='intro-action cross-txt'>
                    <ALink href={item?.href} className='btn btn-outline-white'>
                      <span>{t("DISCOVER_MORE", { ns: "common" })}</span>
                    </ALink>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </OwlCarousel>

      <span className='slider-loader text-white'></span>
    </div>
  );
}

export default ImageBanner;
