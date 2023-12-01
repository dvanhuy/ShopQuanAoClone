import { BASE_URL } from '../config';
import { getData } from './services';

function search(searchStr = '', limit = 4) {
  const url =
    BASE_URL + `products/search?searchStr=${searchStr.trim()}&limit=${limit}`;
  return getData(url);
}

function filterProducts(filter) {
  const url = BASE_URL + `products/filter`;
  return getData(url, 'post', filter);
}
function getColors() {
  const url = BASE_URL + `color`;
  return getData(url);
}
function getSizes() {
  const url = BASE_URL + `size`;
  return getData(url);
}

function getMaxPrice() {
  const url = BASE_URL + `max-price`;
  return getData(url);
}

function getNewProducts(limit = 4, cateId = 0) {
  const url =
    BASE_URL + `products/new_products?limit=${limit}&cateId=${cateId}`;
  return getData(url);
}

function getWeeklyBestProducts(limit = 4, cateId = 0) {
  const url = BASE_URL + `products/weekly_best?limit=${limit}&cateId=${cateId}`;
  return getData(url);
}

function getDetail(productId = 0) {
  const url = BASE_URL + `products/detail?productId=${productId}`;
  return getData(url);
}

export {
  search,
  getNewProducts,
  getWeeklyBestProducts,
  filterProducts,
  getSizes,
  getColors,
  getMaxPrice,
  getDetail
};
