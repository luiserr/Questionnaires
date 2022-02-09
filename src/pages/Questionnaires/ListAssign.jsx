import React from 'react'
import { useState } from 'react';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { formik } from 'formik'
import * as Yup from 'yup'
import {
  Card,
  Table,
  Stack,
  Button,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import { Link as RouterLink } from 'react-router-dom';
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DatePicker from '@mui/lab/DatePicker'
import Label from '../../components/Label';
import ASSIGNLIST from '../../utils/assigns';
import { ListAssignsHead } from '../../components/Questionnaires/Assigns/ListAssignsHead';
import AssignsMoreMenu from '../../components/Questionnaires/Assigns/AssignsMoreMenu';
import AssignsListToolbar from '../../components/Questionnaires/Assigns/AssignsListToolbar';
import SearchNotFound from '../../components/Questionnaires/Assigns/SearchNotFound';

const TABLE_HEAD = [
  { id: 'title', label: 'Titulo', alignRight: false },
  { id: 'status', label: 'Estado', alignRight: false },
  { id: 'fichas', label: 'Fichas', alignRight: false },
  { id: 'dateCreate', label: 'Fecha de creación', alignRight: false },
  { id: 'numUserSend', label: 'Número de usuarios', alignRight: false },
  { id: 'numUserResponse', label: 'Número de respuestas', alignRight: false },
  { id: 'rangeActivate ', label: 'Rango de Activación', alignRight: false },
  { id: 'actionsControl', label: 'Acciones', alignRight: false}
];
  
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
  
function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (assign) => assign.title.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

const ListAssign = () => {

  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('title');
  const [filterTitle, setFilterTitle] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByTitle = (event) => {
    setFilterTitle(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - ASSIGNLIST.length) : 0;

  const filteredAssigns = applySortFilter(ASSIGNLIST, getComparator(order, orderBy), filterTitle);

  const isAssignNotFound = filteredAssigns.length === 0;

  return (

    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom>
          Asignaciones
        </Typography>
        <Button
          variant="contained"
          component={RouterLink}
          to="/test/presentation/create"
          startIcon={<AddIcon />}
        >
          Nueva Asignacion
        </Button>
      </Stack>

      <Card>

        <AssignsListToolbar
          filterTitle={filterTitle}
          onFilterTitle={handleFilterByTitle}
        />

          <TableContainer sx={{ minWidth: 800 }}>
            <Table>
              <ListAssignsHead 
                order={order}
                orderBy={orderBy}
                headLabel={TABLE_HEAD}
                onRequestSort={handleRequestSort}
              />
              <TableBody>
                {filteredAssigns
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    const { 
                      id, 
                      title, 
                      status, 
                      fichas, 
                      dateCreate, 
                      numUserSend, 
                      numUserResponse, 
                      rangeActivate
                    } = row;

                    return (
                      <TableRow
                        hover
                        key={id}
                        tabIndex={-1}
                      >
                        <TableCell component="th" scope="row">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Typography variant="subtitle2" noWrap>
                              {title}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="left">
                          <Label
                            variant="ghost"
                            color={(status === 'Sin asignar' && 'error') || 'success'}
                          >
                            {sentenceCase(status)}
                          </Label>
                        </TableCell>
                        <TableCell align="left">{fichas}</TableCell>
                        <TableCell align="left">{dateCreate}</TableCell>
                        <TableCell align="left">{numUserSend}</TableCell>
                        <TableCell align="left">{numUserResponse}</TableCell>
                        <TableCell align="left">{rangeActivate}</TableCell>
                        <TableCell align="right">
                          <AssignsMoreMenu />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
              {isAssignNotFound && (
                <TableBody>
                  <TableRow>
                    <TableCell align="center" colSpan={8} sx={{ py: 3 }}>
                      <SearchNotFound searchQuery={filterTitle} />
                    </TableCell>
                  </TableRow>
                </TableBody>
              )}
            </Table>
          </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={ASSIGNLIST.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
      
  );
}
 
export default ListAssign;