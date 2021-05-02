export const useRoleStatus = (data) => {
    return data.reduce((result, { role }) => {
        result[role] = result[role] || {
            type: role,
            value: 0,
        }
        result[role].value++
        return result
    }, [])
}
