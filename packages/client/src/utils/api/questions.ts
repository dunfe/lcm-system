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
    getNew: (token: string) => {
        return instance
            .get('/api/users/questions/new', {
                headers: {
                    Authorization: token,
                },
            })
            .then((response) => {
                if (response.status === 200) {
                    return response.data.data.results
                }
                throw new Error(response.data)
            })
            .catch((error) => console.error(error))
    },
    getDone: (token: string) => {
        return instance
            .get('/api/users/questions/done', {
                headers: {
                    Authorization: token,
                },
            })
            .then((response) => {
                if (response.status === 200) {
                    return response.data.data.results
                }
                throw new Error(response.data)
            })
            .catch((error) => console.error(error))
    },
}
