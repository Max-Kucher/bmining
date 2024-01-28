import {useTheme} from '@mui/material/styles';
import {useSettings} from "@/hooks/use-settings";

export const Logo = () => {
    const theme = useTheme();
    const settings = useSettings();
    const fillColor = theme.palette.primary.main;

    return (
        <>
            {settings.paletteMode == 'dark' ? <img height={'70px'} src="/assets/dark-logo.svg" alt="Logo"/> :
                <img height={'70px'} src="/assets/logo.svg" alt="Logo"/>}
        </>
    );
}
