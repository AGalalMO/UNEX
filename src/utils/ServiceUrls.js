const baseUrl = "http://imustafaaaa-001-site1.btempurl.com/api/";
export const APIS = {
  AUTH: {
    SIGNIN: `${baseUrl}account/login`,
    REGISTER: `${baseUrl}account/register`,
  },
  PRODUCTS: {
    LIST: `${baseUrl}product/getall`,
    GET: (id) => `${baseUrl}product/getbyid?id=${id}`,
    filter: `${baseUrl}product/filter`,
    byCat: (id) => `${baseUrl}product/getbycategoryid?categoryid=${id}`,
    newArrival: `${baseUrl}product/getbydate`,
    sale: `${baseUrl}product/getonsale`,
  },
  CATEGORIES: {
    LIST: `${baseUrl}category/getall`,
  },
  SUBCATEGORIES: {
    LIST: `${baseUrl}subcategory/getall`,
  },
  UTILS: {
    LINKS: `${baseUrl}redirections/get`,
    DELIVERY_CITIES: `${baseUrl}order/Getcities`,
  },
  CART: {
    ADD: `${baseUrl}cart/add`,
    GET: `${baseUrl}cart/getuser`,
    DELETE: `${baseUrl}cart/delete`,
    UPDATE: `${baseUrl}cart/update`,
  },
  ORDER: {
    PLACE_ORDER: `${baseUrl}order/makeorder`,
    get: `${baseUrl}order/getuser`,
    CANCEL: `${baseUrl}order/cancel`,
  },
};
