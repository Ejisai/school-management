import { axiosClient } from "../../api/axios";

const ParentApi = {
    create: async (payload) => {
        return await axiosClient.post('/admin/parents',  payload );
    },
    update: async (id, payload) => {
        return await axiosClient.put(`/admin/parents/${id}`,  {...payload, id} );
    },
    delete: async (id) => {
        return await axiosClient.delete(`/admin/parents/${id}`);
    },
     all: async (payload) => {
        return await axiosClient.get('/admin/parents');
    },
};
export default ParentApi;
