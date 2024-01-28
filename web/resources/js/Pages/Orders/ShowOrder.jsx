import PageWrapper from "@/Components/Wrappers/PageWrapper";
import {OrderInfo} from "@/Pages/OrderProcessing/OrderInfo";
import {Seo} from "@/Components/Wrappers/Seo";
import {useParams} from "react-router";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {selectToken} from "@/slices/userSlice";
import apiRequest from "@/api/helper";
import {toast} from "react-toastify";
import Loader from "@/Components/Loader";

export default function ShowOrder({order, payment}) {
    const {orderId} = useParams();
    const [orderData, setOrderData] = useState({});
    const token = useSelector(selectToken);
    useEffect(() => {
        apiRequest(token).get(`/api/orders/${orderId}/processing`).then((response) => {
            if (response.status == 200) {
                setOrderData({
                    order: response.data.order, payment: response.data.payment,
                });
            } else {
                toast.error('Request error');
            }
        });
    }, []);

    return (<>
        <Seo title={'Order'}/>
        {(Object.keys(orderData).length) > 0
            ?
            <>
                <OrderInfo order={{
                    ...orderData.order, payment: orderData.payment,
                }}/>
            </>
            :
            <Loader/>
        }
    </>);
}
