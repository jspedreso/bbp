import axios from "axios";
import { useQuery } from "@tanstack/react-query";
const baseURL = "http://localhost:9000";

const Login = {
  Add: async (formData) => {
    const res = await axios.post(`${baseURL}/login`, formData).then();
    return res.data;
  },
  /* Add: (formData) => { 
    const res = axios.post(`${baseURL}/permit`, formData).then();

    return res;
  },
  Update: (formData) => {
    const res = axios
      .put(`${baseURL}/permit`, formData)
      .then((response) => {
        console.log("response=" + response);
      })
      .catch(function (error) {
        if (error.response) {
          console.log("appError" + error.response.data);
          console.log("appError" + error.response.status);
          console.log("appError" + error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error);
        }
        console.log(error.config);
      });

    return res;
  },
  Delete: (permitNum) => {
    return axios.delete(`${baseURL}/permit/${permitNum}`);
  },
  UploadAdd: async (formData) => {
    const res = await axios.put(`${baseURL}/permit`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return res;
  }, */
};
export const Con = Login;
