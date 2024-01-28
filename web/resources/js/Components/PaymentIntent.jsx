import {useEffect, useRef, useState} from "react";
import QrCreator from "qr-creator";
import {useTheme} from "@mui/material/styles";
import {Box, Grid, Stack, Typography} from "@mui/material";

export function PaymentIntent({orderData}) {
    const qr = useRef(null);
    const [simple, setSimple] = useState(false);
    const theme = useTheme();
    console.log(theme);
    useEffect(() => {
        qr.current.innerHTML = '';
        QrCreator.render({
            text: `bitcoin:${orderData.address}?amount=${orderData.sum}`,
            radius: simple === true ? 0 : 0.5,
            ecLevel: 'L', // L, M, Q, H
            fill: {
                type: 'linear-gradient', // or 'linear-gradient'
                position: [0, 1, 1, 0, 1, 1],
                colorStops: [[0, theme.palette.mode == 'dark' ? theme.palette.primary.main : '#787878'], // [0.5, '#f11fff'],
                    [1, theme.palette.mode == 'dark' ? '#ff8585' : '#414141'],]
            },
            background: null, // color or null for transparent
            size: 300 // in pixels
        }, qr.current);
    }, [orderData.address, orderData.sum, theme.palette.mode]);

    return <>
        <Stack justifyContent={'flex-start'} direction={'row'} spacing={0}>
            <Stack spacing={0} flex={1} justifyContent={"center"} alignContent={"center"}>
                <Box alignContent={"center"} textAlign={'center'}>You must
                    pay <Typography display={'inline'}
                                    variant={'button'}>{orderData.sum ?? 0} {orderData.sumCurrency.toUpperCase() ?? 'undefined'}</Typography> to
                    address: </Box>
                <Typography variant={'h6'} justifyContent={'center'} alignContent={"center"} textAlign={'center'}>
                    {orderData.address ?? 'undefined'}
                </Typography>

            </Stack>
            <Box>
                <Box sx={{display: 'flex'}} alignContent={'center'} justifyContent={'center'}>
                    <div ref={qr} onMouseOver={() => {
                        setSimple(true);
                    }} onMouseLeave={() => {
                        setSimple(false);
                    }}>
                    </div>
                </Box>
            </Box>
        </Stack>
    </>
}
