import IconedPaperWithBg from "@/Components/Main/IconedPaperWithBg";
import {Box, Stack, Typography, useMediaQuery} from "@mui/material";
import {useTheme} from "@mui/material/styles";

export function SimpleTileMount({
                                    title,
                                    subtitle,
                                    icon,
                                    ...props
                                }) {
    const theme = useTheme();
    const isMdScreen = useMediaQuery(theme.breakpoints.down('lg'));
    return (
        <IconedPaperWithBg {...props}>
            <Stack spacing={1} sx={{height: '100%'}}>
                <Box sx={{
                    textAlign: isMdScreen ? 'center' : 'left',
                }}>
                    {icon}
                </Box>
                <Typography sx={{
                    fontWeight: 700,
                    fontSize: isMdScreen ? '1rem' : '0.9375rem',
                    lineHeight: '140%',
                    textAlign: isMdScreen ? 'center' : 'left',
                }}>
                    {title}
                </Typography>
                <Typography fontSize={'13px'} sx={{
                    fontWeight: 500,
                    fontSize: isMdScreen ? '1rem' : '0.8125rem',
                    lineHeight: '140%',
                    textAlign: isMdScreen ? 'center' : 'left',
                }}>
                    {subtitle}
                </Typography>
            </Stack>
        </IconedPaperWithBg>
    );
}
