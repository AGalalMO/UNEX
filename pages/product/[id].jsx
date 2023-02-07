import GalleryDefault from "~/src/components/partials/product/gallery/gallery-default";
import DetailOne from "~/src/components/partials/product/details/ProductDetails";
import axiosInstance from "~/src/utils/axios/axiosInstance";
import { APIS } from "~/src/utils/ServiceUrls";
import { BreadCrumb } from "~/src/components/partials/shop/list/components/BreadCrumb";
import Layout from "~/src/components/layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

function SingleProduct({ product }) {
  const loading = false;

  return (
    <Layout>
      <div className='main'>
        <BreadCrumb current='Default' pageTitle={product?.name} />
        <div className='page-content'>
          <div className='container skeleton-body'>
            <div className='product-details-top'>
              <div className={`row skel-pro-single ${loading ? "" : "loaded"}`}>
                <div className='col-md-6'>
                  <div className='skel-product-gallery'></div>
                  {!loading ? <GalleryDefault product={product} /> : ""}
                </div>

                <div className='col-md-6'>
                  <div className='entry-summary row'>
                    <div className='col-md-12'>
                      <div className='entry-summary1 mt-2 mt-md-0'></div>
                    </div>
                    <div className='col-md-12'>
                      <div className='entry-summary2'></div>
                    </div>
                  </div>
                  {!loading ? <DetailOne product={product} /> : ""}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </Layout>
  );
}

export default SingleProduct;

export async function getServerSideProps(context) {
  const { locale } = context;
  const { id } = context.query;
  console.log("idd", id);
  let product = await axiosInstance.get(APIS.PRODUCTS.GET(id), {
    headers: {
      common: {
        "accept-language": locale ?? "en",
      },
    },
  });

  return {
    props: {
      product: product.data?.[0],
      ...(await serverSideTranslations(locale, ["common", "shop"])),
    },
  };
}
