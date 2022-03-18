import * as React from 'react';
import {useState} from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import EnhancedTableToolbar from "./EnhancedTableToolbar";
import EnhancedTableHead from "./EnhancedTableHead";
import {v4} from "uuid";
import {Alert} from "@mui/lab";
import {Grid, TextField} from "@mui/material";

export const createHeader = (id, label) => {
  return {id, label}
};

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function getHeaderId(headers = []) {
  return headers.map((item) => {
    return item.id
  })
}

function filter(array, term = '', headers = []) {
  const ids = getHeaderId(headers);
  if (term !== '') {
    return array.filter((item) => {
      for (let i = 0; i < ids.length; i++) {
        if (item[ids[i]]
          && String(item[ids[i]])
            .toLowerCase()
            .indexOf(term.toLowerCase()) > -1
        ) {
          return true
        }
      }
      return false;
    });
  }
  return array;
}

const center = {
  sx: {textAlign: 'center'}
};


//Componente TABLA
export default function TableFront(
  {
    headers,
    rows,
    title,
    handleSelect,
    selectAll = true,
    rowSelected = [],
    handleSelectAll
  }) {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const [selected, setSelected] = useState(rowSelected ?? []);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [term, setTerm] = useState('');

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    const {checked} = event.target;
    handleSelectAll(checked)
    if (checked) {
      const newSelected = rows.map((row) => {
        return row.id;
      });
      return setSelected(newSelected);
    }
    return setSelected([]);
  };

  const handleClick = (event, name, row) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
    handleSelect(event.target.checked, row)
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{width: '100%'}}>
      {rows?.length ? <>
          <Paper sx={{width: '100%', mb: 2}}>
            <Grid container spacing={2}>
              <Grid item xs={7}>
                <EnhancedTableToolbar title={title} numSelected={selected.length}/>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  size={'small'}
                  value={term}
                  onChange={(e) => setTerm(e.target.value)}
                  placeholder={'Buscar en la tabla'}
                />
              </Grid>
            </Grid>
            <TableContainer>
              <Table
                sx={{minWidth: 750}}
                aria-labelledby="tableTitle"
                size={dense ? 'small' : 'medium'}
              >
                <EnhancedTableHead
                  numSelected={selected.length}
                  selectAll={selectAll}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={rows.length}
                  headCells={headers}
                />

                <TableBody>
                  {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
                  {stableSort(filter(rows, term, headers), getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      const isItemSelected = isSelected(row.id);
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <TableRow
                          hover
                          onClick={(event) => handleClick(event, row.id, row)}
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={row.id}
                          selected={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              color="primary"
                              checked={isItemSelected}
                              inputProps={{
                                'aria-labelledby': labelId,
                              }}
                            />
                          </TableCell>
                          {headers.map((head) => <TableCell {...center} key={v4()}>{row[head.id]}</TableCell>)}
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow
                      style={{
                        height: (dense ? 33 : 53) * emptyRows,
                      }}
                    >
                      <TableCell colSpan={6}/>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, rows.length && rows.length > 25 ? rows.length : 30]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
          <FormControlLabel
            control={<Switch checked={dense} onChange={handleChangeDense}/>}
            label="Vista compacta"
          />
        </>
        : <Alert>No hay datos para mostrar</Alert>}
    </Box>
  );
}
