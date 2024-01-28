import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, router, useForm} from '@inertiajs/react';
import * as React from 'react';
import TariffList from "@/Components/TariffList";
import {Button, TextField} from "@mui/material";
import {useEffect, useState} from "react";
import TariffEditForm from "@/Forms/TariffEditForm";
import {PageHeader} from "@/Components/PageHeader";
import UserEditForm from "@/Forms/User/UserEditForm";
import EditKycForm from "@/Forms/KYC/EditKycForm";

export default function Edit({auth, id, data, settings, settingsMetadata, status}) {
    return (<AuthenticatedLayout
        auth={auth}
        header={<PageHeader>User edit</PageHeader>}
    >
        <Head title="User edit"/>

        <div className="py-12">
            <div className="max-w-4xl mx-auto sm:px-6 lg:px-8 space-y-6">
                <EditKycForm kyc={data}/>
            </div>
        </div>
    </AuthenticatedLayout>);
}
