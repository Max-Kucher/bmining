import {Box, useMediaQuery} from "@mui/material";
import {useTheme} from "@mui/material/styles";

export default function WidthWrapper({children, sx}) {
    const theme = useTheme();
    const isMdScreen = useMediaQuery(theme.breakpoints.down('lg'));
    return <Box maxWidth={'lg'} mx={"auto"} sx={{
        padding: isMdScreen ? '1rem' : '0',
        ...sx
    }}>
        {children}
    </Box>
}
