import {Accordion, AccordionDetails, AccordionSummary, Stack, Typography, useMediaQuery} from "@mui/material";
import {Circle, CloseRounded, KeyboardArrowDownRounded, Person2} from "@mui/icons-material";
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import {styled, useTheme} from "@mui/material/styles";
import {useState} from "react";

export function AccordionBtn({opened}) {
    const theme = useTheme();

    return (<div className='close-btn'>
        {opened ? <CloseRounded fontSize={'medium'} sx={{color: theme.palette.primary.dark}}/> :
            <KeyboardArrowDownRounded fontSize={'medium'} sx={{color: theme.palette.primary.dark}}/>}
    </div>);
}

export function CustomAccordion({label, text}) {
    const [expanded, setExplanded] = useState(false);
    const theme = useTheme();
    const isMdScreen = useMediaQuery(theme.breakpoints.down('lg'));

    return (<Accordion
        onChange={(e, opened) => {
            setExplanded(opened);
        }}
        sx={{
            padding: '1.0625rem 0',
            boxShadow: 'none',
            '&:before': {
                backgroundColor: '#E2E2E2',
            },
        }}
    >
        <AccordionSummary expandIcon={<AccordionBtn opened={expanded}/>}>
            <Typography sx={{
                fontWeight: 500,
                fontSize: isMdScreen ? '1rem' : '1.375rem',
                lineHeight: '130%',
                color: '#2c2c2c'
            }}>
                {label}
            </Typography>
        </AccordionSummary>
        <AccordionDetails>
            {text}
        </AccordionDetails>
    </Accordion>);
}

export function QuestionsList() {
    const questionsList = [{
        label: "How do I benefit?",
        value: "Bmining owns several data centers, and each of them has new special equipment for Bitcoin mining. It is this equipment that you rent from our company for a period of 1 year, and it will mine Bitcoin for you 24/7 for a whole year. Bitcoin, which will be mined by you with the help of our equipment, will be instantly credited to your personal wallet. Keep in mind that you can withdraw your Bitcoin absolutely at any time, sell it or save it to resell later at a higher price.",
    }, {
        label: "What is cryptocurrency in general?",
        value: "Cryptocurrency is a digital currency that is not controlled by states or central banks. It makes transaction processing independent, transparent to all participants of the network of computers included in the blockchain, and at the same time anonymous.",
    }, {
        label: "What is GH/s in simple words?",
        value: <Stack spacing={'1.25rem'}>
                                    <span>
                                    GH/s (gigahash per second) is an indicator of the speed of Bitcoin mining equipment.
                                    The higher the GH/s, the more Bitcoins you can get.
                                    </span>
            <span>
                                    For example, if the network has 5 GH/s, it means that the network can perform 5
                                    trillion calculations per second.
                                    </span>
        </Stack>,
    }, {
        label: "Do Mining contracts have a provision for filing taxes?",
        value: "Yes, indeed, at the end of the contract, we can provide you with an official document indicating the amount of investment and profit. This will help you prepare a tax return statement.",
    }, {
        label: "How to understand what exactly depends the profitability of investing in cryptocurrencies?",
        value: <Stack spacing={'1.25rem'}>
                                        <span>
                                        Profitability depends on the rate that is valid at the time of purchase of the cryptocurrency, the rate at the time of sale of the cryptocurrency, as well as the power of the equipment with which you mine Bitcoin.
                                        </span>
            <span>
                                        We offer you the most efficient high-quality equipment.
                                        </span>
        </Stack>,
    }, {
        label: "Can I get my initial deposit back?",
        value: <span>
            Yes, you can certainly get back the entire amount of your deposit when your contract expires.<br/>
                                Thus, if you invest $1. 000, then in a year you will receive $1. 440 net profit. That is, you will receive the entire amount of your initial deposit + $440 income.
        </span>,
    },];
    return (<Stack>
        {questionsList.map((item, idx) => {
            return (<CustomAccordion key={"acc_" + idx} label={item.label} text={item.value}/>);
        })}
    </Stack>);
}
