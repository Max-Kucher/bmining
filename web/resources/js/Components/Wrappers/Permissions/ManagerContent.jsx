import {useSelector} from "react-redux";
import {selectPermissions} from "@/slices/userSlice";

export function ManagerContent({children}) {
    const roles = useSelector(selectPermissions);

    return (<>
        {roles.includes('manager') || roles.includes('admin') ? children : null}
    </>);
}

export function OnlyManagerContent({children}) {
    const roles = useSelector(selectPermissions);

    return (<>
        {roles.includes('manager') ? children : null}
    </>);

}
