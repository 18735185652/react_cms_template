import axios from 'axios';
import NProgress from 'nprogress';
import { message } from 'antd';

class HttpRequest {
  constructor() {
    this.baseURL = '/';
    this.timeout = 3000;
    this.queue = {}; // 专门来维护请求队列的
  }

  setInterceptor(instance, url, loading = true) {
    // 每个接口是否需要loading，默认需要展示
    instance.interceptors.request.use((config) => {
      config.headers['Content-Type'] = 'application/json;charset=UTF-8';
      NProgress.start();
      if (Object.keys(this.queue).length === 0 && loading) {
        // 开启loading
        NProgress.start();
      }
      const { CancelToken } = axios;
      config.cancenToken = new CancelToken(() => {
        // c就是取消请求的token
      });
      // 可以记录请求的取消函数
      this.queue[url] = true;
      return config;
    });
    instance.interceptors.response.use(
      (res) => {
        delete this.queue[url];
        if (Object.keys(this.queue).length) {
          // close loading
          NProgress.done();
        }
        message.success('请求成功');
        if (res.status === 200) return res.data;
        return null;
      },
      (err) => {
        delete this.queue[url];
        NProgress.done();
        return Promise.reject(err); // 失败抛出异常错误
      },
    );
  }

  request(options) {
    const instance = axios.create();
    const config = {
      baseURL: this.baseURL,
      timeout: this.timeout,
      onUploadProgress: options.onProgress,
      onDownloadProgress: options.onProgress,
      ...options,
    };
    this.setInterceptor(instance, config.url, config.loading);
    return instance(config); // 产生的是一个promise
  }

  get({ baseURL, url }) {
    const _this = this;
    return function (target, name) {
      target.constructor.prototype[name] = function (data) {
        console.log('url:', this);
        return _this.request({
          // axios.get('/',params:{name:'zs'})
          url: baseURL + url,
          method: 'GET',
          ...data,
        });
      };
      return target;
    };
  }

  post({ baseURL, url }) {
    const _this = this;
    return function (target, name) {
      target.constructor.prototype[name] = function (data) {
        console.log('url:', this);
        return _this.request({
          url: baseURL + url,
          method: 'POST',
          data,
        });
      };
      return target;
    };
  }
}

const myaxios = new HttpRequest();
const get = myaxios.get.bind(myaxios);
const post = myaxios.post.bind(myaxios);

export { get, post, myaxios };