import {CryptoPayment} from "@/Pages/OrderProcessing/CryptoPayment";
import {Grid} from "@mui/material";
import {OrderInfo} from "@/Pages/OrderProcessing/OrderInfo";
import {Seo} from "@/Components/Wrappers/Seo";
import {useEffect, useState} from "react";
import {useParams} from "react-router";
import {useSelector} from "react-redux";
import {selectToken} from "@/slices/userSlice";
import apiRequest from "@/api/helper";
import {toast} from "react-toastify";
import Loader from "@/Components/Loader";

export default function OrderProcessing({}) {
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
        <Seo title={'Order processing'}/>
        {(Object.keys(orderData).length) > 0
            ?
            <>
                <Grid container spacing={3}>
                    <Grid xs={12} md={6} lg={6} xl={6} item>
                        <OrderInfo order={{
                            ...orderData.order, payment: orderData.payment,
                        }}/>
                    </Grid>
                    {orderData.order.method == 'btc' ? <Grid item xs={12} md={6} lg={6} xl={6}>
                        <CryptoPayment data={{
                            orderId: orderData.order.id,
                            address: orderData.payment?.address ?? 'undefined',
                            sum: orderData.payment.sum,
                            sumCurrency: 'BTC',
                            rate: orderData.payment?.rate
                        }}/>
                    </Grid> : <>Card payment</>}
                </Grid>
            </>
            :
            <Loader/>
        }

    </>);
}
