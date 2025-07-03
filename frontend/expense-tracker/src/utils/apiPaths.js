export const BASE_URL = "http://localhost:8000";

export const API_PATHS = {
  AUTH: {
    LOGIN: "/api/v1/auth/login",
    SIGNUP: "/api/v1/auth/signup",
    GET_USER_INFO: "/api/v1/auth/getUser",
    UPDATE_PROFILE: "/api/v1/auth/update-profile",
  },
  DASHBOARD: {
    GET_DATA: "api/v1/dashboard",
  },
  INCOME: {
    ADD_INCOME: "/api/v1/income/add",
    GET_INCOMES: "/api/v1/income/get",
    DELETE_INCOME: (incomeId) => `/api/v1/income/${incomeId}`,
    DOWNLOAD_INCOME: "/api/v1/income/downloadexcel",
  },
  EXPENSE: {
    ADD_EXPENSE: "/api/v1/expense/add",
    GET_ALL_EXPENSES: "/api/v1/expense/get",
    DELETE_EXPENSE: (expenseId) => `/api/v1/expense/${expenseId}`,
    DOWNLOAD_EXPENSE: "/api/v1/expense/downloadexcel",
  },
  IMAGE: {
    UPLOAD_IMAGE: "/api/v1/auth/upload-image",
  },
  INSIGHTS: {
    GET_INSIGHTS: "/api/v1/insights",
  },
};
