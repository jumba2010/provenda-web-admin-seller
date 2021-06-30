import request from '@/utils/request';
import {baseURL} from '../../services/auth'
export async function queryRule(params) {

  return request(`${baseURL}/api/product/1`, {
    params,
  });
}

export async function findProductById(id) {
  return request(`${baseURL}/api/product/unique/${id}`);
}

export async function findCategoriesBySucursal(){
  return request(`${baseURL}/api/category/1`);
}

export async function findUnitiesBySucursal() {
  return request(`${baseURL}/api/unity/1`);
}

export async function findTaxesBySucursal() {
  return request(`${baseURL}/api/tax/1`);
}
export async function addTax(params) {
  return request(`${baseURL}/api/tax/`, {
    method: 'POST',
    data: { ...params, method: 'post' },
  });
}

export async function addProduct(params) {
  return request(`${baseURL}/api/product/`, {
    method: 'POST',
    data: { ...params, method: 'post' },
  });
}

export async function removeRule(params) {
  return request(`${baseURL}/api/product/`, {
    method: 'POST',
    data: { ...params, method: 'delete' },
  });
}

export async function updateRule(params) {
  return request(`${baseURL}/api/product/`, {
    method: 'POST',
    data: { ...params, method: 'update' },
  });
}
