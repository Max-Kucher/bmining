import Briefcase01Icon from '@untitled-ui/icons-react/build/esm/Briefcase01';
import ArrowRightIcon from '@untitled-ui/icons-react/build/esm/ArrowRight';
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Divider,
    SvgIcon,
    Typography
} from '@mui/material';
import {useTheme} from "@mui/material/styles";
import {ImageAspectRatio} from "@mui/icons-material";
import {useSelector} from "react-redux";
import {selectToken} from "@/slices/userSlice";
import apiRequest from "@/api/helper";
import {toast} from "react-toastify";
import {useRouter} from "@/hooks/use-router";

export const PendingOrder = (props) => {
    const theme = useTheme();
    const token = useSelector(selectToken);
    const router = useRouter();
    const proceedOrder = () => {
        let data = JSON.parse(localStorage.getItem('pendingOrder'));
        apiRequest(token).patch(route('api.miner.store'), data)
            .then((response) => {
                if (response.data?.errors) {
                    toast.error('Error occurted during handle order.');
                    return;
                }
                localStorage.removeItem('pendingOrder');
                router.replace(`/orders/${response.data.order.id}/processing`);
            });
    };

    return (
        <Card {...props} sx={{
            height: '100%'
        }}>
            <CardContent>
                <Box
                    sx={{
                        alignItems: 'center',
                        display: 'flex'
                    }}
                >
                    <SvgIcon color="primary">
                        <Briefcase01Icon/>
                    </SvgIcon>
                    <Typography
                        color="primary.main"
                        sx={{pl: 1}}
                        variant="subtitle2"
                    >
                        NEW MINER
                    </Typography>
                </Box>
                <Typography
                    variant="h6"
                    sx={{
                        mt: 2,
                    }}

                >
                    Proceed to activate

                </Typography>
                <Typography
                    color="text.secondary"
                    sx={{mt: 1}}
                    variant="body2"
                >
                    Your miner has been successfully added and is waiting for confirmation!
                    Follow the link to activate the miner.
                </Typography>
            </CardContent>
            <Divider/>
            <CardActions sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
            }}>
                <Button
                    sx={{
                        padding: '0.7rem 2rem',
                    }}
                    variant={'contained'}
                    // color="inherit"
                    endIcon={(
                        <SvgIcon>
                            <ImageAspectRatio/>
                        </SvgIcon>
                    )}
                    size="medium"
                    onClick={proceedOrder}
                >
                    PROCEED
                </Button>
            </CardActions>
        </Card>
    );
};
