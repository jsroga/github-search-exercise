import applyCaseMiddleware from 'axios-case-converter'
import axios, {AxiosInstance, AxiosResponse as IAxiosResponse} from '../node_modules/axios'

export interface AxiosResponse<T = any> extends IAxiosResponse<T> {}
export default applyCaseMiddleware(axios.create()) as AxiosInstance

