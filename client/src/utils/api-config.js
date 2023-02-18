import axios from 'axios'

const devOrigin = [
  'http://127.0.0.1:3000',
  'http://localhost:3000'
]
let baseURL = ''
if (devOrigin.includes(window.location.origin)) baseURL = 'http://localhost:4000/api/'
else baseURL = `${window.location.origin}/api`
const request = axios.create({
  baseURL: baseURL
})

export default request


const api_laptop = [
  "https://tiki.vn/api/v2/products?limit=40&include=advertisement&aggregations=2&trackity_id=87bffd52-cc74-68e0-5fd3-239a5f9665bf&q=laptop+gaming&page=2",
  "https://tiki.vn/api/v2/products?limit=40&include=advertisement&aggregations=2&trackity_id=87bffd52-cc74-68e0-5fd3-239a5f9665bf&q=laptop+gaming",
  "https://tiki.vn/api/v2/products?limit=40&include=advertisement&aggregations=2&trackity_id=87bffd52-cc74-68e0-5fd3-239a5f9665bf&q=laptop+gaming&page=3",
  "https://tiki.vn/api/v2/products?limit=40&include=advertisement&aggregations=2&trackity_id=87bffd52-cc74-68e0-5fd3-239a5f9665bf&q=maxbook&sort=price,desc",
]
const api_phone = [
  "https://tiki.vn/api/personalish/v1/blocks/listings?limit=40&include=advertisement&aggregations=2&trackity_id=87bffd52-cc74-68e0-5fd3-239a5f9665bf&category=1789&page=1&urlKey=dien-thoai-may-tinh-bang",
  "https://tiki.vn/api/v2/products?limit=40&include=advertisement&aggregations=2&trackity_id=87bffd52-cc74-68e0-5fd3-239a5f9665bf&q=%C4%91ien+thoai",
  "https://tiki.vn/api/v2/products?limit=40&include=advertisement&aggregations=2&trackity_id=87bffd52-cc74-68e0-5fd3-239a5f9665bf&q=%C4%91ien+thoai&page=2",
  "https://tiki.vn/api/v2/products?limit=40&include=advertisement&aggregations=2&trackity_id=87bffd52-cc74-68e0-5fd3-239a5f9665bf&q=%C4%91ien+thoai&page=3",
]
const api_details_product = "https://tiki.vn/api/v2/products/ id product?"