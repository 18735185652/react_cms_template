import { get, post } from '../utils/request';

const baseURL = 'http://localhost:8082';
class API {
  @get({ baseURL, url: '/api/heros' })
  getList

  @post({ baseURL, url: '/xxx/post' })
  create
}

const api = new API();

export default api;