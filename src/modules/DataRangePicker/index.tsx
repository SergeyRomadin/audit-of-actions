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

const styleSX = {
    width: "100%",
    maxWidth: "348px",
    pb: "12px",
};

export default function DateRangePickerValue() {
    const [startDate, setStartDate] = React.useState<Dayjs | null>(null);
    const [endDate, setEndDate] = React.useState<Dayjs | null>(null);
    const dispatch = useAppDispatch();

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                sx={styleSX}
                label="Start date"
                value={startDate}
                onChange={(newValue) => {
                    setStartDate(newValue);
                    dispatch(setStartDateFilterValue(newValue?.unix()));
                }}
            />
            <DatePicker
                sx={styleSX}
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
