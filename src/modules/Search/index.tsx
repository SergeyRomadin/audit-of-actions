import React from "react";
import {
    StyledInput,
    SearchContainer,
    SearchIconWrapper,
} from "./styledComponents";
import SearchIcon from "@mui/icons-material/Search";
import { useAppSelector, useAppDispatch } from "../../utils/hooks";
import {
    setSearchFilterValue,
    selectAuditOfActions,
} from "../../Redux/auditOfActionsSlice";

export default function Search() {
    const dispatch = useAppDispatch();
    const { searchFilterValue } = useAppSelector(selectAuditOfActions);

    return (
        <SearchContainer>
            <StyledInput
                placeholder="Search"
                inputProps={{ "aria-label": "search" }}
                value={searchFilterValue}
                onChange={(e) => dispatch(setSearchFilterValue(e.target.value))}
            />
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>
        </SearchContainer>
    );
}
