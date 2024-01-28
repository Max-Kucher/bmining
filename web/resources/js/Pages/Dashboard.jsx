import * as React from 'react';
import Container from "@/Components/Container";

const BuyMinerForm = React.lazy(() => import('./../Forms/BuyMinerForm'));
import PageWrapper from "@/Components/Wrappers/PageWrapper";
import {
    Box, Button, Collapse, Stack, SvgIcon, Typography, Unstable_Grid2 as Grid
} from "@mui/material";
import {useSettings} from "@/hooks/use-settings";
import {usePageView} from "@/hooks/use-page-view";
import {Suspense, useEffect, useState} from "react";
import {Seo} from "@/Components/Wrappers/Seo"
import PlusIcon from "@untitled-ui/icons-react/build/esm/Plus";
import OverviewCounter from "@/Components/Overview/OverviewCounter";
import {AcUnit, Cached, Dns, DnsRounded, Numbers} from "@mui/icons-material";
import {MinersTable} from "@/Components/Tables/MinersTable";
import {CryptoCurrentBalance} from "@/sections/dashboard/crypto/crypto-current-balance";
import {OverviewTips} from "@/sections/dashboard/overview/overview-tips";
import {OverviewOrders} from "@/Components/Overview/OverviewOrders";
import {Transition} from "@headlessui/react";
import {PendingOrder} from "@/Components/PendingOrder";
import {useTheme} from "@mui/material/styles";
import apiRequest from "@/api/helper";
import {useSelector} from "react-redux";
import {selectToken} from "@/slices/userSlice";
import Loader from "@/Components/Loader";

const now = new Date();
export default function Dashboard(props) {
    const [tariffs, setTariffs] = useState([]);
    const [hashRate, setHashRate] = useState(23000);
    const [miners, setMiners] = useState([]);
    const [orders, setOrders] = useState([]);
    const token = useSelector(selectToken);

    useEffect(() => {
        apiRequest(token).get('/api/dashboard').then((response) => {
            setTariffs(response.data.tariffs);
            setHashRate(response.data.hashRate);
            setMiners(response.data.miners);
            setOrders(response.data.orders);
        });
    }, []);

    return (
        <>
            <PageComponent tariffs={tariffs} miners={miners} orders={orders}
                           hashRate={hashRate}/>
        </>
    );
}


export function PageComponent({hashRate, tariffs = [], miners = [], orders = []}) {
    const [showCalc, setShowCalc] = useState(false);
    const showMinerCalc = (e) => {
        e.preventDefault();
        setShowCalc(!showCalc);
    };

    const settings = useSettings();
    const theme = useTheme();
    usePageView();

    let minersStat = {
        total: 0, running: 0, stopped: 0,
    };
    miners.forEach(item => {
        minersStat.total += 1;
        if (item.run) {
            minersStat.running += 1;
        }
    });
    minersStat.stopped = minersStat.total - minersStat.running;

    return (<>

        <Seo title="Overview"/>
        <Box
            component="main"
            sx={{
                flexGrow: 1, pt: 0, pb: 8,
            }}
        >
            <Container maxWidth={settings.stretch ? false : 'xl'}>
                <Grid
                    container
                    disableEqualOverflow
                    spacing={{
                        xs: 3, lg: 4
                    }}
                >
                    <Grid
                        xs={12}
                        md={6}
                        lg={6}
                    >
                        <OverviewTips
                            // sx={{height: '100%'}}
                            tips={[{
                                title: 'TFA Protect',
                                content: 'Protect your account with an extra layer of security by enabling TFA (Two-Factor Authentication). Keep your information safe from unauthorized access and enjoy peace of mind with this simple but effective security feature.'
                            }, {
                                title: 'Customize dashboard!',
                                content: 'Give your eyes a break and switch to dark mode! Simply adjust your settings to enjoy a sleek and stylish browsing experience with reduced eye strain and improved visibility in low-light environments.'
                            }, // {
                                // title: 'Tip 3.', content: 'Tip content'
                                // }
                            ]}
                        />
                    </Grid>

                    <Grid xs={12} md={6} lg={6}>
                        {localStorage.getItem('pendingOrder') ? <PendingOrder/> : <div style={{
                            height: '100%',
                            padding: 0,
                            display: 'flex',
                            flexFlow: 'row nowrap',
                            background: theme.palette.background.paper,
                            borderRadius: '1rem',
                            overflow: 'hidden',
                            boxShadow: theme.shadows[8]
                        }}>
                            <Box
                                sx={{
                                    alignItems: 'center', display: 'flex', padding: 0,
                                }}
                            >
                                <Stack sx={{height: '100%'}} direction={'row'} spacing={'0'}
                                       alignItems={'center'}>
                                    <div style={{
                                        background: theme.palette.primary.main,
                                        height: '100%',
                                        padding: '1rem',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>

                                        <img height={'150'} width={'150'}
                                             src={'/assets/dashboard-ill.svg'}/>
                                    </div>
                                    <div style={{padding: '1rem'}}>
                                        <div>
                                            Welcome to your user dashboard! Here you can manage your miners
                                            and
                                            keep
                                            track
                                            of your miners activity. To add a new miner, simply click on the
                                            <b> "Add miner" </b>
                                            button.
                                        </div>

                                    </div>
                                </Stack>
                            </Box>
                        </div>}

                    </Grid>

                    <Grid xs={12}>
                        {/*<Stack*/}
                        {/*    direction="row"*/}
                        {/*    justifyContent="space-between"*/}
                        {/*    spacing={4}*/}
                        {/*>*/}
                        {/*    <div>*/}
                        {/*        <Typography variant="h4">*/}
                        {/*            Miners*/}
                        {/*        </Typography>*/}
                        {/*    </div>*/}
                        {/*</Stack>*/}

                    </Grid>
                    <Grid xs={12} width={'100%'}>
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            spacing={4}
                        >
                            <div>
                                <Typography variant="h4">
                                    Miners
                                </Typography>
                            </div>
                        </Stack>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                        }}>

                        </div>
                    </Grid>



                    <Grid
                        xs={4}
                        md={4}
                        lg={3}
                    >
                        <OverviewCounter color={'primary.main'} title={'Total'} Icon={Numbers}
                                         amount={minersStat.total}/>
                    </Grid>
                    <Grid
                        xs={4}
                        md={4}
                        lg={3}
                    >
                        <OverviewCounter color={'success'} title={'Running'} Icon={Cached}
                                         amount={minersStat.running}/>
                    </Grid>
                    <Grid
                        xs={4}
                        md={4}
                        lg={3}
                    >
                        <OverviewCounter color={'warning'} title={'Suspended'} Icon={AcUnit}
                                         amount={minersStat.stopped}/>
                    </Grid>
                    <Grid
                        xs={12}
                        md={4}
                        lg={3}
                    >
                        <div style={{
                            flex: 1,
                            // marginTop: '20px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                                    height: '100%',
                        }}>
                            <Button
                                sx={{
                                    zIndex: 400,
                                    borderRadius: '50px',
                                    fontSize: '24px',
                                    paddingX: '40px',
                                    boxShadow: '0px 4px 50px rgba(0, 0, 0, 0.15)',
                                    backgroundImage: 'url(/assets/gradient-bg.svg)',
                                    backgroundPosition: 'right bottom',
                                    backgroundSize: 'cover',
                                    backgroundRepeat: 'no-repeat',
                                }}
                                className={'vibrate'}
                                type={'button'}
                                size={'large'}
                                onClick={showMinerCalc}

                                startIcon={(<DnsRounded sx={{fontSize: '40px!important'}}/>)}
                                variant="contained"
                            >
                                Add miner!
                            </Button>
                        </div>
                    </Grid>

                    <Grid xs={12} width={'100%'}>
                        <Transition show={true}>
                            <Collapse in={showCalc} orientation={'vertical'}>
                                <Suspense fallback={<Loader/>}>
                                    <BuyMinerForm isAuthorithed={true} id={'calc'} tariffs={tariffs}
                                                  hashRate={hashRate}>
                                    </BuyMinerForm>
                                </Suspense>
                            </Collapse>
                        </Transition>

                    </Grid>

                    <Grid xs={12} md={12}>
                        <MinersTable miners={miners}/>
                    </Grid>


                    <Grid xs={12} md={6}>
                        <CryptoCurrentBalance miners={miners}/>
                    </Grid>


                    {/*<Grid*/}
                    {/*    xs={12}*/}
                    {/*    md={7}*/}
                    {/*>*/}
                    {/*    <OverviewSubscriptionUsage*/}
                    {/*        chartSeries={[{*/}
                    {/*            name: 'This year', data: [40, 37, 41, 42, 45, 42, 36, 45, 40, 44, 38, 41]*/}
                    {/*        }, {*/}
                    {/*            name: 'Last year', data: [26, 22, 19, 22, 24, 28, 23, 25, 24, 21, 17, 19]*/}
                    {/*        }]}*/}
                    {/*    />*/}
                    {/*</Grid>*/}

                    <Grid
                        xs={12}
                        md={6}
                    >
                        <OverviewOrders
                            orders={orders}
                        />
                    </Grid>

                </Grid>
            </Container>
        </Box>
    </>);
}
