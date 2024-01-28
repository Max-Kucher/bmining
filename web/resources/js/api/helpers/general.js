import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {selectToken} from "@/slices/userSlice";
import apiRequest from "@/api/helper";
import toast from "react-hot-toast";

function splitObject(obj) {
    const result = {};
    let count = 1;

    for (const key in obj) {
        if (Object.hasOwnProperty.call(obj, key)) {
            result[count] = [key, obj[key]];
            count++;
        }
    }

    return result;
}

export default splitObject;

export const axiosErrorsCfg = {
    validateStatus: function (status) {
        return status < 500;
    }
};


export const useForm = (initialData) => {
    const [data, setData] = useState(initialData);
    const [errors, setErrors] = useState([]);
    const [processing, setProcessing] = useState(false);
    const [responseData, setResponseData] = useState({});
    const [recentlySuccessful, setRecentlySuccessful] = useState(false);
    const token = useSelector(selectToken);

    const reset = (columns = null) => {
        let tmpData = {...data};
        if (columns === null) {
            columns = tmpData;
        }
        for (let columnName in columns) {
            tmpData[columnName] = '';
        }
        setData(tmpData);
    };


    const commonResponseHandler = (response, config = {
        onSuccess: () => {
        }
    }) => {
        if (response.status == 200) {
            setResponseData(response.data);
            setRecentlySuccessful(true);
            config.onSuccess();
            setTimeout(() => {
                setRecentlySuccessful(false);
            }, 2000);
        } else if (response.status == 422) {
            setErrors(response.data.errors);
        } else if (response.status == 429) {
            toast.error('Too many requests, please try again later.');
        } else {
            toast.error('Request error');
        }
    };

    const patch = (url, config = {
        onSuccess: () => {
        },
    }) => {
        setProcessing(true);
        let tmpConfig = {};
        if (config.hasOwnProperty('forceFormData') && config.forceFormData === true) {
            tmpConfig = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            };
        }
        apiRequest(token).patch(url, data, tmpConfig)
            .then((response) => {
                commonResponseHandler(response, config);
            })
            .finally(() => {
                setProcessing(false);
            });
    };

    const post = (url, config = {
        onSuccess: () => {
        },
    }) => {
        setProcessing(true);
        let tmpConfig = {};
        if (config.hasOwnProperty('forceFormData') && config.forceFormData === true) {
            tmpConfig = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            };
        }
        apiRequest(token).post(url, data, tmpConfig)
            .then((response) => {
                commonResponseHandler(response, config);
            })
            .finally(() => {
                setProcessing(false);
            });
    };

    const put = (url, config = {
        onSuccess: () => {
        },
    }) => {
        setProcessing(true);
        let tmpConfig = {};
        if (config.hasOwnProperty('forceFormData') && config.forceFormData === true) {
            tmpConfig = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            };
        }
        apiRequest(token).put(url, data, tmpConfig)
            .then((response) => {
                commonResponseHandler(response, config);
            })
            .finally(() => {
                setProcessing(false);
            });
    };

    const destroy = (url, config = {
        onSuccess: () => {
        },
    }) => {
        setProcessing(true);
        let tmpConfig = {};

        apiRequest(token).delete(url, tmpConfig)
            .then((response) => {
                commonResponseHandler(response, config);
            })
            .finally(() => {
                setProcessing(false);
            });
    };


    return {
        data,
        setData,
        errors,
        setErrors,
        processing,
        recentlySuccessful,
        reset,
        patch,
        post,
        put,
        delete: destroy,
        responseData
    };

};


export function convertTZ(date, tzString) {
    return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {timeZone: tzString}));
}

export function useResponseHandler() {
    const [errors, setErrors] = useState();

    const responseHandler = async ({response}) => {
        if (response.status < 400) {
            return;
        }
        if (response.status == 422) {
            setErrors(response.data.errors);
            toast.error('Too many requests, please try again later.');
        } else if (response.status == 429) {
            toast.error('Too many requests, please try again later.');
        } else {
            toast.error('Request error');
        }
    };
    return {
        responseHandler: responseHandler,
    };
}
