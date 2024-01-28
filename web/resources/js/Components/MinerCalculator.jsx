import React, {useEffect, useState} from "react";
import {
    Alert,
    Box,
    Button,
    FilledInput,
    FormControl, FormHelperText,
    InputAdornment,
    InputLabel,
    Stack,
    TextField
} from "@mui/material";
import {PrettoSlider} from "@/Components/PrettoSlider";

export default function MinerCalculator({
                                            hashRate, tariffs = [], requestErrors = {}, submitBuy = () => {
    }
                                        }) {
    const [power, setPower] = useState(hashRate);
    const [deposit, setDeposit] = useState(tariffs.length > 0 ? tariffs[0].price : 250);
    const [data, setData] = useState({
        'deposit': tariffs.length > 0 ? tariffs[0].price : 250,
        'power': hashRate ?? 23000,
    });

    const sliderMarks = [{
        value: 250, label: '144%',
    }, {
        value: 3700, label: '158%',
    }, {
        value: 7800, label: '179%',
    },];

    const [currentProfit, setCurrentProfit] = useState(144);

    const [lastUpdated, setLastUpdated] = useState(null);

    const [errors, setErrors] = useState(requestErrors);

    const changeInput = (e) => {
        let targetVal = e.target.value ?? 0;
        targetVal = (targetVal + '').replace(/[^0-9]+/, '');
        if (e.target.name == 'deposit') {
            setDeposit(targetVal);
            setPower((targetVal * (hashRate / 100)).toFixed(0));
        }
        if (e.target.name == 'power') {
            setPower(targetVal);
            setDeposit((targetVal / (hashRate / 100)).toFixed(0));
        }
    };

    const selectPlan = (id) => {
        setLastUpdated('');
        let tariff = tariffs.filter(item => item.id === id)[0];
        setDeposit(tariff.price);
        setPower((tariff.price * (hashRate / 100)).toFixed(0));
        setCurrentProfit(tariff.percent);
    };

    useEffect(() => {
        let lastPercent = 144;
        for (let key in tariffs) {
            if (deposit >= tariffs[key].price) {
                lastPercent = tariffs[key].percent;
            }
        }
        setCurrentProfit(lastPercent);
    }, [data]);

    const buyMiner = (payMethod) => {
        // if (deposit < 100) {
        // TODO: change to 100
        if (deposit < 5) {
            setErrors({deposit: 'The minimum deposit must be at least 100 USD'});
            return;
        }
        setErrors({});
        submitBuy({
            deposit: deposit,
            power: power,
            paymentMethod: payMethod,
        });
    };

    useEffect(() => {
        setErrors(requestErrors);
    }, [requestErrors])

    return (<>
        <Stack spacing={3}>

            <FormControl variant={'contained'} sx={{
                position: 'relative',
                paddingBottom: '1rem',
                marginBottom: '1rem',
            }}>
                <InputLabel>Amount</InputLabel>
                <FilledInput
                    sx={{
                        border: 'none',
                    }}
                    helperText={errors.deposit}
                    error={errors.deposit ?? false}
                    onChange={changeInput}
                    name={'deposit'}
                    value={deposit ?? ''}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                    type={'text'} label={'Investment'}
                />
                <FormHelperText error={errors.sum ?? false}>{errors.sum}</FormHelperText>
                <PrettoSlider
                    sx={{
                        position: 'absolute',
                        bottom: '-30px',
                    }}
                    value={deposit ?? 0} marks={sliderMarks} min={100} max={10000}
                    step={10}
                    onChange={changeInput}
                    name={'deposit'}
                />
            </FormControl>

            <FormControl
                variant={'contained'}
                sx={{
                    position: 'relative',
                    paddingBottom: '1rem',
                }}>
                <InputLabel>Power</InputLabel>
                <FilledInput
                    sx={{
                        border: 'none',
                    }}
                    helperText={errors.power}
                    error={errors.power ?? false}
                    onChange={changeInput} name={'power'}
                    value={power ?? ''}

                    type={'text'}
                    label={'Hash'}
                    InputProps={{
                        startAdornment: <InputAdornment
                            position="start">GH/s</InputAdornment>,
                    }}
                />
                <FormHelperText error={errors.sum ?? false}>{errors.sum}</FormHelperText>
                <PrettoSlider
                    sx={{
                        position: 'absolute',
                        bottom: '-30px',
                    }}
                    value={power}
                    name={'power'}
                    step={10}
                    min={23620}
                    max={7000000}
                    onChange={changeInput}
                />
            </FormControl>

            {/*<Box sx={{display: 'flex', justifyContent: 'flex-end'}}>*/}
            {/*    <TextField*/}
            {/*        disabled={true}*/}
            {/*        value={currentProfit}*/}
            {/*        fullWidth label="Year profit percent"*/}
            {/*        variant="outlined"/>*/}
            {/*</Box>*/}

            {/*<Stack direction={'row'} spacing={3} justifyContent={"center"}>*/}
            {/*    {tariffs.map((item) => {*/}
            {/*        return <Button key={item.id} variant={'contained'} onClick={() => {*/}
            {/*            selectPlan(item.id)*/}
            {/*        }}>{item.name}</Button>*/}
            {/*    })}*/}
            {/*</Stack>*/}

            <Box>
                <Button variant={'contained'} fullWidth={true} onClick={() => {
                    buyMiner('btc');
                }}>BUY NOW</Button>
                {/*<Button onClick={() => {*/}
                {/*    buyMiner('btc');*/}
                {/*}}>Pay with BTC</Button>*/}
                {/*<Button onClick={() => {*/}
                {/*    buyMiner('card');*/}
                {/*}}>Pay with Card</Button>*/}
            </Box>
            {errors.error ? <Alert severity="error">{errors.error}</Alert> : null}
        </Stack>
    </>);
}
