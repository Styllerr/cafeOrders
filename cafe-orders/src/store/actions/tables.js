export const ACTION_SET_TABLES = 'ACTION/SET/TABLES';
export function setTablesCount(data) {
    return {
        type: ACTION_SET_TABLES,
        payload: data,
    }
}