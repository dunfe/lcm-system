import dayjs from 'dayjs'

export const useCount = (data) => {
    return data.reduce((result, { createdAt }) => {
        const normalizeDate = dayjs(createdAt).format('L')
        if (result.length === 0) {
            result['1/1/2021'] = {
                date: '1/1/2021',
                count: 0,
            }
        }
        result[normalizeDate] = result[normalizeDate] || {
            date: normalizeDate,
            count: 0,
        }
        result[normalizeDate].count++
        return result
    }, [])
}
