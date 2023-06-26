import React, { useState, useCallback, useMemo, useEffect } from "react";
import { Table } from "./styledComponents";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import { sortedRows, filterActionsList } from "../../utils/utils";
import { TKeyOfActionInfo, TActionInfo, ISortParams } from "../../utils/types";
import CollapsedTableHead from "../CollapsedTableHead";
import Row from "../CollapsedTableRow";
import CollapsedToolbar from "../CollapsedToolbar";
import { useAppSelector, useAppDispatch } from "../../utils/hooks";
import {
    selectAuditOfActions,
    setActionsList,
} from "../../Redux/auditOfActionsSlice";
import { actionsApi } from "../../Redux/services/actionsApi";

export default function CollapsibleTable() {
    const [sort, setSort] = useState<ISortParams>({
        order: "asc",
        orderBy: "time",
    });
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const handleRequestSort = useCallback(
        (property: TKeyOfActionInfo) => {
            const isAsc = sort.orderBy === property && sort.order === "asc";
            setSort(
                isAsc
                    ? { order: "desc", orderBy: property }
                    : { order: "asc", orderBy: property }
            );
        },
        [sort]
    );
    const { data, isError, isLoading } =
        actionsApi.useFetchActionsListQuery("");
    const dispatch = useAppDispatch();
    const auditOfActionsState = useAppSelector(selectAuditOfActions);
    const {
        urlFilterValue,
        userFilterValue,
        methodFilterValue,
        searchFilterValue,
        statusFilterValue,
        startDateFilterValue,
        endDateFilterValue,
        actionsList,
    } = auditOfActionsState;

    useEffect(() => {
        dispatch(setActionsList(data));
    }, [data]);

    const filteredRows: Array<TActionInfo> = useMemo(() => {
        return filterActionsList(auditOfActionsState);
    }, [auditOfActionsState]);

    const visibleRows: Array<TActionInfo> | null = React.useMemo(() => {
        if (!filteredRows || filteredRows.length === 0) {
            return [];
        }
        return sortedRows(
            filteredRows,
            sort.order,
            sort.orderBy,
            page,
            rowsPerPage
        );
    }, [filteredRows, sort, page, rowsPerPage]);

    return (
        <TableContainer
            sx={{ width: "100vw", position: "relative" }}
            component={Paper}
        >
            <CollapsedToolbar />
            {isError && (
                <h2 style={{ textAlign: "center", color: "red" }}>
                    Error {isError}
                </h2>
            )}
            {isLoading ? (
                <h2 style={{ textAlign: "center" }}>Loading...</h2>
            ) : (
                <Table aria-label="collapsible table">
                    <CollapsedTableHead
                        order={sort.order}
                        orderBy={sort.orderBy}
                        onRequestSort={handleRequestSort}
                    />
                    <TableBody>
                        {visibleRows.map((row, index) => {
                            return <Row key={index} row={row} />;
                        })}
                    </TableBody>
                </Table>
            )}
        </TableContainer>
    );
}
