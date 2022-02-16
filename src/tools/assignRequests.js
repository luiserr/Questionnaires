import {api, get, local, post} from '../utils/ajax';

export const getTypeAssign = async () => {
    const response = await get(`${local}/assignQuestionnaires/TypeAssign`, true);
    if (response.success) {
      return response.data;
    }
    return {}
};