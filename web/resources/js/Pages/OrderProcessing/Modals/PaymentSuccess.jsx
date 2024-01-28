import {Avatar, Box, Button, Container, Paper, SvgIcon, Typography} from "@mui/material";
import CheckIcon from "@untitled-ui/icons-react/build/esm/Check";
import {Link} from "@inertiajs/react";
import {Check} from "@mui/icons-material";
import {StatusPaper} from "@/Pages/OrderProcessing/Modals/StatusPaper";

export default function PaymentSuccess() {
    return (<StatusPaper icon={<Check/>} title={'Payment successful'}
                         text={'Thank you for your purchase! We are pleased to inform you that your payment has been processed\n' + '                successfully. You should receive a confirmation of your transaction shortly.'}
                         linkTitle={'Go to dashboard'} linkHref={route('dashboard')}/>);
}
