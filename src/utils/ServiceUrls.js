const baseUrl = "http://hagarfreetr-001-site1.atempurl.com/api/";
export const APIS = {
  AUTH: {
    SIGNIN: `${baseUrl}account/login`,
    REGISTER: `${baseUrl}account/register`,
  },
  PRODUCTS: {
    LIST: `${baseUrl}product/getall`,
    GET: (id) => `${baseUrl}product/getbyid?id=${id}`,
  },
  CATEGORIES: {
    LIST: `${baseUrl}category/getall`,
  },
  SUBCATEGORIES: {
    LIST: `${baseUrl}subcategory/getall`,
  },
  UTILS: {
    LINKS: `${baseUrl}redirections/get`,
  },
  CART: {
    ADD: `${baseUrl}cart/add`,
    GET: `${baseUrl}cart/getuser`,
    DELETE: `${baseUrl}cart/delete`,
    UPDATE: `${baseUrl}cart/update`,
  },
};
