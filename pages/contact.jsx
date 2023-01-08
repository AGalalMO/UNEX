import GoogleMapReact from "google-map-react";
import ALink from "~/src/components/features/alink";
import PageHeader from "~/src/components/features/page-header";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const MapComponent = ({ text }) => <div>{text}</div>;

function ContactUs() {
  const { t } = useTranslation(["contact", "common"]);

  return (
    <div className="main">
      <PageHeader title={t("CONTACT", { ns: "common" })} subTitle="" />
      <nav className="breadcrumb-nav border-0 mb-0">
        <div className="container">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <ALink href="/">{t("HOME", { ns: "common" })}</ALink>
            </li>
            <li className="breadcrumb-item active">
              {t("CONTACT", { ns: "common" })}
            </li>
          </ol>
        </div>
      </nav>
      <hr className="mt-3 mb-5 mt-md-1" />

      <div className="page-content">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="contact-box text-center">
                <h3>{t("MAIN_BRANCH")}</h3>
                <address>
                  1 New York Plaza, New York, <br />
                  NY 10004, USA
                </address>
              </div>
            </div>

            <div className="col-md-4">
              <div className="contact-box text-center">
                <h3>{t("START_CONVESATION")}</h3>

                <div>
                  <a href="mailto:#">info@Molla.com</a>
                </div>
                <div>
                  <a href="tel:#">+1 987-876-6543</a>,{" "}
                  <a href="tel:#">+1 987-976-1234</a>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="contact-box text-center">
                <h3>{t("SOCIAL")}</h3>

                <div className="social-icons social-icons-color justify-content-center">
                  <ALink
                    href="#"
                    className="social-icon social-facebook"
                    title="Facebook"
                  >
                    <i className="icon-facebook-f"></i>
                  </ALink>
                  <ALink
                    href="#"
                    className="social-icon social-instagram"
                    title="Instagram"
                  >
                    <i className="icon-instagram"></i>
                  </ALink>
                </div>
              </div>
            </div>
          </div>
          <hr className="mt-3 mb-5 mt-md-1" />

          <div className="touch-container row justify-content-center">
            <div className="col-md-9 col-lg-7">
              <div className="text-center">
                <h2 className="title mb-1">{t("GET_IN_TOUCH")}</h2>
                <p className="lead text-primary">{t("WE_COLLABORATE")}</p>
                <p className="mb-3">
                  Vestibulum volutpat, lacus a ultrices sagittis, mi neque
                  euismod dui, eu pulvinar nunc sapien ornare nisl. Phasellus
                  pede arcu, dapibus eu, fermentum et, dapibus sed, urna.
                </p>
              </div>

              <form action="#" className="contact-form mb-2">
                <div className="row">
                  <div className="col-sm-4">
                    <label htmlFor="cname" className="sr-only">
                      {t("NAME")}
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="cname"
                      placeholder={`${t("NAME")} *`}
                      required
                    />
                  </div>

                  <div className="col-sm-4">
                    <label htmlFor="cemail" className="sr-only">
                      {t("EMAIL")}
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="cemail"
                      placeholder={`${t("EMAIL")} *`}
                      required
                    />
                  </div>

                  <div className="col-sm-4">
                    <label htmlFor="cphone" className="sr-only">
                      {t("PHONE")}
                    </label>
                    <input
                      type="tel"
                      className="form-control"
                      id="cphone"
                      placeholder={`${t("PHONE")} *`}
                    />
                  </div>
                </div>

                <label htmlFor="csubject" className="sr-only">
                  {t("SUBJECT")}
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="csubject"
                  placeholder={`${t("SUBJECT")} *`}
                />

                <label htmlFor="cmessage" className="sr-only">
                  {t("MESSAGE")}
                </label>
                <textarea
                  className="form-control"
                  cols="30"
                  rows="4"
                  id="cmessage"
                  required
                  placeholder={`${t("MESSAGE")} *`}
                ></textarea>

                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-outline-primary-2 btn-minwidth-sm"
                  >
                    <span>{t("SUBMIT")}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
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
