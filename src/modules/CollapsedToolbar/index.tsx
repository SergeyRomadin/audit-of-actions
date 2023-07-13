import React, { useState } from "react";
import {
    ToolbarContainer,
    Toolbar,
    Typography,
    IconButton,
} from "./styledComponents";
import FilterListIcon from "@mui/icons-material/FilterList";
import Search from "../Search";
import RefreshIconBtn from "../RefreshIconBtn";
import FilterList from "../FilterList";
import { auditApi } from "../../Redux/services/auditApi";

export default function CollapsedToolbar() {
    const [openFilterList, setOpenFilterList] = useState(false);
    const { refetch } = auditApi.useFetchActionsListQuery("");
    function handleRefresh() {
        refetch();
    }

    return (
        <ToolbarContainer>
            <Toolbar>
                <RefreshIconBtn handleRefresh={handleRefresh} />
                <Typography variant="h6" id="tableTitle" component="div">
                    Audit of actions
                </Typography>
                <Search />
                <IconButton onClick={() => setOpenFilterList(!openFilterList)}>
                    <FilterListIcon />
                </IconButton>
            </Toolbar>
            {openFilterList && (
                <Toolbar>
                    <FilterList />
                </Toolbar>
            )}
        </ToolbarContainer>
    );
}
