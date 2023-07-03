import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useAppDispatch } from "../../utils/hooks";
import {
    setStartDateFilterValue,
    setEndDateFilterValue,
} from "../../Redux/auditOfActionsSlice";
import { Box } from "@mui/material";

const DATA_PICKER_SX = {
    width: "100%",
    pb: "12px",
};

const DASH_SX = {
    background: "black",
    position: "absolute",
    left: "25%",
    top: "50%",
    height: "2px",
    width: "5px",
    transform: "translate(-100%, -8px)",
};

export default function DateRangePickerValue() {
    const [startDate, setStartDate] = React.useState<Dayjs | null>(null);
    const [endDate, setEndDate] = React.useState<Dayjs | null>(null);
    const dispatch = useAppDispatch();

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                sx={DATA_PICKER_SX}
                label="Start date"
                value={startDate}
                onChange={(newValue) => {
                    setStartDate(newValue);
                    dispatch(setStartDateFilterValue(newValue?.unix()));
                }}
            />
            <Box sx={DASH_SX} />
            <DatePicker
                sx={DATA_PICKER_SX}
                label="End date"
                value={endDate}
                onChange={(newValue) => {
                    setEndDate(newValue);
                    dispatch(setEndDateFilterValue(newValue?.unix()));
                }}
            />
        </LocalizationProvider>
    );
}
