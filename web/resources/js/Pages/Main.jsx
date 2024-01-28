import {Header} from "@/Components/Main/Header";
import WidthWrapper from "@/Components/Main/WidthWrapper";
import {Button, Divider, Grid, Slide, Stack, useMediaQuery} from "@mui/material";
import {alpha, useTheme} from "@mui/material/styles";
import IconedPaper from "@/Components/Main/IconedPaper";
import {BigHeader} from "@/Components/Main/BigHeader";
import {DefaultColored} from "@/Components/Main/DefaultColored";
import IconedPaperWithBg from "@/Components/Main/IconedPaperWithBg";
import {SimpleTileMount} from "@/Components/Main/SimpleTileMount";
import WidthWrapperXl from "@/Components/Main/WidthWrapperXl";
import {GetStartedButton, ParamsList, PlanBlock} from "@/Components/Main/PlanBlock";
import styles from "../../scss/main.scss";
import {NumberedBlock} from "@/Components/Main/NumberedBlock";
import {QuestionsList} from "@/Components/Main/QuestionsList";
import {TitledBlockTrans} from "@/Components/Main/TitledBlockTrans";
import {Footer} from "@/Components/Main/Footer";
import numeral from "numeral";
import {Suspense, useEffect, useState} from 'react';
import ReactVisibilitySensor from "react-visibility-sensor-v2";
import Fade from "@mui/material/Fade";
import * as React from 'react';

const BuyMinerForm = React.lazy(() => import('./../Forms/BuyMinerForm'));

function SlideInOnScroll({children, direction = 'left', duration = 400, ...props}) {
    const [trigger, setTrigger] = useState(false);

    return (<ReactVisibilitySensor offset={{top: 1, bottom: -400}} onChange={(isVisible) => {
        if (isVisible === true) {
            setTrigger(isVisible);
        }
    }}>
        <div>
            <Slide direction={direction} in={trigger} timeout={duration}>
                <div>
                    {children}
                </div>
            </Slide>
        </div>
    </ReactVisibilitySensor>);
}

function FadeInOnScroll({children, duration = 400, ...props}) {
    const [trigger, setTrigger] = useState(false);

    return (<ReactVisibilitySensor offset={{top: 1, bottom: -400}} onChange={(isVisible) => {
        if (isVisible === true) {
            setTrigger(isVisible);
        }
    }}>
        <div>
            <Fade in={trigger} timeout={duration}>
                <div>
                    {children}
                </div>
            </Fade>
        </div>
    </ReactVisibilitySensor>);
}


export default function Main(props) {

    const [tariffs, setTariffs] = useState([]);
    const [hashrate, setHashrate] = useState(23000);
    useEffect(() => {
        axios.get('/api/main-data').then((response) => {
            setTariffs(response.data.tariffs);
            setHashrate(response.data.hashRate);
        });
    }, []);

    return (<>
        <PageComponent hashRate={hashrate} tariffs={tariffs}/>
    </>);
}


export function PageComponent({tariffs, hashRate}) {

    const theme = useTheme();
    const isMdScreen = useMediaQuery(theme.breakpoints.down('lg'));
    const paperStyles = {
        minWidth: '16.875rem',
        background: alpha('#F6FEF9', 0.5),
        backdropFilter: 'blur(13px)',
        boxShadow: '0px 4px 100px rgba(0, 0, 0, 0.1)', // maxWidth: '16.875rem',
        padding: '1.0625rem 1.25rem 1.0625rem 1.125rem',
        borderRadius: 2,
    };

    return (<>
        <WidthWrapperXl>
            <Header/>
            {/*<Seo title={'Start mining'}></Seo>*/}
            <div style={{
                background: 'url("/assets/main-bg-2.svg") no-repeat',
                backgroundPosition: 'center 90px',
                backgroundRepeat: 'no-repeat',
            }}>
                <WidthWrapper>
                    <Grid pt={'93px'} container height={'690px'}
                          sx={{}}>
                        <Grid item xs={12} md={6}>
                            <div>
                                <div style={{
                                    "fontFamily": 'Montserrat',
                                    'fontStyle': 'normal',
                                    'fontWeight': '800',
                                    'fontSize': isMdScreen ? '2rem' : '3.125rem',
                                    'lineHeight': isMdScreen ? '2.5rem' : '3.8125rem',
                                    marginBottom: '1.25rem',
                                    textAlign: isMdScreen ? 'center' : 'left',
                                }}>
                                    <span
                                        style={{color: theme.palette.primary.dark, marginRight: '15px'}}>The best</span>
                                    Bitcoin<br/> cloud mining<br/> platform
                                </div>
                                <div style={{
                                    marginBottom: '2.5rem', textAlign: isMdScreen ? 'center' : 'left',
                                }}>
                                    Bmining is a fast-growing online and mobile crypto<br/>
                                    mining platform that brings you the most efficient tools to<br/>
                                    earn cryptocurrency with a small investment.
                                </div>
                                <Stack sx={{
                                    marginBottom: isMdScreen ? '2.25rem' : '', marginTop: isMdScreen ? '2.25rem' : '',
                                }} spacing={'1.25rem'} direction={'row'}>
                                    <Button href={'#miner-calc'}
                                            startIcon={<img src={'/assets/icons/calculator.svg'}/>}
                                            variant={'contained'}>Calculator</Button>
                                    <Button href={'#miner-calc'}
                                            startIcon={<img src={'/assets/icons/pick.svg'}/>}
                                            sx={{color: theme.palette.primary.contrastText}} variant={'outlined'}>
                                        Start mining now
                                    </Button>
                                </Stack>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={6} pb={'10.825rem'}>
                            <div style={{
                                height: '100%', display: 'flex', flexFlow: 'cloumn nowrap', alignItems: 'flex-end'
                            }}>
                                <Stack spacing={2}
                                       direction={isMdScreen ? 'column' : 'row'}
                                       sx={{width: '100%'}}>
                                    <SlideInOnScroll duration={500} direction={'top'}>

                                        <IconedPaper sx={paperStyles}
                                                     icon={<img width={'22px'} height={'22px'}
                                                                src={'/assets/icons/coins.svg'}/>}

                                                     title={'Average profit'}
                                                     subtitle={"Your equipment’s prospective profit"}/>
                                    </SlideInOnScroll>
                                    <SlideInOnScroll duration={500} direction={'top'}>
                                        <IconedPaper sx={paperStyles}
                                                     icon={<img width={'22px'} height={'22px'}
                                                                src={'/assets/icons/credit-card.svg'}/>}

                                                     title={'Instant payouts'}
                                                     subtitle={"High level security for all customers"}/>
                                    </SlideInOnScroll>
                                </Stack>
                            </div>
                        </Grid>
                    </Grid>
                </WidthWrapper>
            </div>
            <div style={{
                background: 'url("/assets/bottom-placeholder-2.svg") no-repeat',
                backgroundPosition: 'bottom center',
                backgroundColor: '#BFC4CE',
                paddingTop: '2.75rem',
                paddingBottom: isMdScreen ? '5rem' : '7.4375rem',
            }}>
                <WidthWrapper>
                    <Grid container>
                        <Grid item xs={12} md={6}>
                            <BigHeader sx={{
                                marginBottom: '1.25rem',
                                color: "#67696b",
                                textAlign: isMdScreen ? 'center' : 'left',
                            }}>
                                How can You<br/> earn with us?
                            </BigHeader>
                            <Stack spacing={3}>
                                <div style={{
                                    color: '#67696b', fontWeight: 'medium', textAlign: isMdScreen ? 'center' : 'left',
                                }}>
                                    We own several mining farms in places with cheap electricity and rent out mining
                                    equipment to our investors. You purchase contrat once, that is you invest money
                                    in
                                    equipment. Our mining equipment will work for you 24/7 and your net profit will
                                    be
                                    12%
                                    per year. Thus, if you invest $1. 000 then you will receive $1. 440 in a year as
                                    a
                                    net
                                    profit.
                                </div>
                                <div style={{
                                    color: '#67696b', fontWeight: 'medium', textAlign: isMdScreen ? 'center' : 'left',
                                }}>
                                    At the same time, your profit will be added to your personal account daily (you
                                    can
                                    withdraw your profit absolutely at any time). At the end of the annual contract,
                                    you
                                    will not only return your investments, but also receive a reward on your deposit
                                    in
                                    the
                                    amount of $ 1. 000. As a result, after investing $ 1. 000, you will receive $ 2.
                                    440
                                    in
                                    365 days!
                                </div>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} md={6} sx={{paddingLeft: isMdScreen ? '' : '8.75rem'}}>
                            <BigHeader sx={{
                                marginBottom: '1.25rem',
                                color: "#67696b",
                                textAlign: isMdScreen ? 'center' : 'left',
                            }}>
                                Why You <br/>can trust us?
                            </BigHeader>
                            <Stack spacing={4} sx={{display: 'flex'}} justifyContent={'center'}
                                   alignItems={'center'}>
                                <div style={{
                                    color: '#67696b', fontWeight: 'medium', textAlign: isMdScreen ? 'center' : 'left',
                                }}>
                                    Why can you trust us and why are we your reliable partner? Our company has a
                                    certificate
                                    and has been successfully operating in this market for 3 years. We have more
                                    than
                                    1,000
                                    grateful customers. You can easily read their reviews.
                                </div>
                                <div style={{
                                    color: '#67696b', fontWeight: 'medium', textAlign: isMdScreen ? 'center' : 'left',
                                }}>
                                    And the most important part. Your money is insured and you risk nothing. You can
                                    follow
                                    this link to the insurance company's website and see for yourself.
                                </div>
                            </Stack>
                        </Grid>
                    </Grid>
                </WidthWrapper>
            </div>
            <div style={{
                paddingTop: isMdScreen ? '1rem' : '6.25rem', paddingBottom: isMdScreen ? '2rem' : '6.25rem',
            }}
                 id={'miner-calc'}
            >
                <Grid xs={12} px={isMdScreen ? '1rem' : 0}>
                    <Suspense>
                        <BuyMinerForm isAuthorithed={false} id={'calc'} tariffs={tariffs}
                                      hashRate={hashRate}>
                        </BuyMinerForm>
                    </Suspense>
                </Grid>
            </div>

            <div style={{
                backgroundColor: '#fff', marginBottom: '4.375rem', paddingTop: '4.5rem',
            }}>
                <WidthWrapper>
                    <BigHeader textAlign={isMdScreen ? 'center' : 'left'}>
                        Control the process
                    </BigHeader>
                    <BigHeader textAlign={isMdScreen ? 'center' : 'left'}
                               sx={{color: theme.palette.primary.dark, marginBottom: '1.125rem'}}>
                        <Stack direction={'row'} spacing={2}>
                            <img hidden={isMdScreen ? 'center' : 'left'} src="/assets/icons/planet.svg" alt="P"/>
                            <span>
                            anywhere in the world
                        </span>
                        </Stack>
                    </BigHeader>
                    <DefaultColored sx={{
                        marginBottom: '2.5rem',
                        lineHeight: '183.3%',
                        fontSize: '1.0625rem',
                        textAlign: isMdScreen ? 'center' : 'left',
                    }}>
                        Unlike conventional currencies like the dollar, the pound, and the euro, Bitcoin has<br/>
                        several exceptional advantages. Bitcoin allows for a higher level of privacy, security,<br/>
                        and integrity as far as financial transactions go. Additionally, cryptocurrency can be<br/>
                        used to purchase commodities anonymously.
                    </DefaultColored>

                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6} lg={3}>
                            <SimpleTileMount
                                icon={<img height={'24px'} width='26px' src='/assets/icons/finger-check.svg'/>}

                                title={<span>Purchase mining contracts and rent hash power from wherever you are</span>}
                                subtitle={<span>Our sevices are currently<br/> available in 70+ countries<br/> on different continents</span>}/>
                        </Grid>
                        <Grid item xs={12} md={6} lg={3}>
                            <SimpleTileMount
                                icon={<img height={'24px'} width='26px' src='/assets/icons/gadgets.svg'/>}

                                title={<span>Control cloud mining<br/> process and stay<br/> updated 24/7</span>}
                                subtitle={<span>Check your mining and<br/> passive income state<br/> anytime from any device</span>}/>
                        </Grid>
                        <Grid item xs={12} md={6} lg={3}>
                            <SimpleTileMount
                                icon={<img height={'24px'} width='26px' src='/assets/icons/earnings.svg'/>}

                                title={<span>Withdraw your rewards<br/> from cloud mining with<br/> zero stress</span>}
                                subtitle={<span>We guarantee instant<br/> and 100% safe<br/> withrawals</span>}/>
                        </Grid>
                        <Grid item xs={12} md={6} lg={3}>
                            <IconedPaperWithBg
                                bgColor={theme.palette.primary.dark}
                                bg='url(/assets/paper-mount-2.svg) no-repeat'
                                sx={{
                                    display: 'flex', justifyContent: 'center', alignItems: 'center',
                                }}
                            >
                                <Stack sx={{
                                    justifyContent: 'center', alignItems: 'center',
                                }} height={'100%'} spacing={'1.25rem'}>
                                    <DefaultColored sx={{
                                        fontWeight: 700,
                                        fontSize: '1.0625rem',
                                        lineHeight: '140%',
                                        textAlign: 'center',
                                        textTransform: 'uppercase',
                                    }}>
                                        Create your account and get started
                                    </DefaultColored>
                                    <Button sx={{
                                        backgroundColor: '#fff',
                                        padding: '1.3125rem 2.4375rem',
                                        fontWeight: 800,
                                        fontSize: '0.9375rem',
                                        lineHeight: '1.1875rem',
                                        borderRadius: '0.3125rem',
                                    }} variant={'contained'}
                                            component={"a"}
                                            href={'#miner-calc'}
                                    >
                                        Start mining now
                                    </Button>
                                </Stack>
                            </IconedPaperWithBg>
                        </Grid>
                    </Grid>
                </WidthWrapper>
            </div>

            <div style={{
                background: 'url(/assets/bottom-block-placeholder.svg) no-repeat',
                backgroundPosition: 'center bottom',
                paddingBottom: isMdScreen ? '2rem' : '11.25rem'
            }}>
                <WidthWrapper sx={{border: 'solid 5px #E9E9E9', backgroundColor: '#fff'}}>
                    <Stack justifyContent={'center'} alignItems={'center'} sx={{
                        display: 'flex', paddingBottom: isMdScreen ? '2rem' : '2.5rem', paddingTop: '3.125rem',
                    }}>
                        <BigHeader sx={{textAlign: 'center', marginBottom: '1.125rem'}}>Press Mentions</BigHeader>
                        <div style={{overflow: 'hidden', maxWidth: '100%',}}>
                            {isMdScreen ? <Stack direction={'row'} padding={2} spacing={3}>
                                <img width={'40px'} height={'40px'} src="/assets/icons/btc.svg" alt="Logos"/>
                                <img width={'40px'} height={'40px'} src="/assets/icons/Etherium.svg" alt="Logos"/>
                                <img width={'40px'} height={'40px'} src="/assets/icons/GoChain.svg" alt="Logos"/>
                                <img width={'40px'} height={'40px'} src="/assets/icons/Prysm.svg" alt="Logos"/>
                            </Stack> : <img style={{objectPosition: 'center center'}} src="/assets/logos.png"
                                            alt="Logos"/>}
                        </div>
                    </Stack>
                </WidthWrapper>
            </div>


            <div style={{
                backgroundColor: '#F6F6F6'
            }}>
                <WidthWrapper sx={{}}>
                    <Stack justifyContent={'center'} alignItems={'center'} sx={{
                        display: 'flex',

                    }}>
                        <BigHeader sx={{textAlign: 'center', marginBottom: '1.125rem'}}>Choose Your
                            Earnings</BigHeader>
                        <DefaultColored sx={{
                            textAlign: 'center', marginBottom: '1.9375rem', fontSize: '17px',
                        }}>
                            Our service packages are on opportunity to receive a stable passive<br/>
                            income of up to 81% in cryptocurrency
                        </DefaultColored>
                        <Grid container spacing={3} sx={{marginBottom: '60px'}}>
                            {tariffs.map((tariff, idx) => {
                                let hashRateItem = hashRate * (tariff.price / 100);
                                let yearProfit = numeral(1000 * (tariff.percent / 100)).format("0,000").replace(",", ' ');
                                hashRateItem = numeral(hashRateItem).format("0,000").replace(",", ' ');
                                return (<Grid key={idx} item xs={12} md={4}>
                                    <SlideInOnScroll>
                                        <PlanBlock
                                            title={tariff.name}
                                            link={<GetStartedButton href={'#miner-calc'} text={'Get Started'}/>}
                                            params={<ParamsList params={[{
                                                label: "PERIOD", value: '1 Year'
                                            }, {
                                                label: "MINIMUM POWER", value: `${hashRateItem} GH/s`
                                            }, {
                                                label: "MINIMUM RENT", value: `${tariff.price} USD`
                                            }, {
                                                label: "PROFIT FROM 1K", value: `${yearProfit} USD`, active: true
                                            }, {
                                                label: "PROFITABILITY", value: `${tariff.percent}%`
                                            }]}/>}
                                        />
                                    </SlideInOnScroll>
                                </Grid>);
                            })}
                        </Grid>

                        <div className={'info-place'}
                             style={{
                                 marginBottom: '75px',
                                 textAlign: isMdScreen ? 'center' : 'center',
                                 fontSize: isMdScreen ? '0.9rem' : '1.875rem',
                                 padding: isMdScreen ? '0.625rem' : '3.25rem',
                             }}>
                            THIS IS YOUR NET (CLEAN) PROFIT. YOUR MAIN DEPOSIT WILL BE REFUNDED AT THE END OF THE
                            CONTACT
                        </div>
                    </Stack>
                </WidthWrapper>
            </div>


            <div style={{
                backgroundColor: '#fff',
            }}>
                <WidthWrapper>
                    <Grid pt={'93px'} container sx={{paddingBottom: isMdScreen ? '2rem' : '4.375rem'}}>
                        <Grid item xs={12} md={6}>
                            <div style={{
                                paddingBottom: isMdScreen ? '2rem' : '0',
                            }}>
                                <div style={{
                                    fontWeight: '800',
                                    textAlign: isMdScreen ? 'center' : 'left',
                                    fontSize: isMdScreen ? '2rem' : '3.125rem',
                                    lineHeight: isMdScreen ? '2.5rem' : '3.8125rem',
                                    marginBottom: '1.25rem',
                                }}>
                                    How to start<br/>
                                    cloud mining?
                                </div>
                                <div style={{
                                    marginBottom: '2.5rem', textAlign: isMdScreen ? 'center' : 'left',
                                }}>
                                    It’s easy to start investing with Bmining. Only 3 steps to get<br/>
                                    a stable income. Make your access to the best cloud<br/>
                                    mining wherever you are.
                                </div>
                                <Stack spacing={'1.25rem'} direction={'row'}
                                       justifyContent={isMdScreen ? 'center' : 'flex-start'}>
                                    <GetStartedButton href={'/how-it-works'} sx={{maxWidth: '290px'}}
                                                      variant={'contained'}
                                                      text={'Get more information'}>

                                    </GetStartedButton>
                                </Stack>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <div style={{height: '100%', display: 'flex'}}>
                                <Stack spacing={'1.875rem'} direction={'column'} sx={{width: '100%'}}>
                                    <SlideInOnScroll direction={'left'} duration={100}>
                                        <NumberedBlock showArrow={true}
                                                       number={'01'} text={<span>Make an account on Bmining</span>}
                                        />
                                    </SlideInOnScroll>
                                    <SlideInOnScroll direction={'left'} duration={200}>
                                        <NumberedBlock showArrow={true}
                                                       number={'02'}
                                                       text={<span>Rent our eauipment<br/> to mine Bitcoins</span>}
                                        />
                                    </SlideInOnScroll>
                                    <SlideInOnScroll direction={'left'} duration={300}>
                                        <NumberedBlock
                                            number={'03'}
                                            text={<span>Earn daily and Withdraw<br/>
                                                    Bitcoin to your Bank account
                                                </span>}
                                        />
                                    </SlideInOnScroll>
                                </Stack>
                            </div>
                        </Grid>
                    </Grid>
                    <Divider/>
                </WidthWrapper>
            </div>

            <div style={{
                backgroundColor: '#fff',
            }}>
                <WidthWrapper sx={{
                    paddingTop: '4.375rem', paddingBottom: isMdScreen ? '2rem' : '4.375rem',
                }}>
                    <Stack spacing={'1.5625rem'} justifyContent={'center'} alignItems={'center'} sx={{
                        display: 'flex',
                    }}>

                        <DefaultColored>
                            <BigHeader sx={{textAlign: 'center', marginBottom: '1.125rem'}}>
                                Frequently Asked Questions
                            </BigHeader>
                        </DefaultColored>
                        <DefaultColored sx={{
                            textAlign: 'center',
                            marginBottom: '30px',
                            fontWeight: 500,
                            fontSize: '17px',
                            lineHeight: '160%',
                        }}>
                            Find answers to frequently asked questions
                        </DefaultColored>
                    </Stack>
                    <QuestionsList/>
                </WidthWrapper>
            </div>

            <div style={{
                background: 'url("/assets/orange-bottom-placeholder.svg") no-repeat',
                backgroundPosition: 'bottom center',
                backgroundColor: theme.palette.primary.dark,
                paddingTop: '4.375rem',
                paddingBottom: isMdScreen ? '2rem' : '7.4375rem',
            }}>
                <WidthWrapper sx={{
                    // paddingTop: '4.375rem',
                }}>
                    <Stack spacing={'1.5625rem'} justifyContent={'center'} alignItems={'center'} sx={{
                        display: 'flex', marginBottom: '1.875rem',
                    }}>

                        <DefaultColored>
                            <BigHeader sx={{textAlign: 'center', marginBottom: '1.125rem'}}>
                                Advantages
                            </BigHeader>
                        </DefaultColored>
                        <DefaultColored sx={{
                            textAlign: 'center',
                            marginBottom: '30px',
                            fontWeight: 500,
                            fontSize: '17px',
                            lineHeight: '160%',
                        }}>
                            Take advantage of fast and easy acces to the most<br/>
                            seamless and efficient cloud mining services
                        </DefaultColored>
                    </Stack>
                    <Grid container spacing={3} alignContent={'stretch'} justifyContent={'center'}>
                        <Grid item xs={11} md={6} lg={3}>
                            <TitledBlockTrans
                                title={'163 PH/s'}
                                text={<span>our total power<br/> in management</span>}
                            />
                        </Grid>
                        <Grid item xs={11} md={6} lg={3}>
                            <TitledBlockTrans
                                title={'3917'} text={<span>mining machines</span>}
                            />
                        </Grid>
                        <Grid item xs={11} md={6} lg={3}>
                            <TitledBlockTrans
                                title={'0%'}
                                text={<span>of any commissions<br/> or hidden payments</span>}
                            />
                        </Grid>
                        <Grid item xs={11} md={6} lg={3}>
                            <TitledBlockTrans
                                title={'9870+'} text={'customers'}/>
                        </Grid>
                    </Grid>
                </WidthWrapper>
            </div>

            <Footer/>


        </WidthWrapperXl>

    </>);
}
