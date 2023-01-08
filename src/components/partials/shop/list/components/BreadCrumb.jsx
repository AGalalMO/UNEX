import ALink from "~/src/components/features/alink";
import { useTranslation } from "next-i18next";
export const BreadCrumb = ({ pageTitle, query }) => {
  const { t } = useTranslation(["shop", "common"]);

  return (
    <nav className="breadcrumb-nav mb-2">
      <div className="container">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <ALink href="/">{t("HOME", { ns: "common" })}</ALink>
          </li>
          <li className="breadcrumb-item">
            <ALink href="/shop/3cols">{t("SHOP")}</ALink>
          </li>
          <li className="breadcrumb-item active">{pageTitle}</li>
          {query?.search ? (
            <li className="breadcrumb-item">
              <span>Search - {query.searchTerm}</span>
            </li>
          ) : (
            ""
          )}
        </ol>
      </div>
    </nav>
  );
};
