import {useEffect, useState} from "react";
import {useSettings} from "@/hooks/use-settings";
import {useTheme} from "@mui/material/styles";

export default function BackgroundWrapper({children, hideOverflowX = false}) {
    const [boxStyles, setBoxStyles] = useState({});
    const settings = useSettings();
    const theme = useTheme();
    let excludedRoutes = ['main', 'login', 'register'];
    useEffect(() => {
        let tempBoxStyles = {
            minHeight: 'calc(100vh - 64px)',
            flexGrow: 1,
            backgroundColor: '#dce2ee',
            height: '100%',
            p: 0,
            overflowX: hideOverflowX ? 'hidden' : 'initial',
            display: 'flex',
            flexFlow: 'column nowrap',
            backgroundRepeat: 'no-repeat',
        };
        if (settings.paletteMode == 'dark') {
            tempBoxStyles.backgroundColor = '';
            tempBoxStyles.backgroundImage = 'url("/assets/bg-dark-2.svg")';
        } else {
            tempBoxStyles.backgroundImage = 'url("/assets/bg-2.svg")';
        }
        tempBoxStyles.backgroundSize = 'cover';
        tempBoxStyles.backgroundPositionY = '6.375rem';
        tempBoxStyles.backgroundRepeat = 'no-repeat';

        if (excludedRoutes.includes(false)) {
            tempBoxStyles.background = '';
            tempBoxStyles.backgroundColor = 'white';
        } else {
            tempBoxStyles.backgroundSize = 'cover';
            tempBoxStyles.backgroundPosition = 'center 170px';
            tempBoxStyles.backgroundAttachment = 'fixed';
        }

        setBoxStyles(tempBoxStyles);

    }, [settings.paletteMode, theme]);

    return <>
        <div
            className='main-bg'
            style={boxStyles}
        >
            {children}
        </div>
    </>;
}
