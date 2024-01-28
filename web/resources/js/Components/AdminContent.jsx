import {useSelector} from "react-redux";
import {selectPermissions} from "@/slices/userSlice";

export function AdminContent({children}) {
    const roles = useSelector(selectPermissions);


    return <>{roles.includes('admin') ? children : null}</>
}
