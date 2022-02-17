import React from 'react'
import PropTypes from 'prop-types'
import { filter } from 'lodash'
import {
    Stack,
    Tooltip,
    Divider,
    Box,
    FormControl,
    InputLabel,
    Card,
    Checkbox,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    TableContainer,
    Select,
    MenuItem,
    Typography,
    useTheme,
    CardHeader,
    Grid, Container
} from '@mui/material'
import { generarKey } from '../../../../../utils/assign/assigns'
import SearchNotFound from '../../SearchNotFound'
import AssignsListToolbar from '../../AssignsListToolbar'

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
    return filter(array, (assign) => assign.prf_nombre.toLowerCase().indexOf(query.toLowerCase()) !== -1);
}
return stabilizedThis.map((el) => el[0]);
}

const Program = ({program}) => {

    console.log(program)

    const [page, setPage] = React.useState(0);
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('prf_nombre');
    const [filterTitle, setFilterTitle] = React.useState('');
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

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
    

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - program.length) : 0;

    const filteredAssigns = applySortFilter(program, getComparator(order, orderBy), filterTitle);

    const isAssignNotFound = filteredAssigns.length === 0;

    return (

      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
      >
        <Grid item xs={12}>

        <Card>
            <AssignsListToolbar
                filterTitle={filterTitle}
                onFilterTitle={handleFilterByTitle}
            />
            
            <Divider />
            <TableContainer>
            <Table>

            

                <TableHead>
                    <TableRow>
                        <TableCell padding="checkbox">
                        <Checkbox
                        color="primary"
                        />
                        </TableCell>
                        <TableCell>Id</TableCell>
                        <TableCell>Programa de formación</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {filteredAssigns
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    const { 
                      prf_codigo, 
                      prf_nombre
                    } = row;

                    return (
                        <TableRow
                        hover
                        key={generarKey() + prf_nombre}
                        tabIndex={-1}
                        >
                            <TableCell padding="checkbox">
                                <Checkbox
                                color="primary"
                                />
                            </TableCell>
                        <TableCell align="left">{prf_codigo}</TableCell>
                        <TableCell component="th" scope="row">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Typography variant="subtitle2" noWrap>
                              {prf_nombre}
                            </Typography>
                          </Stack>
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
          count={program.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />

        </Card>
        </Grid>
      </Grid>
    )
}

export default Program