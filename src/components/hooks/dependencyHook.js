import {BOOLEAN, MATRIX, MULTIPLE, NUMERIC, SINGLE} from "../../const/questionTypes";

export const useOperator = (type) => {
  switch (type) {
    case SINGLE:
    case BOOLEAN:
    case MULTIPLE:
      return ['='];
    case NUMERIC:
    case MATRIX:
      return ['=', '>', '>=', '<', '<='];
    default:
      return ['='];
  }
}