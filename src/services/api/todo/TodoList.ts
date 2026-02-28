import { TodoListResponse } from "../../../types/todo";
import api from "../../axiosInstance";

const getTodoList = async (): Promise<TodoListResponse> => {
    const { data } = await api.get(`todos`);

    return data;
};


export {
    getTodoList
}