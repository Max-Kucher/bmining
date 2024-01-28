import {useEffect, useState} from "react";
import {Box, Button, FormControlLabel, Stack, Switch, TextField} from "@mui/material";
import PageWrapper from "@/Components/Wrappers/PageWrapper";
import BlockWrapper from "@/Components/Wrappers/BlockWrapper";
import toast from "react-hot-toast";
import {useSelector} from "react-redux";
import {selectToken} from "@/slices/userSlice";
import apiRequest from "@/api/helper";
import {useForm} from "@/api/helpers/general";

export default function Settings({}) {
    const [settings, setSettings] = useState([]);
    const [settingsMetadata, setSettingsMetadata] = useState([]);
    const [settingsView, setSettingsView] = useState([]);
    const {data, setData, patch, errors, processing, recentlySuccessful} = useForm(settings);


    const token = useSelector(selectToken);

    useEffect(() => {
        apiRequest(token).get('/api/admin/settings').then((response) => {
            if (response.status == 200) {
                setSettings(response.data.settings);
                setSettingsMetadata(response.data.settingsMetadata);
            } else {
                toast.error("Cant't load settings values.");
            }
        });
    }, []);


    function findPropertyMetadataByName(name) {
        return settingsMetadata[name] ?? {};
    }

    const changeSettingByName = (name, value) => {
        let tempSettingsData = {...data};
        tempSettingsData[name] = value;
        setData(tempSettingsData);
    }


    useEffect(() => {
        let settingsTemp = [];
        for (let settingName in data) {
            if (settingName !== 'depositePercent') {
                if (settingName == 'siteMaintenance') {
                    settingsTemp.push(<Stack spacing={3} key={settingName} className='my-4'>
                        <FormControlLabel
                            control={<Switch
                                checked={data[settingName] == true ? true : false}
                                inputProps={{'aria-label': 'controlled'}}
                                onChange={e => {
                                    changeSettingByName(settingName, data[settingName] == false ? true : false)
                                }}
                            />}
                            label="Maintenance mode"
                        />
                    </Stack>);
                } else {
                    settingsTemp.push(<div key={settingName} className='my-4'>
                        <TextField
                            type='text'
                            multiline={settingName === 'seedPhrase'}
                            label={findPropertyMetadataByName(settingName).name}
                            onChange={e => {
                                changeSettingByName(settingName, e.target.value)
                            }}
                            disabled={settingName === 'walletPath'}
                            value={data[settingName]}
                            helperText={errors[settingName]}
                            error={errors[settingName]}
                        />
                    </div>);
                }
            } else {

            }
        }
        setSettingsView(settingsTemp);
    }, [data, errors, settings, settingsMetadata]);

    useEffect(() => {
        if (recentlySuccessful === true) {
            toast.success('Changes saved');
        }
    }, [recentlySuccessful]);

    useEffect(() => {
        setData(settings);
        setData(settings);
    }, [settings]);


    const submit = (e) => {
        e.preventDefault();
        patch(route('api.admin.settings.update'))
    };

    return (<>
        <BlockWrapper>

            <form onSubmit={submit} action="../AdminSettings">
                <Stack spacing={3}>
                    {settingsView}

                    <Box sx={{justifyContent: 'flex-start'}}>
                        <Button type={'submit'} variant={'contained'}>
                            Save
                        </Button>
                    </Box>
                </Stack>
                {/*<InputList defaultValues={data.depositePercent}/>*/}
            </form>
            {data.walletPath !== '' ? <div style={{
                marginTop: '1rem', marginBottom: '1rem',
            }}>
                <Button variant={'contained'} type={'button'}>
                    <a target="_blank" href={'/admin/download-wallet'}>Download current
                        wallet</a>
                </Button>
            </div> : null}

        </BlockWrapper>
    </>);
}
