import axios from "axios";

const accessToken = localStorage.getItem("access_token");


export const useHttp = () => {
  const client = axios.create({
    withCredentials: true,
    baseURL: import.meta.env.VUE_APP_API_URL || "http://localhost:8000",
    headers: {
      "Content-Type": "multipart/form-data",
      "X-Requested-With": "XMLHttpRequest",
      'Authorization': `Bearer ${accessToken}`,
    },
  });

  const get = (url, params) => client.get(url, { params });
  const post = (url, data, params) => client.post(url, data, { params });
  const put = (url, data, params) => client.put(url, data, { params });
  const patch = (url, data, params) => client.patch(url, data, { params });
  const destroy = (url, params) => client.delete(url, { params });

  return {
    get,
    post,
    put,
    patch,
    destroy,
  };
}


