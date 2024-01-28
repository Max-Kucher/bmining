import PageWrapper from "@/Components/Wrappers/PageWrapper";
import {OrderInfo} from "@/Pages/OrderProcessing/OrderInfo";
import {useEffect, useState} from "react";
import apiRequest from "@/api/helper";
import {useParams} from "react-router";
import {toast} from "react-toastify";
import Loader from "@/Components/Loader";
import {useSelector} from "react-redux";
import {selectToken} from "@/slices/userSlice";

export default function ShowOrder({}) {

    const {orderId} = useParams();
    const [orderData, setOrderData] = useState({});
    const token = useSelector(selectToken);
    useEffect(() => {
        apiRequest(token).get('/api/manage/orders/' + orderId).then((response) => {
            if (response.status == 200) {
                setOrderData({
                    ...response.data.order,
                    payment: response.data.payment,
                });
            } else {
                toast.error('Request error');
            }
        });
    }, []);

    return (<>
        {Object.keys(orderData).length > 0 ? <OrderInfo order={orderData}/> : <Loader/>}

    </>);
}
