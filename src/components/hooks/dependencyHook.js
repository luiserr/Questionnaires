import {BOOLEAN, MATRIX, NUMERIC, SINGLE} from "../../const/questionTypes";

export const useOperator = (type) => {
  switch (type) {
    case SINGLE:
    case BOOLEAN:
      return ['='];
    case NUMERIC:
    case MATRIX:
      return ['=', '>', '>=', '<', '<='];
    default:
      return ['='];
  }
}