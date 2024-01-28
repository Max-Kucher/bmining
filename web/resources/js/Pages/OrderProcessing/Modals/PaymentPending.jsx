import {Avatar, Box, Button, Container, Paper, SvgIcon, Typography} from "@mui/material";
import CheckIcon from "@untitled-ui/icons-react/build/esm/Check";
import {Link} from "@inertiajs/react";
import {Check, HourglassBottom} from "@mui/icons-material";
import {StatusPaper} from "@/Pages/OrderProcessing/Modals/StatusPaper";
import {LoaderIcon} from "react-hot-toast";

export default function PaymentPending(props) {
    return (<StatusPaper icon={<HourglassBottom/>} color={'warining'} title={'Penging'}
                         text={'Your order is awaiting payment. If you have already paid for the order, please try to check it later. An automatic status check occurs every minute.'}
                         {...props} />);
}
