import {Box, Card, Divider, Stack, Typography, useMediaQuery} from "@mui/material";
import {useTheme} from "@mui/material/styles";

export default function OverviewCounter({title, amount, Icon = null, color = 'primary'}) {
    const theme = useTheme();
    const isMdScreen = useMediaQuery(theme.breakpoints.down('lg'));
    return (<Card sx={{
        borderRadius: '50px',
        padding: '0',
    }}>
        <Stack
            alignItems="center"
            direction={{
                xs: 'column',
                md: 'column',
                sm: 'row',
                lg: 'row',
            }}
            spacing={2}
            sx={{
                px: 2, py: 3
            }}
        >
            <div>
                {Icon ? <Icon color={color} sx={{fontSize: '48px'}}/> :
                    <img src="/assets/iconly/iconly-glass-tick.svg" width={48}/>}
            </div>
            {/*<Divider orientation={'vertical'} flexItem/>*/}
            <Stack sx={{
                flexGrow: 1, justifyContent: 'center', display: 'flex', alignItems: 'center', flexFlow: 'column nowrap'
            }}>
                <Typography
                    color="text.secondary"
                    variant="body2"
                >
                    {title}
                </Typography>
                <Typography
                    sx={{
                        textAlign: 'center', display: 'inline-flex',
                    }}
                    color="text.primary"
                    variant="h4"
                >
                    {amount}
                </Typography>
            </Stack>
        </Stack>
        {/*<Divider/>*/}
        {/*<CardActions>*/}
        {/*    <Button*/}
        {/*        color="inherit"*/}
        {/*        endIcon={(*/}
        {/*            <SvgIcon>*/}
        {/*                <ArrowRightIcon/>*/}
        {/*            </SvgIcon>*/}
        {/*        )}*/}
        {/*        size="small"*/}
        {/*    >*/}
        {/*        See all tasks*/}
        {/*    </Button>*/}
        {/*</CardActions>*/}
    </Card>);
}
