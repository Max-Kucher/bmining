import {Box, Stack, Typography} from "@mui/material";
import {alpha, useTheme} from "@mui/material/styles";

export default function IconedPaperWithBg({
                                              children,
                                              bg = 'url(/assets/paper-mount.svg) no-repeat',
                                              bgColor = '#fff',
                                              sx = {},
                                          }) {
    const theme = useTheme();
    return (
        <Box sx={
            {
                flex: '100%',
                minWidth: '16.875rem',
                minHeight: '16.875rem',
                background: bg,
                // maxWidth: '16.875rem',
                padding: '1.875rem 1.25rem 1.875rem 1.875rem',
                borderRadius: '0.3125rem',
                backgroundPosition: 'right bottom',
                backgroundRepeat: 'no-repeat',
                boxShadow: '0px 4px 100px rgba(0, 0, 0, 0.1)',
                backgroundColor: bgColor,
                backgroundSize: 'cover',
                ...sx,
            }}>
            {children}
        </Box>
    );
}
