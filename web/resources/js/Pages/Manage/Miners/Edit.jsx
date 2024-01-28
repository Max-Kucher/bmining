import AddMinerForm from "@/Forms/AddMinerForm";
import {Box, Container, Stack, SvgIcon, Typography} from "@mui/material";
import BlockWrapper from "@/Components/Wrappers/BlockWrapper";
import {Seo} from "@/Components/Wrappers/Seo";
import {TitleNav} from "@/Components/TitleNav";
import {useParams} from "react-router";
import {useSelector} from "react-redux";
import {selectToken} from "@/slices/userSlice";
import apiRequest from "@/api/helper";
import {toast} from "react-toastify";
import {useEffect, useState} from "react";

export default function Edit({}) {
    const {minerId} = useParams();
    const [miner, setMiner] = useState({});
    const [tariffs, setTariffs] = useState([]);
    const [user, setUser] = useState({});
    const token = useSelector(selectToken);
    useEffect(() => {
        apiRequest(token).get('/api/manage/miners/' + minerId).then((response) => {
            if (response.status == 200) {
                setMiner(response.data.miner);
                setUser(response.data.user);
                setTariffs(response.data.tariffs);
            } else {
                toast.error('Request error');
            }
        });
    }, []);

    const getBackToUserLink = () => {
        return `/manage/users/${user.id}`;
    };

    useEffect(() => {

    }, []);

    return (<>
        <Container maxWidth={'xl'}>
            <TitleNav href={getBackToUserLink()} title={'Edit miner'}
                      linkTitle={'Back to customer'}/>
        </Container>
        <BlockWrapper>
            <Seo title={'Edit miner'}/>

            <Typography py={3}>
                Edit <b>{user.email}</b> miner
            </Typography>
            <AddMinerForm editMode={true} user={user} tariffs={tariffs} miner={miner}/>
        </BlockWrapper>
    </>);
}
