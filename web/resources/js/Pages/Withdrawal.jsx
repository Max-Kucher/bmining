import BlockWrapper from "@/Components/Wrappers/BlockWrapper";
import {
    Box, Button,
    Card,
    CardContent, Checkbox,
    Divider,
    FilledInput,
    FormControl, FormControlLabel, FormHelperText,
    Grid,
    InputAdornment,
    InputLabel,
    Stack,
    Tab,
    Tabs,
    TextField
} from "@mui/material";
import React, {useCallback, useEffect, useState} from "react";
import {TabPanel} from "@mui/lab";
import {CustomerTasks} from "@/Components/CustomerTasks";
import {useDispatch, useSelector} from "react-redux";
import {selectUser, selectUserBalance} from "@/slices/userSlice";
import {selectBtcRate, updateBtc} from "@/slices/currencyRateSlice";
import apiRequest, {useApiRequest} from "@/api/helper";
import {useForm, useResponseHandler} from "@/api/helpers/general";
import {WithdrawalList} from "@/Components/Withdrawal/WithdrawalList";
import {Seo} from "@/Components/Wrappers/Seo";
import toast from "react-hot-toast";
import {SeverityPill} from "@/Components/severity-pill";

const tabs = [{label: 'To your bank account', value: 'bank'}, {label: 'To your btc wallet', value: 'btc'},];

export function Withdrawal() {
    const dispatcher = useDispatch();
    const [withdrawals, setWithdrawals] = useState([]);
    const usdBalance = useSelector(selectUserBalance);
    const btcRate = useSelector(selectBtcRate);
    const [pendingWithdrawal, setPendingWithdrawal] = useState(0);

    const [userBalance, setUserBalance] = useState({
        usd: 1110, btc: 0.0001,
    });
    const initialForm = {
        sum: 0,
        sumBtc: 0,
        method: 'btc',
        address: '',
        acceptRisks: false,
    };
    const {data, setData, patch, reset, recentlySuccessful, errors, setErrors} = useForm(initialForm);

    const {apiRequest, responseHandler} = useApiRequest();
    const getCurrencyRates = () => {
        apiRequest().get('/api/currency-rate')
            .then((response) => {
                if (response.status == 200) {
                    dispatcher(updateBtc(response.data.rates.btc.value))
                } else {
                    responseHandler(response);
                }
            });
    };

    const getWithdrawalInfo = () => {
        apiRequest().get('/api/withdraw/info')
            .then((response) => {
                if (response.status == 200) {
                    setPendingWithdrawal(response.data.pending);
                } else {
                    responseHandler(response);
                }
            });
    };

    const getWithdrawals = () => {
        apiRequest().get('/api/withdraw/my')
            .then((response) => {
                if (response.status == 200) {
                    setWithdrawals(response.data.items);
                } else {
                    responseHandler(response);
                }
            });
    };


    useEffect(() => {
        getCurrencyRates();
        getWithdrawals();
        getWithdrawalInfo();
    }, []);


    useEffect(() => {
        setUserBalance({
            usd: usdBalance, btc: (usdBalance / btcRate).toFixed(6),
        });
    }, [usdBalance, btcRate]);

    useEffect(() => {
        if (recentlySuccessful === true) {
            toast.success('Withdrawal request has been sent.');
            setData(initialForm);
            getWithdrawals();
            getWithdrawalInfo();
        }
    }, [recentlySuccessful]);


    const handleTabsChange = useCallback((event, value) => {
        setCurrentTab(value);
    }, []);

    const submit = (e) => {
        e.preventDefault();
        patch('/api/withdraw/add');
    };

    const changeInput = (e) => {
        let name = e.target.name;


        if (name === 'sum') {
            let btcVal = 0;
            let val = parseInt(e.target.value == '' ? 0 : e.target.value);
            if (val != 0) {
                btcVal = val / btcRate;
            }

            setData({
                ...data,
                [name]: e.target.value,
                sumBtc: btcVal.toFixed(6),
            })
        } else if (name === 'sumBtc') {
            let usdVal = 0;
            let val = parseFloat(e.target.value == '' ? 0 : e.target.value);
            if (val != 0) {
                usdVal = val * btcRate;
            }

            setData({
                ...data,
                [name]: e.target.value,
                sum: usdVal.toFixed(2),
            })
        } else {
            setData({
                ...data, [name]: e.target.value,
            });
        }

    };

    const changeAcceptRisks = (e) => {
        setData({
            ...data,
            acceptRisks: e.target.checked,
        });
    };

    const cancelRequest = (id) => {
        apiRequest().post('/api/withdraw/cancel', {
            id: id,
        }).then((response) => {
            if (response.status == 200) {
                getWithdrawals();
                toast.success('Withdrawal request canceled.');
            } else {
                responseHandler({response});
            }
        });
    };

    const actionsHandler = (item) => {
        return <>
            {item.state == 'paid' || item.state == 'canceled' ?
                null
                :
                <SeverityPill
                    sx={{
                        cursor: 'pointer',
                    }}
                    title={'Cancellation is available within 10 minutes from the creation of the withdrawal request.'}
                    onClick={() => {
                        cancelRequest(item.id);
                    }}
                >
                    Cancel
                </SeverityPill>
            }
        </>
    };

    const [currentTab, setCurrentTab] = useState('btc');
    return <>
        <Seo title={'Withdraw'}/>
        <h2>Withdrawal founds</h2>
        <Box sx={{
            ...defaultBlockStyle, backgroundColor: 'primary.main', marginBottom: '1rem', borderRadius: '1rem',
            color: 'primary.contrastText'
        }}>
            <div style={{
                display: 'flex', alignItems: 'center', flexFlow: 'column nowrap'
            }}>
                <div>
                    Your current balance: {userBalance.usd} USD | {userBalance.btc} BTC
                </div>
                <div>
                    Available for withdrawal: {userBalance.usd - pendingWithdrawal} USD
                </div>
            </div>
        </Box>

        <div>
            <Tabs
                // indicatorColor="primary"
                textColor='primary.dark'
                indicatorColor='primary'
                onChange={handleTabsChange}
                scrollButtons="auto"
                sx={{mt: 3}}
                // textColor=""
                value={currentTab}
                variant="scrollable"
            >
                {tabs.map((tab) => (<Tab

                    sx={{
                        // backgroundColor: 'primary.main',
                        // borderRadius: '15px 15px 0 0',
                    }}
                    key={tab.value}
                    label={tab.label}
                    value={tab.value}
                />))}
            </Tabs>
        </div>

        <BlockWrapper sx={{
            marginTop: '1rem', paddingTop: '1rem',
        }}>
            {currentTab === 'btc' && <>
                <p>
                    Amount to withdraw:
                </p>
                <form onSubmit={submit}>
                    <Stack spacing={3}>
                        <Stack spacing={3} direction={'row'}>
                            <FormControl variant={'filled'}>
                                <InputLabel>Amount</InputLabel>
                                <FilledInput
                                    onChange={changeInput}
                                    name={'sum'}
                                    value={data.sum}
                                    startAdornment={<InputAdornment position="start">USD</InputAdornment>}
                                />
                                <FormHelperText error={errors.sum ?? false}>{errors.sum}</FormHelperText>
                            </FormControl>
                            <FormControl variant={'filled'}>
                                <InputLabel>Amount</InputLabel>
                                <FilledInput
                                    onChange={changeInput}
                                    name={'sumBtc'}
                                    value={data.sumBtc}
                                    startAdornment={<InputAdornment position="start">BTC</InputAdornment>}
                                />
                                <FormHelperText>{errors.usdAmount}</FormHelperText>
                            </FormControl>

                        </Stack>
                        <TextField
                            required
                            name={'address'}
                            onChange={changeInput}
                            helperText={errors.address ?? false}
                            value={data.address}
                            error={errors.address ?? false}
                            label={'BTC address'}
                        />

                        <FormHelperText error={errors.lowBalance ?? false}>{errors.lowBalance ?? false}</FormHelperText>
                        <FormControlLabel
                            control={<Checkbox required onChange={changeAcceptRisks} checked={data.acceptRisks}/>}
                            label={<b>I understand that incorrect payment details will result in the loss of my funds. I am solely responsible for the payment details I provide to BMINING.</b>}/>

                        <Button type={'submit'} variant={'contained'}>Create</Button>
                    </Stack>
                </form>

            </>}
            {currentTab === 'bank' && <>
                <ol>
                    <li>Log in to your Binance account and navigate to the "Wallet" section.</li>
                    <li>Select "Withdraw" and choose Bitcoin (BTC) as the cryptocurrency you wish to withdraw.</li>
                    <li>Enter the amount of BTC you want to withdraw and select your bank card as the withdrawal
                        method.
                    </li>
                    <li>Fill in the necessary information for your bank card, including the card number, expiration
                        date, and security code.
                    </li>
                    <li>Confirm the withdrawal and wait for the transaction to be processed.</li>
                    <li>Once the transaction is completed, the BTC funds will be transferred to your bank card.</li>
                </ol>

                Please note that fees may apply for this type of transaction and processing times may vary depending on
                your bank and country of residence. It's always a good idea to double-check all the details before
                confirming any transaction.
            </>}
        </BlockWrapper>
        <div style={{
            marginBottom: '1.5rem',
        }}>
            <WithdrawalList updateList={getWithdrawals} items={withdrawals} actionsHandler={actionsHandler}/>
        </div>
    </>;
}

export const defaultBlockStyle = {
    display: 'flex', flexFlow: 'column nowrap', padding: '1rem'
};
