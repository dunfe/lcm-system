import { useToken } from './useToken'
import axios from 'axios'

export const useAPI = () => {
    const token = useToken()

    return axios.create({
        baseURL: 'https://livecoding.me',
        headers: {
            Authorization: token,
        },
    })
}
