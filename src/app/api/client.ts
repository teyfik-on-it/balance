import Axios from 'axios';
import { ApiError } from './errors/ApiError';

/**
 * Partial axios response
 */
interface Response {
  data: Success | Failure;
}

/**
 * Successfull response body
 */
interface Success {
  success: true;
}

/**
 * Failed response body with details
 */
interface Failure {
  success: false;
  error: {
    code: number;
    info: string;
  };
}

const API_KEY = process.env.REACT_APP_API_KEY;
const client = Axios.create({
  baseURL: 'http://api.exchangeratesapi.io/v1/',
  params: {
    format: 1,
    access_key: API_KEY,
  },
});

/**
 * Handles succesfull HTTP response with API specific error
 */
client.interceptors.response.use((value) => {
  const { data } = value as Response;

  if (null == data || data.success) {
    return value;
  }

  const { error } = data;

  throw new ApiError(error.code, error.info);
});

export default client;
