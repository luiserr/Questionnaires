import {BOOLEAN, NUMERIC, SINGLE} from "../../const/questionTypes";

export const useOperator = (type) => {
  switch (type) {
    case SINGLE:
      return ['='];
    case NUMERIC:
      return ['=', '>', '>=', '<', '<='];
    case BOOLEAN:
      return ['='];
    default:
      return ['='];
  }
}