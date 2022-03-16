import Toolbar from "@mui/material/Toolbar";
import {alpha} from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import PropTypes from "prop-types";
import * as React from "react";

export default function EnhancedTableToolbar({numSelected, title}) {

  return (
    <Toolbar
      sx={{
        pl: {sm: 2},
        pr: {xs: 1, sm: 1},
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {/*{numSelected > 0 ? (*/}
      {/*  <Typography*/}
      {/*    sx={{flex: '1 1 100%'}}*/}
      {/*    color="inherit"*/}
      {/*    variant="subtitle1"*/}
      {/*    component="div"*/}
      {/*  >*/}
      {/*    {numSelected} Seleccionado*/}
      {/*  </Typography>*/}
      {/*) : (*/}
      {/*  <span>{title}</span>*/}
      {/*)}*/}
      <span>{title}</span>
      {/*{numSelected > 0 ? (*/}
      {/*  <Tooltip title="Delete">*/}
      {/*    <IconButton>*/}
      {/*      <DeleteIcon/>*/}
      {/*    </IconButton>*/}
      {/*  </Tooltip>*/}
      {/*) : (*/}
      {/*  <Tooltip title="Filter list">*/}
      {/*    <IconButton>*/}
      {/*      <FilterListIcon/>*/}
      {/*    </IconButton>*/}
      {/*  </Tooltip>*/}
      {/*)}*/}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  title: PropTypes.string,
};