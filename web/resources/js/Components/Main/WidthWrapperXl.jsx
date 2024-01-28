import {Box} from "@mui/material";

export default function WidthWrapperXl({children, sx}) {
    return <Box width={'100%'} maxWidth={'1920px'} mx={"auto"} sx={{...sx}}>
        {children}
    </Box>
}
