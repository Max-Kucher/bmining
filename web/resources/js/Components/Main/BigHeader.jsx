import {Typography, useMediaQuery} from "@mui/material";
import {useTheme} from "@mui/material/styles";

export function BigHeader({children, sx, ...props}) {
    const theme = useTheme();
    const isMdScreen = useMediaQuery(theme.breakpoints.down('lg'));
    return (
        <Typography
            sx={{
                fontFamily: 'Montserrat',
                fontStyle: 'normal',
                fontWeight: '800',
                fontSize: isMdScreen ? "2rem" : '3.125rem',
                lineHeight: isMdScreen ? "2rem" : '3.8125rem',
                ...sx,
            }} fontWeight={'bold'} letterSpacing={0}
            {...props}
        >
            {children}
        </Typography>
    );
}
