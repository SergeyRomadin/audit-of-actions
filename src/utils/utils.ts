import { RootState } from "../Redux/store";
import { IAuditOfActionsState } from "../Redux/auditOfActionsSlice";
import { TOrder, TKeyOfActionInfo, TActionInfo } from "./types";
import dayjs, { Dayjs } from "dayjs";

export function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

export function getComparator<Key extends keyof any>(
    order: TOrder,
    orderBy: Key
): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string }
) => number {
    return order === "desc"
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

export function stableSort<T>(
    array: readonly T[],
    comparator: (a: T, b: T) => number
) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

export const visibleRows = (
    rows: [],
    order: TOrder,
    orderBy: TOrder,
    page: number,
    rowsPerPage: number
) =>
    stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

export const sortedRows = (
    rows: TActionInfo[],
    order: TOrder,
    orderBy: TKeyOfActionInfo,
    page: number,
    rowsPerPage: number
): TActionInfo[] =>
    stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

const search = (el: TActionInfo, searchFilterValue: string) => {
    let key: TKeyOfActionInfo;
    for (key in el) {
        if (
            el[key]
                .toString()
                .toLowerCase()
                .includes(searchFilterValue.toString().toLowerCase())
        ) {
            return true;
        }
    }
};

export function filterActionsList(
    state: IAuditOfActionsState
): TActionInfo[] | null {
    const {
        urlFilterValue,
        userFilterValue,
        methodFilterValue,
        searchFilterValue,
        statusFilterValue,
        startDateFilterValue,
        endDateFilterValue,
        actionsList,
    } = state;

    if (!actionsList || actionsList.length === 0) return [];

    return actionsList.filter((item) => {
        if (urlFilterValue && urlFilterValue !== item.url) {
            return false;
        }

        if (userFilterValue && userFilterValue !== item.user) {
            return false;
        }

        if (methodFilterValue && methodFilterValue !== item.method) {
            return false;
        }

        if (statusFilterValue && statusFilterValue != item.status) {
            return false;
        }

        if (startDateFilterValue) {
            if (startDateFilterValue - dayjs(item.time).unix() > 0)
                return false;
        }

        if (endDateFilterValue) {
            if (endDateFilterValue - dayjs(item.time).unix() < 0) return false;
        }

        if (searchFilterValue && !search(item, searchFilterValue)) {
            return false;
        }

        return true;
    });
}
