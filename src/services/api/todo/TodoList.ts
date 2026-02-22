import { store } from "../../../store/store";
import { Todo } from "../../../types/todo";
import api from "../../axiosInstance";

const getTodoList = async (): Promise<Todo[]> => {
    const state = store.getState();
    console.log('STATATE:', state)
    const userId = state.userDetails?.userDetails?.id;

    const { data } = await api.get(`todos?userId=${userId}`);

    return data;
};


export {
    getTodoList
}