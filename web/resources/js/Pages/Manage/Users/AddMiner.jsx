import PageWrapper from "@/Components/Wrappers/PageWrapper";
import {
    Button, Typography, Container
} from "@mui/material";
import BlockWrapper from "@/Components/Wrappers/BlockWrapper";
import {Seo} from "@/Components/Wrappers/Seo";
import AddMinerForm from "@/Forms/AddMinerForm";
import {TitleNav} from "@/Components/TitleNav";
import {useSelector} from "react-redux";
import {selectToken} from "@/slices/userSlice";
import {useEffect, useState} from "react";
import apiRequest from "@/api/helper";
import {toast} from "react-toastify";
import {useParams} from "react-router";

export default function AddMiner({}) {

    const {userId} = useParams();
    const [user, setUser] = useState({});
    const [tariffs, setTariffs] = useState([]);

    const token = useSelector(selectToken);
    useEffect(() => {
        apiRequest(token).get('/api/manage/users/' + userId).then((response) => {
            if (response.status == 200) {
                setUser(response.data.user);
            } else {
                toast.error('Request error');
            }
        });
        apiRequest(token).get('/api/tariffs/').then((response) => {
            if (response.status == 200) {
                console.log(tariffs);
                setTariffs(response.data);
            } else {
                toast.error('Request error');
            }
        });

    }, []);

    return <>
        <>
            <Seo title={'Add miner to user'}/>
            <Container maxWidth={'xl'}>
                <TitleNav href={route('manage.users.show', {id: user.id})} title={'Add miner'}
                          linkTitle={'Back to customer'}/>
            </Container>
            <BlockWrapper>

                <Typography py={3}>
                    Add new miner to <b>{user.email}</b>
                </Typography>
                <AddMinerForm user={user} tariffs={tariffs}/>
            </BlockWrapper>
        </>

    </>
}
