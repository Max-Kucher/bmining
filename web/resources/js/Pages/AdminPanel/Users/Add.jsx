import * as React from 'react';
import UserCreateForm from "@/Forms/User/UserCreateForm";
import BlockWrapper from "@/Components/Wrappers/BlockWrapper";
import {Seo} from "@/Components/Wrappers/Seo";
import {TitleNav} from "@/Components/TitleNav";

export default function Add({}) {
    return (
        <>

            <Seo title="User edit"/>
            <TitleNav title={'Back'} />
            <BlockWrapper>
                <UserCreateForm/>
            </BlockWrapper>
        </>);
}
