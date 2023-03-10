import axios from "axios";
import { useQuery } from "@tanstack/react-query";
/* import { toast } from "react-toastify"; */
const baseURL = "http://localhost:9000";

const User = {
  Get: (props) => {
    const pagination = { pageIndex: props.pageIndex, pageSize: props.pageSize };
    const { data, isError, isFetching, isLoading, refetch } = useQuery({
      queryKey: [props],
      queryFn: async () => {
        const res = await axios.get(`${baseURL}/user`, {
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
    const res = axios.post(`${baseURL}/user`, formData);
    return res;
  },
  Update: (formData) => {
    const res = axios.put(`${baseURL}/user`, formData);
    console.log(res);
    return res;
  },
  Delete: (permitNum) => {
    var a = permitNum;
    /* const res = axios.delete(`${baseURL}/permit`, { params: { permitNum: permitNum } }); */
    const res = axios.delete(`${baseURL}/user/${a}`);
    /* console.log(res); */
    return res;
  },
};

export const Con = User;
