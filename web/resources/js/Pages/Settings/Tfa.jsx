import DisableTFA from "@/Pages/Profile/Partials/DisableTFA";
import {TFA} from "@/Tabs/Settings/TFA";
import {TitleNav} from "@/Components/TitleNav";
import BlockWrapper from "@/Components/Wrappers/BlockWrapper";
import {Box} from "@mui/material";
import {Seo} from "@/Components/Wrappers/Seo";
import {useEffect, useState} from "react";
import apiRequest from "@/api/helper";
import {useSelector} from "react-redux";
import {selectToken} from "@/slices/userSlice";

export default function Tfa() {
    const [tfaSecret, setTfaSecret] = useState('');
    const [qrTfaSecret, setQrTfaSecret] = useState('');
    const [tfaEnabled, setTfaEnabled] = useState(false);
    const token = useSelector(selectToken);
    useEffect(() => {
        apiRequest(token).get('/api/settings/tfa').then((response) => {
            if (response.status == 200) {
                setTfaEnabled(response.data.tfaEnabled);
                setQrTfaSecret(response.data.qrTfaSecret);
                setTfaSecret(response.data.tfaSecret);
            }
        });
    }, []);


    return (<>
        <Seo title={'TFA'}/>
        <TitleNav title={'Two Factor Authorization'} linkTitle={'Back to settings'} href={route('settings.edit')}/>
        <Box mx={'auto'}>
            <BlockWrapper>
                {(tfaEnabled ? <DisableTFA showDisableForm={true}></DisableTFA> :
                    <TFA secret={tfaSecret} qrString={qrTfaSecret}/>)}
            </BlockWrapper>
        </Box>
    </>);
}
