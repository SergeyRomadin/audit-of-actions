import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { TKeyOfActionInfo, TActionInfo } from "../utils/types";
import { IPayload } from "../utils/types";
import dayjs, { Dayjs } from "dayjs";

export interface IAuditOfActionsState {
    actionsList: TActionInfo[];
    searchFilterValue: string;
    urlFilterValue: string;
    userFilterValue: string;
    methodFilterValue: string;
    statusFilterValue: number | string;
    startDateFilterValue: number | null;
    endDateFilterValue: number | null;
}

const initialState: IAuditOfActionsState = {
    actionsList: [],
    searchFilterValue: "",
    urlFilterValue: "",
    userFilterValue: "",
    methodFilterValue: "",
    statusFilterValue: "",
    startDateFilterValue: null,
    endDateFilterValue: null,
};

export const auditOfActionsSlice = createSlice({
    name: "auditOfActions",
    initialState,
    reducers: {
        // setValue: (state, action) => {
        //     const payload: IPayload = action.payload;
        //     state[payload.name] = action.payload.value;
        // },

        setActionsList: (state, action) => {
            state.actionsList = action.payload;
        },

        setSearchFilterValue: (state, action) => {
            state.searchFilterValue = action.payload;
        },

        setUrlFilterValue: (state, action) => {
            state.urlFilterValue = action.payload;
        },

        setUserFilterValue: (state, action) => {
            state.userFilterValue = action.payload;
        },

        setMethodFilterValue: (state, action) => {
            state.methodFilterValue = action.payload;
        },

        setStatusFilterValue: (state, action) => {
            state.statusFilterValue = action.payload;
        },

        setStartDateFilterValue: (state, action) => {
            state.startDateFilterValue = action.payload;
        },

        setEndDateFilterValue: (state, action) => {
            state.endDateFilterValue = action.payload;
        },
    },
});

export const {
    setMethodFilterValue,
    setSearchFilterValue,
    setStatusFilterValue,
    setUrlFilterValue,
    setUserFilterValue,
    setActionsList,
    setEndDateFilterValue,
    setStartDateFilterValue,
} = auditOfActionsSlice.actions;

export const selectAuditOfActions = (state: RootState) => state.auditOfActions;

export default auditOfActionsSlice.reducer;
