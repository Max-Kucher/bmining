import UsersList from "@/Components/UsersList";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {Head} from "@inertiajs/react";
import {PageHeader} from "@/Components/PageHeader";
import KycList from "@/Components/KycList";


export default function KYC({auth, settings, settingsMetadata, status}) {

    return (<>
        <Head title="Users"/>

        <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                <KycList/>
            </div>
        </div>
    </>);
}
