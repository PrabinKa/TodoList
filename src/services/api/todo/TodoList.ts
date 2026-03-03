import { TodoListResponse } from "../../../types/todo";
import api from "../../axiosInstance";

const getTodoList = async ({limit, skip}: {limit: number, skip: number}): Promise<TodoListResponse> => {
    const { data } = await api.get(`todos?limit=${limit}&skip=${skip}`);

    return data;
};


export {
    getTodoList
}