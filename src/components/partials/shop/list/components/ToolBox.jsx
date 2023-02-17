import { useRouter } from "next/router";
import ALink from "~/src/components/features/alink";
import { useTranslation } from "next-i18next";
import { useState } from "react";

export const ToolBox = ({ type, Sort }) => {
  const [value, setValue] = useState(0);
  const router = useRouter();
  const query = router.query;
  const { t } = useTranslation(["shop", "common"]);

  function onSortByChange(e) {
    Sort(e?.target?.value);
    setValue(e?.target?.value);
  }
  return (
    <div className='toolbox'>
      <div
        className='toolbox-right'
        style={{
          width: "100%",
          alignItems: "center",
          justifyContent: "start",
          gap: "10px",
        }}>
        <div className='toolbox-sort'>
          <label
            htmlFor='sortby'
            style={{
              marginRight: "0px !important",
              marginInlineEnd: "1.6rem !important !important",
            }}>
            {t("SORT_BY")}
          </label>
          <div className='select-custom'>
            <select
              name='sortby'
              id='sortby'
              className='form-control'
              onChange={onSortByChange}
              value={value}>
              <option value='0'>
                {router?.locale == "en" ? "Default" : "الافتراضي"}
              </option>

              <option value='2'>
                {router?.locale == "en"
                  ? "Price High to Low"
                  : "السعر الاعلى الى الادنى"}
              </option>
              <option value='1'>
                {router?.locale == "en"
                  ? "Price Low to High"
                  : "السعر من الارخص للاعلى"}
              </option>
            </select>
          </div>
        </div>
        <div
          className='toolbox-layout'
          style={{
            marginLeft: "0px !important",
            marginInlineStart: "1rem !important",
          }}>
          <ALink
            href='/shop/2cols'
            className={`btn-layout ${type == "2cols" ? "active" : ""}`}
            scroll={false}>
            <svg width='10' height='10'>
              <rect x='0' y='0' width='4' height='4' />
              <rect x='6' y='0' width='4' height='4' />
              <rect x='0' y='6' width='4' height='4' />
              <rect x='6' y='6' width='4' height='4' />
            </svg>
          </ALink>

          <ALink
            href='/shop/3cols'
            className={`btn-layout ${type == "3cols" ? "active" : ""}`}
            scroll={false}>
            <svg width='16' height='10'>
              <rect x='0' y='0' width='4' height='4' />
              <rect x='6' y='0' width='4' height='4' />
              <rect x='12' y='0' width='4' height='4' />
              <rect x='0' y='6' width='4' height='4' />
              <rect x='6' y='6' width='4' height='4' />
              <rect x='12' y='6' width='4' height='4' />
            </svg>
          </ALink>
        </div>
      </div>
    </div>
  );
};
