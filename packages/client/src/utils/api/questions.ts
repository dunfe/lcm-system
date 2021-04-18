import axios from 'axios'

export const questions = {
    getNew: (token: string) => {
        axios
            .get('/api/users/questions/new', {
                headers: token,
            })
            .then((response) => response.data)
            .then((result) => result.data.results)
            .catch((error) => console.error(error))
    },
    getDone: (token: string) => {
        axios
            .get('/api/users/questions/done', {
                headers: token,
            })
            .then((response) => response.data)
            .then((result) => result.data.results)
            .catch((error) => console.error(error))
    },
}
