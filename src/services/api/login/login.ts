import { LoginResponse, TLoginCredentials } from '../../../types/login';
import api from '../../axiosInstance';

export const login = async (
  loginCredentials: TLoginCredentials,
): Promise<LoginResponse> => {
  const { data } = await api.post<LoginResponse>('auth/login', loginCredentials);
    console.log(data)
  return data;
};
