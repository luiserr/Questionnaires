import React from "react";
import * as PropTypes from 'prop-types';
import {Box} from "@mui/material";
import FormUser from "./FormUser";


export default function Index({data, setData, payload, setPayload, disabled}) {

  return (
    <>
      <Box sx={{mt: 2}}>
        <FormUser
          disabled={disabled}
          data={data}
          setPayload={setPayload}
          setData={setData}
          payload={payload}
        />
      </Box>
    </>
  );
}

Index.propTypes = {
  data: PropTypes.object,
  setData: PropTypes.func,
  payload: PropTypes.object,
  setPayload: PropTypes.func,
};