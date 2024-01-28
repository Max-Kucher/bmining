import {useSelector} from "react-redux";
import {selectPermissions} from "@/slices/userSlice";

export function CustomerContent({children}) {
    const roles = useSelector(selectPermissions);
    console.log(roles);
    return (<>
        {roles.length === 0 || roles.includes('customer') || roles.includes('customer') ? children : null}
    </>);
}
