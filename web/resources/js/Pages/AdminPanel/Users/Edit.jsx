import * as React from 'react';
import UserEditForm from "@/Forms/User/UserEditForm";
import {Seo} from "@/Components/Wrappers/Seo";
import {TitleNav} from "@/Components/TitleNav";
import {useEffect, useState} from "react";
import apiRequest from "@/api/helper";
import toast from "react-hot-toast";
import {useSelector} from "react-redux";
import {selectToken} from "@/slices/userSlice";
import {useParams} from "react-router";

export default function Edit({}) {
    const {userId} = useParams();
    const token = useSelector(selectToken);
    const [data, setData] = useState({});
    const [roles, setRoles] = useState([]);
    useEffect(() => {
        apiRequest(token).get('/api/users/' + userId).then((response) => {
            if (response.status == 200) {
                setData(response.data.user);
                setRoles(response.data.roles);
            } else {
                toast.error("Can't load user");
            }
        });
    }, []);

    return (<>
        <Seo title="User edit"/>
        <TitleNav title={'User edit'}/>
        <UserEditForm user={data} roles={roles}/>
    </>);
}
