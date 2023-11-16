import { configureStore } from "@reduxjs/toolkit";
import employeesSliceReducer from "../features/Employees";
import rolesSliceReducer from "../features/Roles";
import statusReducer from "../features/Status";

export const store = configureStore({
  reducer: {
    roles: rolesSliceReducer,
    employees: employeesSliceReducer,
    status: statusReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
