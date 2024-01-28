import UsersList from "@/Components/UsersList";
import {TitleNav} from "@/Components/TitleNav";


export default function Users({auth, settings, settingsMetadata, status}) {

    return (<>
        <TitleNav title={'Users'}/>
        <UsersList/>
    </>);
}
