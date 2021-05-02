export const useStatus = (data) => {
    return data.reduce((result, { status }) => {
        result[status] = result[status] || {
            type: status,
            value: 0,
        }
        result[status].value++
        return result
    }, [])
}
