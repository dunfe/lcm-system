import axios from 'axios'

const instance = axios.create({ baseURL: 'https://livecoding.me' })

export const users = {
    getUserDetail: (token: string) => {
        return instance
            .get('/api/users', {
                headers: {
                    Authorization: token,
                },
            })
            .then((response) => {
                if (response.status === 200) {
                    return response.data.data[0]
                }
                throw new Error(response.data)
            })
            .catch((error) => console.error(error))
    },
}
