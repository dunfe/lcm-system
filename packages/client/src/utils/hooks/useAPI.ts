import { useToken } from './useToken'
import axios from 'axios'

export const useAPI = () => {
    const token = useToken()

    return axios.create({
        baseURL: 'http://localhost:3000',
        headers: {
            Authorization: token,
        },
    })
}
