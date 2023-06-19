import axios from "axios";
import { useQuery } from "@tanstack/react-query";
const baseURL = "http://localhost:9000";

const Permit = {
  Get: (props) => {
    const pagination = { pageIndex: props.pageIndex, pageSize: props.pageSize };
    const { data, isError, isFetching, isLoading, refetch } = useQuery({
      queryKey: [props],
      queryFn: async () => {
        const res = await axios.get(`${baseURL}/permit`, {
          params: {
            pageIndex: props.pageIndex,
            pageSize: props.pageSize,
            colFilters: props.colFilters,
          },
        });

        return res;
      },
    });
    return { data, isError, isFetching, isLoading, refetch, pagination };
  },
  Add: (formData) => {
    const res = axios.post(`${baseURL}/permit`, formData).then();

    return res;
  },
  Update: (formData) => {
    console.log(formData);
    const res = axios
      .put(`${baseURL}/permit`, formData)
      .then((response) => {
        console.log("response=" + response);
      })
      .catch(function (error) {
        if (error.response) {
          // get response with a status code not in range 2xx
          console.log("appError" + error.response.data);
          console.log("appError" + error.response.status);
          console.log("appError" + error.response.headers);
        } else if (error.request) {
          // no response
          console.log(error.request);
          // instance of XMLHttpRequest in the browser
          // instance ofhttp.ClientRequest in node.js
        } else {
          // Something wrong in setting up the request
          console.log("Error", error);
        }
        console.log(error.config);
      });

    return res;
  },
  Delete: (permitNum) => {
    return axios.delete(`${baseURL}/permit/${permitNum}`);
    /* const res = axios.delete(`${baseURL}/permit`, { params: { permitNum: permitNum } }); */
    /*    const res = axios.delete(`${baseURL}/permit/${permitNum}`);
    console.log(res);
    return res;
 */

    /*  return async () => {
      var d = await axios.delete(`${baseURL}/permit/${permitNum}`);
      return d;
    }; */
  },
  UploadAdd: async (formData) => {
    const res = await axios.put(`${baseURL}/permit`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return res;
  },
};
export const Con = Permit;
