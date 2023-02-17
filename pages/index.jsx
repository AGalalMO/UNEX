import HomeScreen from "~/src/components/HomeScreen";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Layout from "~/src/components/layout";
import axios from "axios";
import axiosInstance from "~/src/utils/axios/axiosInstance";
import { APIS } from "~/src/utils/ServiceUrls";

function Home (props) {
  return (
    <Layout>
      <HomeScreen banners={props?.banners} />
    </Layout>
  );
}

export const getStaticProps = async ({ locale }) =>
{
  const BannerData = await axiosInstance.get(APIS.UTILS.LINKS, {
    headers: {
      common: {
        "accept-language": "en",
      },
    },
  });
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      banners:BannerData?.data
    },
  };
};

export default Home;
