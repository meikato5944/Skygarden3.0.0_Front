import { initialListData, initialUserListData, ListData, UserListData } from "../types";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const sortList = () => {
  const sort = document.getElementById("sort") as HTMLSelectElement;
  if (sort) {
    const sortValue = sort.value;
    const params = new URLSearchParams(window.location.search);
    const modeValue = params.get("mode") || "";
    const pageValue = params.get("page") || "";
    const url = window.location.pathname;
    window.location.href = url + "?mode=" + modeValue + "&sort=" + sortValue + "&page=" + pageValue;
  }
};

export const fetchListData = (isContent: boolean): Promise<ListData | UserListData> => {
  const params = new URLSearchParams(window.location.search);
  const mode = params.get("mode") || "";
  const sort = params.get("sort") || "";
  const page = params.get("page") || "";
  let url = "";
  if (isContent) {
    url = `${API_BASE_URL}/getlist?mode=${mode}&sort=${sort}&page=${page}`;
  } else {
    url = `${API_BASE_URL}/getlist-user?sort=${sort}&page=${page}`;
  }
  return fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      if (isContent) {
        return initialListData;
      } else {
        return initialUserListData;
      }
    });
};
