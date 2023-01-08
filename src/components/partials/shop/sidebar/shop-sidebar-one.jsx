import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import InputRange from "react-input-range";
import SlideToggle from "react-slide-toggle";
import "react-input-range/lib/css/index.css";

import ALink from "~/src/components/features/alink";
import { shopData } from "~/src/utils/shared/data";
import { useTranslation } from "next-i18next";

function ShopSidebarOne(props) {
  const { toggle = false, categories } = props;
  const { t } = useTranslation(["shop", "common"]);
  const router = useRouter();
  const query = useRouter().query;
  const [priceRange, setRange] = useState({ min: 0, max: 10000 });
  useEffect(() => {
    if (query.minPrice && query.maxPrice) {
      setRange({
        min: parseInt(query.minPrice),
        max: parseInt(query.maxPrice),
      });
    } else {
      setRange({ min: 0, max: 10000 });
    }
  }, [query]);

  function onChangePriceRange(value) {
    setRange(value);
  }

  function containsAttrInUrl(type, value) {
    const currentQueries = query[type] ? query[type].split(",") : [];
    return currentQueries && currentQueries.includes(value);
  }

  function getUrlForAttrs(type, value) {
    let currentQueries = query[type] ? query[type].split(",") : [];
    currentQueries = containsAttrInUrl(type, value)
      ? currentQueries.filter((item) => item !== value)
      : [...currentQueries, value];

    return {
      pathname: router.pathname,
      query: {
        ...query,
        page: 1,
        [type]: currentQueries.join(","),
      },
    };
  }

  function onAttrClick(e, attr, value) {
    if (getUrlForAttrs(attr, value)) {
      let queryObject = getUrlForAttrs(attr, value).query;
      let url = router.pathname.replace("[type]", query.type) + "?";
      for (let key in queryObject) {
        if (key !== "type") {
          url += key + "=" + queryObject[key] + "&";
        }
      }
      router.push(url);
    }
  }

  return (
    <>
      <aside
        className={`${toggle ? "sidebar-filter" : "sidebar"} sidebar-shop`}
      >
        <div className={toggle ? "sidebar-filter-wrapper" : ""}>
          <div className="widget widget-clean">
            <label>{t("FILTERS")}</label>
            <ALink
              href={{ pathname: router.pathname, query: { type: query.type } }}
              className="sidebar-filter-clear"
              style={{
                marginLeft: "0px !important",
                marginRight: "0px !important",
                marginInlineStart: "auto !important",
                marginInlineEnd: "0px !important",
              }}
              scroll={false}
            >
              {t("CLEAN_ALL")}
            </ALink>
          </div>
          <CategoryList categories={categories} query={query} router={router} />
          <SlideToggle collapsed={false}>
            {({ onToggle, setCollapsibleElement, toggleState }) => (
              <div className="widget widget-collapsible">
                <h3 className="widget-title mb-2">
                  <a
                    href="#Size"
                    className={`${
                      toggleState.toLowerCase() == "collapsed"
                        ? "collapsed"
                        : ""
                    }`}
                    onClick={(e) => {
                      onToggle(e);
                      e.preventDefault();
                    }}
                  >
                    {t("SIZE")}
                  </a>
                </h3>
                <div ref={setCollapsibleElement}>
                  <div className="widget-body pt-0">
                    <div className="filter-items">
                      {shopData.sizes.map((item, index) => (
                        <div className="filter-item" key={index}>
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id={`size-${index + 1}`}
                              onChange={(e) =>
                                onAttrClick(e, "size", item.slug)
                              }
                              checked={
                                containsAttrInUrl("size", item.slug)
                                  ? true
                                  : false
                              }
                            />
                            <label
                              className="custom-control-label"
                              htmlFor={`size-${index + 1}`}
                            >
                              {item.size}
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </SlideToggle>

          <SlideToggle collapsed={false}>
            {({ onToggle, setCollapsibleElement, toggleState }) => (
              <div className="widget widget-collapsible">
                <h3 className="widget-title mb-2">
                  <a
                    href="#colour"
                    className={`${
                      toggleState.toLowerCase() == "collapsed"
                        ? "collapsed"
                        : ""
                    }`}
                    onClick={(e) => {
                      onToggle(e);
                      e.preventDefault();
                    }}
                  >
                    {t("COLOR")}
                  </a>
                </h3>
                <div ref={setCollapsibleElement}>
                  <div className="widget-body pt-0">
                    <div className="filter-colors">
                      {shopData.colors.map((item, index) => (
                        <ALink
                          href={getUrlForAttrs("color", item.color_name)}
                          className={
                            containsAttrInUrl("color", item.color_name)
                              ? "selected"
                              : ""
                          }
                          style={{ backgroundColor: item.color }}
                          key={index}
                          scroll={false}
                        >
                          <span className="sr-only">Color Name</span>
                        </ALink>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </SlideToggle>

          <SlideToggle collapsed={false}>
            {({ onToggle, setCollapsibleElement, toggleState }) => (
              <div className="widget widget-collapsible">
                <h3 className="widget-title mb-2">
                  <a
                    href="#price"
                    className={`${
                      toggleState.toLowerCase() == "collapsed"
                        ? "collapsed"
                        : ""
                    }`}
                    onClick={(e) => {
                      onToggle(e);
                      e.preventDefault();
                    }}
                  >
                    {t("PRICE")}
                  </a>
                </h3>

                <div ref={setCollapsibleElement}>
                  <div className="widget-body pt-0">
                    <div className="filter-price">
                      <div className="filter-price-text d-flex justify-content-between">
                        <span>
                          {t("PRICE_RANGE")}:&nbsp;
                          <span className="filter-price-range">
                            ${priceRange.min} - ${priceRange.max}
                          </span>
                        </span>

                        <ALink
                          href={{
                            pathname: router.pathname,
                            query: {
                              ...query,
                              minPrice: priceRange.min,
                              maxPrice: priceRange.max,
                              page: 1,
                            },
                          }}
                          className="pr-2"
                          scroll={false}
                        >
                          {t("FILTER")}
                        </ALink>
                      </div>

                      <div className="price-slider">
                        <InputRange
                          formatLabel={(value) => `$${value}`}
                          maxValue={10000}
                          minValue={0}
                          step={50}
                          value={priceRange}
                          onChange={onChangePriceRange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </SlideToggle>
        </div>
      </aside>
    </>
  );
}

export default React.memo(ShopSidebarOne);
const CategoryList = ({ categories, query, router }) => {
  const { t } = useTranslation(["shop", "common"]);

  return (
    <SlideToggle collapsed={false}>
      {({ onToggle, setCollapsibleElement, toggleState }) => (
        <div className="widget widget-collapsible">
          <h3 className="widget-title mb-2">
            <a
              href="#"
              className={`${
                toggleState.toLowerCase() == "collapsed" ? "collapsed" : ""
              }`}
              onClick={(e) => {
                onToggle(e);
                e.preventDefault();
              }}
            >
              {t("CATEGORY")}
            </a>
          </h3>
          <div ref={setCollapsibleElement}>
            <div className="widget-body pt-0">
              <div className="filter-items filter-items-count">
                {categories.map((item, index) => (
                  <>
                    {item?.subcategories && item?.subcategories?.length > 0 && (
                      <div className="filter-item" key={`cat_${index}`}>
                        <ALink
                          className={`${
                            query.category == item.name ? "active" : ""
                          }`}
                          href="#"
                          style={{
                            fontSize: "16px",
                            fontWeight: "400",
                          }}
                          scroll={false}
                        >
                          {item.name}
                        </ALink>
                        <div
                          className="mb-2"
                          style={{ marginInlineStart: "20px" }}
                        >
                          {item?.subcategories?.map(
                            (itemSubCategory, subIndex) => (
                              <>
                                <div
                                  className="filter-items filter-items-count"
                                  key={`${itemSubCategory.id}${subIndex}`}
                                >
                                  <ALink
                                    className={`${
                                      query.category == itemSubCategory.name
                                        ? "active"
                                        : ""
                                    }`}
                                    href={{
                                      pathname: router.pathname,
                                      query: {
                                        type: query.type,
                                        subCategory: itemSubCategory.name,
                                      },
                                    }}
                                    scroll={false}
                                  >
                                    {itemSubCategory.name}
                                  </ALink>
                                </div>
                              </>
                            )
                          )}
                        </div>
                      </div>
                    )}
                  </>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </SlideToggle>
  );
};
