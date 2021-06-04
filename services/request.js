import instance from './axiosInstance';

export const fetchData = async () => instance.get('/api/rooms').then((result) => {
    return {
        error: false,
        rooms: result.data
    }
}).catch((err) => {
    return {
        error: true,
        rooms: []
    }
});