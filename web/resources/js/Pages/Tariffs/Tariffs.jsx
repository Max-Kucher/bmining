import * as React from 'react';
import TariffList from "@/Components/TariffList";
import BlockWrapper from "@/Components/Wrappers/BlockWrapper";
import {Seo} from "@/Components/Wrappers/Seo";
import {TitleNav} from "@/Components/TitleNav";
import {dashboardRoutes} from "@/routes/main";

export default function Tariffs({auth, settings, settingsMetadata, status}) {

    return (<>
        <Seo title={'Mining plans'}/>
        <TitleNav title={'Tariffs'} href={dashboardRoutes.dashboard} linkTitle={'Back'}/>
        <BlockWrapper>
            <TariffList/>
        </BlockWrapper>
    </>);
}
