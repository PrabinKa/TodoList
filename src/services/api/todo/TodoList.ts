import { Todo } from "../../../types/todo";
import api from "../../axiosInstance";

const getTodoList = async (): Promise<Todo[]> => {
    const { data } = await api.get(`todos?userId=1`);

    return data;
};


export {
    getTodoList
}