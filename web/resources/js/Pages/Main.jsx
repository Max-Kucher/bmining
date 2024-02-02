// import {Header} from "@/Components/Main/Header";
import BmHeader from "@/Components/Bm/BmHeader";
import MainSection from "@/Components/MainSection";
import StepsSection from "@/Components/StepsSection";
import StoriesSection from "@/Components/StoriesSection";
import AdvantagesSection from "@/Components/Bm/AdvantagesSection";
import PlansSection from "@/Components/Bm/PlansSection";
import FaqSection from "@/Components/Bm/FaqSection";
import BmFooter from "@/Components/Bm/BmFooter";

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
// import {Footer} from "@/Components/Main/Footer";
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
    const homeRef = React.useRef(null);
    const calcRef = React.useRef(null);
    const plansRef = React.useRef(null);
    const faqRef = React.useRef(null);
    const isMdScreen = useMediaQuery(theme.breakpoints.down('lg'));
    const paperStyles = {
        minWidth: '16.875rem',
        background: alpha('#F6FEF9', 0.5),
        backdropFilter: 'blur(13px)',
        boxShadow: '0px 4px 100px rgba(0, 0, 0, 0.1)', // maxWidth: '16.875rem',
        padding: '1.0625rem 1.25rem 1.0625rem 1.125rem',
        borderRadius: 2,
    };

    const scrollToBlock = (ref) => {
        if (ref && ref.current) {
            ref.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
    };

    return (
        <>
            <div className="container">
                <BmHeader homeRef={homeRef} scrollToBlock={scrollToBlock} calcRef={calcRef} plansRef={plansRef} faqRef={faqRef}/>
                <MainSection/>
                <StepsSection calcRef={calcRef} />
                <StoriesSection/>
                <AdvantagesSection/>
                <PlansSection plansRef={plansRef}/>
                <FaqSection faqRef={faqRef} />
                <BmFooter scrollToBlock={scrollToBlock} plansRef={plansRef}/>
            </div>
        </>
    );
}
