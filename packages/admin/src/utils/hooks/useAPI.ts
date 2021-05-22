import axios from 'axios'
import { useToken } from './useToken'

export const useAPI = () => {
    const token = useToken()

    return axios.create({
        baseURL: 'http://localhost:3000',
        headers: {
            Authorization: token,
        },
    })
}
