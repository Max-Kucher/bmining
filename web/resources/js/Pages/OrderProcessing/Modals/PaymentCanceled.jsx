import {Cancel, Check} from "@mui/icons-material";
import {StatusPaper} from "@/Pages/OrderProcessing/Modals/StatusPaper";
import {Link} from "@inertiajs/react";

export default function PaymentCanceled(props) {
    return (<StatusPaper icon={<Cancel/>} title={'Order cancel'}
                         text={'Are you sure you want to cancel the order?'}
                         {...props}
    />);
}
