import axios from 'axios'

const instance = axios.create({ baseURL: 'https://livecoding.me' })

export const questions = {
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
            })
            .catch((error) => console.error(error))
    },
}
