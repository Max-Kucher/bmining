import * as React from 'react';
import MinerCalculator from "@/Components/MinerCalculator";
import {useState} from "react";
import {
    Box, Card, CardActions, CardContent, Container, FormHelperText, Stack, Unstable_Grid2 as Grid, useMediaQuery
} from "@mui/material";
import Lottie from "react-lottie";
// const Lottie = React.lazy(() => import("react-lottie"));
import animationData from "../animations/animation-miner-orange.json";
// const animationData = React.lazy(() => import("../animations/animation-miner-orange.json"));
import {useTheme} from "@mui/material/styles";
import {useSelector} from "react-redux";
import {selectToken} from "@/slices/userSlice";
import {useRouter} from "@/hooks/use-router";
import apiRequest from "@/api/helper";
import toast from "react-hot-toast";
import {CryptoRate} from "@/Charts/CryptoRate";
import {MinerContext} from "@/contexts/minerContext";

export default function BuyMinerForm({tariffs, hashRate, isAuthorithed = true}) {
    const theme = useTheme();
    let animData = animationData;
    const [step, setStep] = useState(0);
    const [deposite, setDeposite] = useState();
    const [buyMinerErrors, setBuyMinerErrors] = useState([]);
    const [orderData, setOrderData] = useState({});
    const token = useSelector(selectToken);
    const router = useRouter();
    const isMdScreen = useMediaQuery(theme.breakpoints.down('lg'));
    // const isMdScreen = useMediaQuery(theme.breakpoints.down('lg'));
    const submitBuyMinerForm = (data) => {

        if (isAuthorithed === false) {
            localStorage.setItem('pendingOrder', JSON.stringify(data));
            router.replace('/register');
            return;
        }
        apiRequest(token).patch(route('api.miner.store'), data)
            .then((response) => {
                if (response.data?.errors) {
                    setBuyMinerErrors(response.data.errors);
                    toast.error('Error occurred during handle order.');
                    return;
                }

                if (response.data?.errors) {
                    setBuyMinerErrors(response.data.errors);
                    return;
                }

                setOrderData(response.data);
                let uri = route('orders.processing.show', {id: response.data.order.id});
                router.replace(uri);
                // nextStep();
            });
    };

    const defaultOptions = {
        loop: true, autoplay: true, animationData: animData, rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        },

    };


    return (<Box maxWidth="xl" sx={{padding: 0, width: '100%', mx: 'auto'}}>

        <Card
            sx={{
                // boxShadow: 'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px!important',
                boxShadow: 'rgba(17, 12, 46, 0.15) 0px 48px 100px 0px!important',
                background: theme.palette.mode == 'dark' ? 'linear-gradient(to right, #00c3ff1a, #00000000)' : 'linear-gradient(to right, #ffffff30, #ffffff)',
                backdropFilter: 'blur(100px)', // border: theme.palette.mode == 'dark' ? 'solid 2px red' : 'solid 10px #0000000d',
            }}
        >
            <CardContent>
                <MinerContext.Provider value={{
                    profit: {
                        day: 0, month: 0, year: 0,
                    },
                }}>
                    <Grid container sx={{padding: 0}} spacing={3}>
                        <Grid xs={12} md={6} lg={3} sx={{
                            p: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', marginX: 'auto',
                            position: 'absolute',
                            left: '10rem',
                            bottom: '2rem',
                            zIndex: -1,
                            opacity: 0.3,
                        }}>
                            <Box sx={{
                                display: 'flex',
                                flexFlow: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginX: 'auto',
                            }}>
                                <Lottie speed={1} options={defaultOptions} loop={true} isPaused={true} height={400}
                                        width={400}/>
                            </Box>
                        </Grid>
                        <Grid xs={12} md={6} lg={6}>
                            <CryptoRate/>
                        </Grid>
                        <Grid xs={12} md={6} lg={6}>
                            <Stack spacing={3}>
                                <CardActions sx={{justifyContent: 'flex-end', marginTop: 4}}>
                                    <Stack sx={{width: '100%'}}>
                                        <MinerCalculator tariffs={tariffs} hashRate={hashRate}
                                                         submitBuy={submitBuyMinerForm}
                                                         requestErrors={buyMinerErrors}/>
                                        {/*{step === 0 ? <MinerCalculator tariffs={tariffs} hashRate={hashRate}*/}
                                        {/*                               submitBuy={submitBuyMinerForm}*/}
                                        {/*                               requestErrors={buyMinerErrors}/> : null}*/}
                                        {/*{step === 1 ? <PaymentIntent orderData={orderData}/> : null}*/}
                                        {/*{step === 2 ? <div>Finally</div> : null}*/}

                                    </Stack>
                                </CardActions>
                            </Stack>
                        </Grid>
                    </Grid>
                </MinerContext.Provider>
            </CardContent>
        </Card>
    </Box>);
}
