import ALink from "~/src/components/features/alink";
import PageHeader from "~/src/components/features/page-header";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Layout from "~/src/components/layout";
import { useRouter } from "next/router";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import { useState } from "react";
import axiosInstance from "~/src/utils/axios/axiosInstance";
import { APIS } from "~/src/utils/ServiceUrls";
function ContactUs () {
  const [loading,setLoading]=useState()
  const [sent, setSend] = useState(false);
  const { t } = useTranslation(["contact", "common"]);
  const { locale, replace } = useRouter();
  const [details, setDetails] = useState({
    Name: "",
    Email: "",
    Subject: "",
    Message: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {

      const response = await axiosInstance.post(APIS.UTILS.CONTACT, {
        ...data,
      });

      setSend(true);
    } catch {}
  };
  return (
    <Layout>
      <main className='main shop'>
        <div className='main'>
          <PageHeader title={t("CONTACT", { ns: "common" })} subTitle='' />
          <nav className='breadcrumb-nav border-0 mb-0'>
            <div className='container'>
              <ol className='breadcrumb'>
                <li className='breadcrumb-item'>
                  <ALink href='/'>{t("HOME", { ns: "common" })}</ALink>
                </li>
                <li className='breadcrumb-item active'>
                  {t("CONTACT", { ns: "common" })}
                </li>
              </ol>
            </div>
          </nav>
          <hr className='mt-3 mb-5 mt-md-1' />

          <div className='page-content'>
            <div className='container'>
              <div className='row'>
                <div className='col-md-4'>
                  <div className='contact-box text-center'>
                    <h3>{t("MAIN_BRANCH")}</h3>
                    <address>
                      {locale == "en"
                        ? "56 El Nozha Street, Heliopolis, next to Link Me and Ezz El Din Pharmacy"
                        : " 56 شارع النزهة مصر الجديدة بجوار لينك مي وصيدلية عز الدين "}
                    </address>
                  </div>
                </div>

                <div className='col-md-4'>
                  <div className='contact-box text-center'>
                    <h3>{t("START_CONVESATION")}</h3>

                    <div
                      style={{
                        gap: "10px",
                        alignItems: "center",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                      }}>
                      <EmailOutlinedIcon />
                      <a href='mailto:unexCityActiveStores@gmail.com'>
                        unexCityActiveStores@gmail.com
                      </a>
                    </div>
                    <div
                      style={{
                        gap: "10px",
                        alignItems: "center",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                      }}>
                      <CallOutlinedIcon />
                      <a href='tel:+20100028 8168'>+2 0 100 028 8168</a>
                    </div>
                  </div>
                </div>

                <div className='col-md-4'>
                  <div className='contact-box text-center'>
                    <h3>{t("SOCIAL")}</h3>

                    <div className='social-icons social-icons-color justify-content-center'>
                      <ALink
                        href='https://www.facebook.com/unex.city.active/?_rdc=2&_rdr'
                        className='social-icon social-facebook'
                        title='Facebook'>
                        <i className='icon-facebook-f'></i>
                      </ALink>
                      <ALink
                        href='https://www.instagram.com/unex_city_active/'
                        className='social-icon social-instagram'
                        title='Instagram'>
                        <i className='icon-instagram'></i>
                      </ALink>
                    </div>
                  </div>
                </div>
              </div>
              <hr className='mt-3 mb-5 mt-md-1' />

              <div className='touch-container row justify-content-center'>
                <div className='col-md-9 col-lg-7'>
                  <div className='text-center'>
                    <h2 className='title mb-1'>{t("GET_IN_TOUCH")}</h2>
                    <p className='lead text-primary'>{t("WE_COLLABORATE")}</p>
                  </div>

                  <form
                    action={handleSubmit}
                    className='contact-form mb-2'>
                    <label htmlFor='cname' className='sr-only'>
                      {t("EMAIL")}
                    </label>
                    <input
                      value={details.Email}
                      onChange={(e) => {
                        setDetails({ ...details, Email: e.target.value });
                      }}
                      style={{ borderRadius: "8px" }}
                      type='email'
                      className='form-control'
                      placeholder={`${t("EMAIL")} *`}
                      required
                    />

                    <label htmlFor='cname' className='sr-only'>
                      {t("NAME")}
                    </label>
                    <input
                      value={details.Name}
                      onChange={(e) => {
                        setDetails({ ...details, Name: e.target.value });
                      }}
                      style={{ borderRadius: "8px" }}
                      type='text'
                      className='form-control'
                      placeholder={`${t("NAME")} *`}
                      required
                    />
                    <label htmlFor='csubject' className='sr-only'>
                      {t("SUBJECT")}
                    </label>
                    <input
                      style={{ borderRadius: "8px" }}
                      value={details.Subject}
                      onChange={(e) => {
                        setDetails({ ...details, Subject: e.target.value });
                      }}
                      type='text'
                      className='form-control'
                      placeholder={`${t("SUBJECT")} *`}
                    />

                    <label htmlFor='cmessage' className='sr-only'>
                      {t("MESSAGE")}
                    </label>
                    <textarea
                      value={details.Message}
                      onChange={(e) => {
                        setDetails({ ...details, Message: e.target.value });
                      }}
                      style={{ borderRadius: "8px" }}
                      className='form-control'
                      cols='30'
                      rows='4'
                      required
                      placeholder={`${t("MESSAGE")} *`}></textarea>

                    <div className='text-center'>
                      <button
                        disabled={sent}
                        type='submit'
                        className='btn btn-outline-primary-2 btn-minwidth-sm'>
                        <span>{t(sent ? "SUBMITTED" : "SUBMIT")}</span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}

export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "contact"])),
    },
  };
};

export default ContactUs;
