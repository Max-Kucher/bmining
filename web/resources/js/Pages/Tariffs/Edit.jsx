import * as React from 'react';
import TariffEditForm from "@/Forms/TariffEditForm";
import BlockWrapper from "@/Components/Wrappers/BlockWrapper";
import {Seo} from "@/Components/Wrappers/Seo";
import {TitleNav} from "@/Components/TitleNav";
import {useEffect, useState} from "react";
import apiRequest from "@/api/helper";
import {useSelector} from "react-redux";
import {selectToken} from "@/slices/userSlice";
import {useParams} from "react-router";

export default function Edit() {
    const [data, setData] = useState({});
    const token = useSelector(selectToken);
    const {tariffId} = useParams();
    useEffect(() => {
        apiRequest(token).get('/api/tariffs/' + tariffId).then((response) => {
            setData(response.data);
        });
    }, []);


    return (<>
        <Seo title={'Edit mining plan'}/>
        <TitleNav title={'Edit mining plan'} linkTitle={'Back to tariffs'} href={'/admin/tariffs'}/>
        <BlockWrapper>
            <TariffEditForm tariff={data}/>
        </BlockWrapper>
    </>);
}
