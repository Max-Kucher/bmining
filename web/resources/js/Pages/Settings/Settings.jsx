import Page from "@/Pages/dashboard/account";
import {Seo} from "@/Components/Wrappers/Seo";

export default function Settings({auth}) {
    return (<>
        <Seo title={'Settings'}/>
        <Page/>
    </>);
}
