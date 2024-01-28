import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {PageHeader} from "@/Components/PageHeader";
import {Head} from "@inertiajs/react";
import Container from "@/Components/Container";

export default function Overview({auth}) {
    return (<AuthenticatedLayout
        auth={auth}
        header={<PageHeader>General settings</PageHeader>}
    >
        <Head title="Admin Panel"/>

        <Container>
            Test
        </Container>
    </AuthenticatedLayout>);
}
