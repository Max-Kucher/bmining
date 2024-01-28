import {useSelector} from "react-redux";
import {selectToken, selectUser} from "@/slices/userSlice";
import {useMemo, useState} from "react";
import {axiosErrorsCfg} from "@/api/helpers/general";
import toast from "react-hot-toast";


const apiRequest = (token) => {
    const axiosInstance = axios.create();
    axiosInstance.interceptors.request.use((config) => {
        config.headers['Authorization'] = `Bearer ${token}`;
        config = {
            ...config,
            ...axiosErrorsCfg,
        }
        return config;
    });

    return axiosInstance;
};

export const useApiRequest = () => {
    const authToken = useSelector(selectToken);

    const [errors, setErrors] = useState([]);

    const responseHandler = ({response}) => {
        if (response.status < 400) {
            return;
        }
        if (response.status == 422) {
            setErrors(response.data.errors);
            toast.error('Invalid request.');
        } else if (response.status == 429) {
            toast.error('Too many requests, please try again later.');
        } else {
            toast.error('Request error');
        }
    };

    const apiRequestHelper = () => {
        return apiRequest(authToken);
    };

    return {
        apiRequest: apiRequestHelper,
        responseHandler: responseHandler,
        errors: errors,
    };
};

export default apiRequest;
