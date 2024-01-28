import {useSelector} from "react-redux";
import {selectPermissions} from "@/slices/userSlice";
import {permissionCheck} from "@/utils/permissions";
import Dashboard from "@/Pages/Dashboard";
import AdminDashboard from "@/Pages/AdminDashboard";
import ManagerDashboard from "@/Pages/ManagerDashboard";

export function DashboardWrapper() {
    const permissions = useSelector(selectPermissions);
    if (permissionCheck(['admin'], permissions)) {
        return (<>
            <AdminDashboard/>
        </>);

    }
    if (permissionCheck(['manager'], permissions)) {
        return (<>
            <ManagerDashboard/>
        </>);

    }
    if (permissionCheck(['customer'], permissions)) {
        return (<>
            <Dashboard/>
        </>);
    }
}
