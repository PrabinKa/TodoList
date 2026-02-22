import { User } from "../../../types/users";
import api from "../../axiosInstance";

const getUsersList = async (): Promise<User[]> => {
    const { data } = await api.get(`users`);

    return data;
};


export {
    getUsersList
}