import {Box, Stack, Typography} from "@mui/material";
import {alpha, useTheme} from "@mui/material/styles";

export default function IconedPaper({title, subtitle, icon, sx}) {
    const theme = useTheme();
    return (
        <Box sx={
            {
                ...sx,
            }}>
            <Stack spacing={"0"}>
                {icon}
                <Typography fontSize={'15px'} sx={{
                    'fontWeight': 700,
                    'lineHeight': '183.3%',
                }}>
                    {title}
                </Typography>
                <Typography fontSize={'13px'} sx={{
                    fontWeight: 500,
                    fontSize: '13px',
                    lineHeight: '183.3%',
                }}>
                    {subtitle}
                </Typography>
            </Stack>
        </Box>
    );
}
