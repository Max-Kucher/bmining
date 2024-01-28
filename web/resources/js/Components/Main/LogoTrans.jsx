import {useTheme} from "@mui/material/styles";
import {useMediaQuery} from "@mui/material";
import {Link} from "react-router-dom";
import {mainRoutes} from "@/routes/main";
import {RouterLink} from "@/components/router-link";

export function LogoTrans() {
    const theme = useTheme();
    const isMdScreen = useMediaQuery(theme.breakpoints.down('lg'));

    return (
        <>
            <RouterLink to={mainRoutes.main} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <img width={'auto'} height={isMdScreen ? "30px" : '60px'}
                     src={isMdScreen ? "/assets/logo-sm.svg" : "/assets/logo-trans.svg"} alt="Logo"/>
            </RouterLink>
        </>
    );
}
