import React, { useEffect, useState } from "react";
import axios from "axios";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";

const useFetch = (url) => {
  const [rowCount, setRowCount] = useState(0);
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const { isLoading, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      axios.get(url, {
        /* params: {
          filter: columnFilters,
        }, */
      }),
  });

  const valstate = {
    columnFilters,
    globalFilter,
    isLoading,
    pagination,
    showAlertBanner: error,
    showProgressBars: isLoading,
    sorting,
  };
  return { data, error, rowCount, valstate, setColumnFilters, setGlobalFilter, setSorting, setPagination };
};

export default useFetch;

/* const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isRefetching, setIsRefetching] = useState(false);
  const [rowCount, setRowCount] = useState(0);
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const valstate = {
    columnFilters,
    globalFilter,
    isLoading,
    pagination,
    showAlertBanner: isError,
    showProgressBars: isRefetching,
    sorting,
  };

  useEffect(() => {
    axios
      .get(url, {
        params: {
          filter: columnFilters,
        },
      })
      .then((result) => {
        setData(result.data);
        setRowCount(result.data.length);
        setIsError(false);
        setIsLoading(false);
        setIsRefetching(false);
      })
      .catch((err) => {
        setIsRefetching(false);
        setIsError(false);
      });
  }, [url, columnFilters, globalFilter, pagination.pageIndex, pagination.pageSize, sorting]);

  return { data, isError, rowCount, valstate, setColumnFilters, setGlobalFilter, setSorting, setPagination };
};

export default useFetch;
 */
