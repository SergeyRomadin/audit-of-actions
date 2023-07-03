import React, { useState } from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import { TableCell, TableRow } from "./styledComponents";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import StatusCode from "../StatusCode";
import TelegramIconLink from "../TelegramIconLink";
import CopyIconBtn from "../CopyIconBtn";
import { TActionInfo } from "../../utils/types";

export default function CollapsedTableRow(props: {
    row: TActionInfo;
    handleOpenCopySB: () => void;
    handleCloseCopySB: () => void;
}) {
    const { row, handleOpenCopySB, handleCloseCopySB } = props;
    const [open, setOpen] = useState(false);

    const styleSX = {
        cellContainer: {
            paddingTop: "10px",
            paddingBottom: "10px",
            display: "flex",
            flexWrap: "nowrap",
            alignItems: "start",
        },
        tableCollapse: {
            paddingLeft: "8px",
        },
        leftColumn: {
            paddingLeft: "2px",
            display: "flex",
            alignItems: "center",
            minHeight: "40px",
        },
        rightColumn: {
            paddingLeft: "8px",
            display: "flex",
            alignItems: "center",
            minHeight: "40px",
        },
        collapse: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        },
        pb0: {
            paddingBottom: 0,
        },
        centerColumn: {
            display: "flex",
            alignItems: "center",
            minHeight: "60px",
        },
        urlColumn: {
            width: "208px",
            wordBreak: "break-all",
        },
    };

    const collapsedSize = "40px";

    const paddingBott = open ? null : styleSX.pb0;

    function handlerCopy(text: string) {
        navigator.clipboard.writeText(text);
    }

    return (
        <React.Fragment>
            <TableRow>
                <TableCell sx={{ maxWidth: "120px" }} align="left">
                    <Box sx={styleSX.centerColumn}>{row.time}</Box>
                </TableCell>
                <TableCell sx={{ maxWidth: "240px" }} align="left">
                    <Box sx={{ ...styleSX.centerColumn, ...styleSX.urlColumn }}>
                        {row.url}
                    </Box>
                </TableCell>
                <TableCell align="right">
                    <Box sx={styleSX.cellContainer}>
                        <Box sx={styleSX.leftColumn}>
                            <TelegramIconLink />
                        </Box>
                        <Box sx={styleSX.rightColumn}>{row.user}</Box>
                    </Box>
                </TableCell>
                <TableCell align="left">
                    <Box sx={{ ...styleSX.cellContainer, ...paddingBott }}>
                        <Box sx={styleSX.leftColumn}>
                            <CopyIconBtn
                                handlerCopy={() => {
                                    handlerCopy(row.payload);
                                    handleOpenCopySB();
                                }}
                            />
                        </Box>
                        <Box sx={styleSX.rightColumn}>
                            <Collapse
                                sx={{ ...styleSX.tableCollapse, width: "100%" }}
                                collapsedSize={open ? collapsedSize : 50}
                                in={open}
                                timeout="auto"
                            >
                                {row.payload}
                            </Collapse>
                        </Box>
                    </Box>
                </TableCell>
                <TableCell align="left">
                    <Box sx={{ ...styleSX.cellContainer, ...paddingBott }}>
                        <Box sx={styleSX.leftColumn}>
                            <CopyIconBtn
                                handlerCopy={() => {
                                    handlerCopy(row.response);
                                    handleOpenCopySB();
                                }}
                            />
                        </Box>
                        <Box sx={styleSX.rightColumn}>
                            <Collapse
                                sx={styleSX.tableCollapse}
                                collapsedSize={open ? collapsedSize : 50}
                                in={open}
                                timeout="auto"
                            >
                                {row.response}
                            </Collapse>
                        </Box>
                    </Box>
                </TableCell>
                <TableCell align="left">
                    <Box sx={{ ...styleSX.cellContainer, ...paddingBott }}>
                        <Box sx={styleSX.leftColumn}>
                            <CopyIconBtn
                                handlerCopy={() => {
                                    handlerCopy(row.context);
                                    handleOpenCopySB();
                                }}
                            />
                        </Box>
                        <Box sx={styleSX.rightColumn}>
                            <Collapse
                                sx={styleSX.tableCollapse}
                                collapsedSize={open ? collapsedSize : 50}
                                in={open}
                                timeout="auto"
                            >
                                {row.context}
                            </Collapse>
                        </Box>
                    </Box>
                </TableCell>
                <TableCell align="left">
                    <Box sx={styleSX.centerColumn}>{row.method}</Box>
                </TableCell>
                <TableCell align="right">
                    <Box sx={styleSX.centerColumn}>
                        <StatusCode statusCode={row.status} />
                    </Box>
                </TableCell>
                <TableCell sx={{ verticalAlign: "middle", padding: 0 }}>
                    <Collapse
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                        collapsedSize={collapsedSize}
                        in={open}
                        timeout="auto"
                    >
                        <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => setOpen(!open)}
                        >
                            {open ? (
                                <KeyboardArrowUpIcon />
                            ) : (
                                <KeyboardArrowDownIcon />
                            )}
                        </IconButton>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}
