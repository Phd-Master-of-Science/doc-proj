import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";

import { fetchRandomUser } from "../api/fetchRandomUser";
import { fetchRandomAction } from "../api/fetchRandomAction";
import { fetchDirectories } from "../api/fetchDirectories";
import { Drawer } from "./Drawer";
import { handleToggleDrawer } from "./handleToggleDrawer";
import { columns } from "./columns";

export const DirectoriesTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [data, setData] = useState(null);
  const [timeResponse, setTimeResponse] = useState(0);
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
    dataFetch(0, event.target.value);
  };

  const dataFetch = async (p, r) => {
    const responseRandomUser = await fetchRandomUser();
    const responseAction = await fetchRandomAction();

    const start = new Date();
    const response = await fetchDirectories(
      responseAction,
      responseRandomUser,
      p,
      r
    );
    setTimeResponse(new Date() - start);

    setData(response);
  };

  useEffect(() => {
    dataFetch(page, rowsPerPage);
  }, [page, rowsPerPage]);

  const toggleDrawer = handleToggleDrawer(setState, state);

  if (!data) return <LinearProgress color="primary" />;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.rows.length) : 0;

  return (
    <Paper>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  <strong>{column.label}</strong>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                     <TableCell>
                      <i>
                        <strong style={{ color: "#0080ff" }}>
                          {row.category}
                        </strong>
                      </i>
                    </TableCell>
                    <TableCell>
                      <Typography
                        style={{ textDecoration: "none", boxShadow: "none" }}
                        component={Link}
                        to={`/documents/${row.documentId}`}
                      >
                        {row.title}
                      </Typography>
                    </TableCell>
                    <TableCell>{row.editor}</TableCell>
                    <TableCell>{row.publisher}</TableCell>
                    <TableCell>{row.lastUpdateDate}</TableCell>
                  </TableRow>
                );
              })}

            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={data.rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <div>
        <Fragment key={"bottom"}>
          <Button variant="contained" onClick={toggleDrawer("bottom", true)}>
            Response results
          </Button>
          <SwipeableDrawer
            anchor={"bottom"}
            open={state["bottom"]}
            onClose={toggleDrawer("bottom", false)}
            onOpen={toggleDrawer("bottom", true)}
          >
            <Drawer resTime={timeResponse} toggleDrawer={toggleDrawer} />
          </SwipeableDrawer>
        </Fragment>
      </div>
    </Paper>
  );
};
