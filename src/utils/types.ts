import { createData } from "../mock/utils";

export type TOrder = "asc" | "desc";

export type TMockData = ReturnType<typeof createData>;

export type TKeyofMockData = keyof TMockData;

export interface IHeadCell {
    disablePadding: boolean;
    id: TKeyofMockData;
    label: string;
    numeric: boolean;
}

export interface ICollapsedTableProps {
    onRequestSort: (
        event: React.MouseEvent<unknown>,
        property: TKeyofMockData
    ) => void;
    order: TOrder;
    orderBy: string;
}
