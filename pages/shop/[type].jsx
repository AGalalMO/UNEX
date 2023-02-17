import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import PageHeader from "~/src/components/features/page-header";
import ShopListOne from "~/src/components/partials/shop/list/shop-list-one";
import Pagination from "~/src/components/features/pagination";
import axiosInstance from "~/src/utils/axios/axiosInstance";
import { APIS } from "~/src/utils/ServiceUrls";
import { BreadCrumb } from "~/src/components/partials/shop/list/components/BreadCrumb";
import { ToolBox } from "~/src/components/partials/shop/list/components/ToolBox";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Layout from "~/src/components/layout";
import { useTranslation } from "next-i18next";
import SideBar from "~/src/components/partials/shop/sidebar/SideBar";

function ShopGrid({ products, categories }) {
  const router = useRouter();
  const { t } = useTranslation(["shop", "common"]);
  const type = router.query.type;
  const query = router.query;
  const [toggle, setToggle] = useState(false);
  const totalCount = products?.length;
  const [filtered, setFiltered] = useState(products);
  const [colors, setColors] = useState([]);
  useEffect(() => {
    window.addEventListener("resize", resizeHandle);
    resizeHandle();
    return () => {
      window.removeEventListener("resize", resizeHandle);
    };
  }, []);

  function resizeHandle() {
    if (document.querySelector("body").offsetWidth < 992) setToggle(true);
    else setToggle(false);
  }
  const Sort = (type) => {
    let sortedProducts = [...products];
    if (type == 2) {
      sortedProducts.sort((p1, p2) =>
        p1?.discountedPrice < p2?.discountedPrice
          ? 1
          : p1?.discountedPrice > p2?.discountedPrice
          ? -1
          : 0
      );
    } else if (type == 1) {
      sortedProducts.sort((p1, p2) =>
        p1?.discountedPrice > p2?.discountedPrice
          ? 1
          : p1?.discountedPrice < p2?.discountedPrice
          ? -1
          : 0
      );
    }

    setFiltered([...sortedProducts]);
  };
  const onChange = async (filters) => {
    const response = await axiosInstance.get(APIS.PRODUCTS.filter, {
      params: filters,
    });
    setFiltered(response.data);
  };

  return (
    <Layout>
      <main className='main shop'>
        <PageHeader title={"UNEX"} subTitle={t("SHOP")} />
        <BreadCrumb query={query} pageTitle={""} />
        <div className='page-content'>
          <div className='container'>
            <div className='row skeleton-body'>
              <div className={`col-lg-9 skel-shop-products ${"loaded"}`}>
                <ToolBox Sort={(type) => Sort(type)} type={type} />

                <ShopListOne products={filtered} perPage={10} loading={false} />

                {totalCount > 10 ? (
                  <Pagination perPage={3} total={totalCount}></Pagination>
                ) : (
                  ""
                )}
              </div>

              <SideBar
                onChange={onChange}
                categories={categories}
                toggle={toggle}
                colors={colors}
              />
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}

export default ShopGrid;

export async function getServerSideProps(ctx) {
  const { locale, query } = ctx;
  console.log("queeerrryyyy", query);
  let products = [];
  if (query.cat) {
    products = await axiosInstance.get(APIS.PRODUCTS.byCat(query?.cat), {
      headers: {
        common: {
          "accept-language": locale ?? "en",
        },
      },
    });
  }
  if (query.filter) {
    if (query.filter == "newarrival") {
      products = await axiosInstance.get(APIS.PRODUCTS.newArrival, {
        headers: {
          common: {
            "accept-language": locale ?? "en",
          },
        },
      });
    } else {
      products = await axiosInstance.get(APIS.PRODUCTS.sale, {
        headers: {
          common: {
            "accept-language": locale ?? "en",
          },
        },
      });
    }
  } else {
    products = await axiosInstance.get(APIS.PRODUCTS.LIST, {
      headers: {
        common: {
          "accept-language": locale ?? "en",
        },
      },
    });
  }

  let categories = await axiosInstance.get(APIS.CATEGORIES.LIST, {
    headers: {
      common: {
        "accept-language": locale ?? "en",
      },
    },
  });
  return {
    props: {
      categories: categories.data,
      products: products.data,
      ...(await serverSideTranslations(locale, ["common", "shop"])),
    },
  };
}
