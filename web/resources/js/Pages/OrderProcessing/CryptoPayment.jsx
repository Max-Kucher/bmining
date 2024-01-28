import {
    Box, Button, Card, CardActions, CardContent, CardHeader, Container, Divider, Modal, Stack, Typography
} from "@mui/material";
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';
import {useTheme} from "@mui/material/styles";
import QrCreator from "qr-creator";
import {useEffect, useRef, useState} from "react";
import PaymentSuccess from "@/Pages/OrderProcessing/Modals/PaymentSuccess";
import {Cancel, Check} from "@mui/icons-material";
import PaymentCanceled from "@/Pages/OrderProcessing/Modals/PaymentCanceled";
import PaymentPending from "@/Pages/OrderProcessing/Modals/PaymentPending";
import {useSelector} from "react-redux";
import {selectToken} from "@/slices/userSlice";
import apiRequest from "@/api/helper";
import {useRouter} from "@/hooks/use-router";
import {dashboardRoutes} from "@/routes/main";
import toast from "react-hot-toast";

const orderStates = {
    canceled: 'canceled', paid: 'paid', pending: 'penging',
};
export const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    borderRadius: 4,
    bgcolor: 'background.paper', // border: '2px solid #000',
    boxShadow: 24,
    padding: 0,
};
export const CryptoPayment = ({data}) => {
    const token = useSelector(selectToken);
    const [modal, setModal] = useState({
        open: false, type: 'check',
    });
    const router = useRouter();

    const closeModal = () => {
        setModal({...modal, open: false});
    };

    const cancelPayment = () => {
        apiRequest(token).get(route('api.orders.processing.cancel', {id: data.orderId})).then((response) => {
            if (response.data.state === orderStates.canceled) {
                router.replace(dashboardRoutes.dashboard);
            } else if (response.status == 404) {
                router.replace(dashboardRoutes.dashboard);
            } else {
                toast.error('Request error');
            }
        });
    };

    const modals = [{
        type: orderStates.paid, el: <PaymentSuccess/>
    }, {
        type: orderStates.canceled, el: <PaymentCanceled button={<Stack
            alignItems="center"
            direction="row"
            spacing={3}
            sx={{mt: 4}}
        >
            <Button
                color="inherit"
                fullWidth
                variant={'outlined'}
                size="large"
                onClick={closeModal}
            >
                No
            </Button>
            <Button
                fullWidth
                size="large"
                variant="contained"
                onClick={cancelPayment}
            >
                Yes
            </Button>
        </Stack>}/>
    }, {
        type: orderStates.pending,
        el: <PaymentPending button={<Button sx={{mt: 4}} fullWidth variant={'contained'} onClick={() => {
            setModal({...modal, open: false});
        }}>Close</Button>}/>
    },];

    const qr = useRef(null);
    const [simple, setSimple] = useState(false);
    const theme = useTheme();


    const checkPayment = () => {
        apiRequest(token).get(route('api.orders.processing.check', {id: data.orderId})).then((response) => {
            let orderState = response.data.state;
            if (orderState == orderStates.paid) {
                setModal({
                    ...modal, open: true, type: orderStates.paid,
                });
            } else if (orderState === orderStates.canceled) {
                setModal({
                    ...modal, open: true, type: orderStates.canceled,
                });
            } else {
                setModal({
                    ...modal, open: true, type: orderStates.pending,
                });
            }
        });
    };
    const cancelPaymentPrompt = () => {
        setModal({
            ...modal, open: true, type: orderStates.canceled,
        });
    };


    useEffect(() => {
        qr.current.innerHTML = '';
        QrCreator.render({
            text: `bitcoin:${data.address}?amount=${data.sum}`, radius: simple === true ? 0 : 0.5, ecLevel: 'L', // L, M, Q, H
            fill: {
                type: 'linear-gradient', // or 'linear-gradient'
                position: [0, 1, 1, 0, 1, 1],
                colorStops: [[0, theme.palette.mode == 'dark' ? theme.palette.primary.main : '#787878'], // [0.5, '#f11fff'],
                    [1, theme.palette.mode == 'dark' ? '#ff8585' : '#414141'],]
            }, background: null, // color or null for transparent
            size: 200 // in pixels
        }, qr.current);
    }, [data.address, data.sum, theme.palette.mode, simple]);


    return (<>
        <Container maxWidth="sm">
            <Card>
                <CardHeader

                    sx={{pb: 0}}
                    title={(<Stack direction={'row'} justifyContent={'space-between'}>
                        <Typography variant="h6">
                            Sum: {data.sum} {data.sumCurrency}
                        </Typography>
                        <Typography variant="h6">
                            Rate: {data.rate} USD
                        </Typography>
                    </Stack>)}
                />
                <CardContent mb={0}>
                    <Box>
                        <Stack alignContent={'center'} justifyContent={'center'} spacing={3} mb={4}>
                            <Box sx={{display: 'flex'}} justifyContent={'center'} alignContent={'center'} ref={qr}
                                 onMouseOver={() => {
                                     setSimple(true);
                                 }} onMouseLeave={() => {
                                setSimple(false);
                            }}>
                            </Box>
                            <Typography sx={{fontWeight: 'bold'}} textAlign={'center'}
                                        variant={'body2'}>{data.address}</Typography>
                        </Stack>
                    </Box>
                    <Typography
                        color="text.secondary"
                        variant="overline"
                    >
                        Info
                    </Typography>
                    <Divider/>
                    <Stack
                        alignItems="flex-start"
                        spacing={1}
                        sx={{mt: 2}}
                    >
                        <Typography variant={'body2'} textAlign={'center'}>
                            Please ensure that you send the exact amount of Bitcoin stated in your invoice to the
                            following
                            Bitcoin address: <code>{data.address}</code>. This will help us to process your order as
                            quickly as
                            possible.
                        </Typography>
                    </Stack>
                </CardContent>
                <CardActions>
                    <Stack m={2} sx={{width: '100%'}} spacing={2}>
                        <Button onClick={cancelPaymentPrompt} fullWidth variant={'contained'} color={'error'}
                                startIcon={<Cancel/>}>Cancel</Button>
                        <Button onClick={checkPayment} fullWidth variant={'contained'} color={'success'}>Check
                            payment</Button>
                    </Stack>
                </CardActions>
            </Card>

        </Container>
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={modal.open}
            onClose={() => {
                setModal({
                    ...modal, open: false,
                });
                if (modal.type === orderStates.paid) {
                    router.replace(dashboardRoutes.dashboard)
                }
            }}
            closeAfterTransition
            slots={{backdrop: Backdrop}}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
        >
            <Fade in={modal.open}>
                <Box sx={modalStyle}>
                    <>
                        {modals.map((item) => {
                            if (item.type === modal.type) {
                                return item.el;
                            }
                        })}
                    </>
                </Box>
            </Fade>
        </Modal>
    </>);
};
