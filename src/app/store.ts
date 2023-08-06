import employeesSliceReducer from '../features/Employees';
import { configureStore } from '@reduxjs/toolkit'
import rolesSliceReducer from '../features/Roles'
import rolesFlatSliceReducer from '../features/RolesFlat';

export const store = configureStore({
  reducer: {
    roles: rolesSliceReducer,
    rolesFlat: rolesFlatSliceReducer,
    employees: employeesSliceReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
