import * as React from 'react';
import TariffCreateForm from "@/Forms/TariffCreateForm";
import BlockWrapper from "@/Components/Wrappers/BlockWrapper";
import {Seo} from "@/Components/Wrappers/Seo";
import {TitleNav} from "@/Components/TitleNav";

export default function Add({}) {
    return (<>
        <Seo title={'Add mining plan'}/>
        <TitleNav title={'Create new mining plan'} linkTitle={'Back to mining plans'} href={'/admin/tariffs'}/>
        <BlockWrapper>
            <TariffCreateForm tariff={{}}/>
        </BlockWrapper>
    </>);
}
