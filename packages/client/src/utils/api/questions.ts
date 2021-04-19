import axios from 'axios'

const instance = axios.create({ baseURL: 'https://livecoding.me' })

export const questions = {
    add: (token: string, post) => {
        return instance
            .post('/api/users/questions', post, {
                headers: {
                    Authorization: token,
                },
            })
            .then((response) => {
                if (response.status === 200) {
                    return response.data.data
                }
                throw new Error(response.data)
            })
            .catch((error) => console.error(error))
    },
    update: (token: string, id, post) => {
        return instance
            .put(`/api/users/questions/${id}`, post, {
                headers: {
                    Authorization: token,
                },
            })
            .then((response) => {
                if (response.status === 200) {
                    return response.data.data
                }
                throw new Error(response.data)
            })
            .catch((error) => console.error(error))
    },
    get: (token: string, page: number) => {
        return instance
            .get(`/api/users/questions?page=${page}`, {
                headers: {
                    Authorization: token,
                },
            })
            .then((response) => {
                if (response.status === 200) {
                    return response.data.data
                }
                throw new Error(response.data)
            })
            .catch((error) => console.error(error))
    },
}
