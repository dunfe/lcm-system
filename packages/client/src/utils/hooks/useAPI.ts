import axios from 'axios'
import { useToken } from './useToken'

export const useAPI = () => {
    const token = useToken()

    return axios.create({
        baseURL: 'https://livecoding.me',
        headers: {
            Authorization: token,
        },
    })
}
