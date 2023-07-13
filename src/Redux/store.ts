import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import auditOfActionsReducer from "./auditOfActionsSlice";
import { auditApi } from "./services/auditApi";

export const store = configureStore({
    reducer: {
        auditOfActions: auditOfActionsReducer,
        [auditApi.reducerPath]: auditApi.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(auditApi.middleware);
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
