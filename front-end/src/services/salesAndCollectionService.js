import { BASE_URL } from '../config';
import { getData } from './services';

function getBanner() {
  const url = BASE_URL + `banner`;
  return getData(url);
}

function getSales(salesId, start) {
  const url = BASE_URL + `sales?salesId=${salesId}&start=${start}`;
  return getData(url);
}

function getProductsSales(salesId, size, cateId, start) {
  const url =
    BASE_URL +
    `productsSales?salesId=${salesId}&size=${size}&cateId=${cateId}&start=${start}`;
  return getData(url);
}

function getCollection(collectionId, start) {
  const url =
    BASE_URL + `collections?collectionId=${collectionId}&start=${start}`;
  return getData(url);
}

function getProductsCollection(collectionId, start) {
  const url =
    BASE_URL + `productsCollection?collectionId=${collectionId}&start=${start}`;
  return getData(url);
}

export {
  getBanner,
  getSales,
  getProductsSales,
  getCollection,
  getProductsCollection
};
