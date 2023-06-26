import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { TActionInfo } from "../../utils/types";
import DateRangePickerValue from "../DataRangePicker";
import { useAppSelector, useAppDispatch } from "../../utils/hooks";
import {
    setMethodFilterValue,
    setStatusFilterValue,
    setUrlFilterValue,
    setUserFilterValue,
    selectAuditOfActions,
} from "../../Redux/auditOfActionsSlice";

const styleSX = {
    formControl: { maxWidth: "348px", pb: "12px" },
};

export default function FilterList() {
    const {
        urlFilterValue,
        userFilterValue,
        methodFilterValue,
        statusFilterValue,
        actionsList,
    } = useAppSelector(selectAuditOfActions);
    const dispatch = useAppDispatch();

    const handleChange = (event: SelectChangeEvent, setState: any) => {
        setState(event.target.value as string);
    };

    const urlOptions: string[] = Array.from(
        new Set(
            actionsList.map((row: TActionInfo) => {
                return row.url;
            })
        )
    );
    const userOptions: string[] = Array.from(
        new Set(
            actionsList.map((row: TActionInfo) => {
                return row.user;
            })
        )
    );
    const methodOptions: string[] = Array.from(
        new Set(
            actionsList.map((row: TActionInfo) => {
                return row.method;
            })
        )
    );
    const statusOptions: string[] = Array.from(
        new Set(
            actionsList.map((row: TActionInfo) => {
                return row.status.toString();
            })
        )
    );

    function renderOptions(arr: string[]) {
        let key = 0;
        return arr.map((option: string) => {
            key++;
            return (
                <MenuItem key={key} value={option}>
                    {option}
                </MenuItem>
            );
        });
    }

    return (
        <Box
            sx={{
                width: "100%",
                minWidth: 120,
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    minWidth: 120,
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr 1fr",
                }}
            >
                <FormControl fullWidth sx={styleSX.formControl}>
                    <InputLabel id="fiter-select-url">URL</InputLabel>
                    <Select
                        labelId="fiter-select-url"
                        id="fiter-select-url"
                        value={urlFilterValue}
                        label="URL"
                        onChange={(e) => {
                            dispatch(setUrlFilterValue(e.target.value));
                        }}
                    >
                        <MenuItem value={""}>All</MenuItem>
                        {renderOptions(urlOptions)}
                    </Select>
                </FormControl>
                <FormControl fullWidth sx={styleSX.formControl}>
                    <InputLabel id="fiter-select-user">User</InputLabel>
                    <Select
                        labelId="fiter-select-user"
                        id="fiter-select-user"
                        value={userFilterValue}
                        label="User"
                        onChange={(e) => {
                            dispatch(setUserFilterValue(e.target.value));
                        }}
                    >
                        <MenuItem value={""}>All</MenuItem>
                        {renderOptions(userOptions)}
                    </Select>
                </FormControl>
                <FormControl fullWidth sx={styleSX.formControl}>
                    <InputLabel id="fiter-select-method">Method</InputLabel>
                    <Select
                        labelId="fiter-select-method"
                        id="fiter-select-method"
                        value={methodFilterValue}
                        label="Method"
                        onChange={(e) => {
                            dispatch(setMethodFilterValue(e.target.value));
                        }}
                    >
                        <MenuItem value={""}>All</MenuItem>
                        {renderOptions(methodOptions)}
                    </Select>
                </FormControl>
                <FormControl fullWidth sx={styleSX.formControl}>
                    <InputLabel id="fiter-select-status">Status</InputLabel>
                    <Select
                        labelId="fiter-select-status"
                        id="fiter-select-status"
                        value={statusFilterValue}
                        label="Status"
                        onChange={(e) => {
                            dispatch(setStatusFilterValue(e.target.value));
                        }}
                    >
                        <MenuItem value={""}>All</MenuItem>
                        {renderOptions(statusOptions)}
                    </Select>
                </FormControl>
            </Box>
            <Box
                sx={{
                    width: "100%",
                    minWidth: 120,
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr 1fr",
                }}
            >
                <DateRangePickerValue />
            </Box>
        </Box>
    );
}
