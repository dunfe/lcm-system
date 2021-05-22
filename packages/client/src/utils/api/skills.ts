import axios from 'axios'

const instance = axios.create({ baseURL: 'http://localhost:3000' })

export const skills = {
    get: () => {
        return instance
            .get('/api/users/skills')
            .then((response) => {
                if (response.status === 200) {
                    return response.data.skill
                }
                throw new Error(response.data)
            })
            .catch((error) => console.error(error))
    },
}
