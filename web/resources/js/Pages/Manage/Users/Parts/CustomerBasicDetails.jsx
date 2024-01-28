import PropTypes from 'prop-types';
import {Button, Card, CardActions, CardHeader} from '@mui/material';
import {PropertyList} from '@/components/property-list';
import {PropertyListItem} from '@/components/property-list-item';
import AutocompleteInputAdd from "@/Components/Inputs/AutocompleteInputAdd";
import {useForm} from "@inertiajs/react";
import {useEffect, useState} from "react";
import toast from "react-hot-toast";
import {useSelector} from "react-redux";
import {selectToken} from "@/slices/userSlice";
import apiRequest from "@/api/helper";

export const CustomerBasicDetails = ({customer, ...props}) => {
    const token = useSelector(selectToken);
    const mapStatuses = (items) => {
        return items.map((item) => {
            return {
                title: item
            };
        });
    };


    const [data, setData] = useState({
        status: customer.status
    });
    const [errors, setErrors] = useState({});
    const [recentlySuccessful, setRecentlySuccessful] = useState(false);

    const onStatusChange = (val) => {
        if (typeof val === 'string') {
            setData({
                ...data, status: val,
            });
        } else {
            setData({
                ...data, status: val.inputValue,
            });

        }
    };
    const submit = (e) => {
        e.preventDefault();
        apiRequest(token).post(route('api.manage.users.update-status', {id: customer.id}), {
            status: data.status,
        })
            .then((response) => {
                if (response.status == 200) {
                    setRecentlySuccessful(true);
                    setTimeout(() => {
                        setRecentlySuccessful(false);
                    }, 4000);
                    return;
                }
                if (response) {
                    if (response.status == 422 && e.response?.data?.errors) {
                        let errors = {};
                        for (let errKey in e.response.data.errors) {
                            errors[errKey] = e.response.data.errors[errKey][0];
                        }
                        setErrors(errors);
                    }
                } else {
                    toast.error('Error occurted during change status.');
                    return;
                }

            });
    };


    useEffect(() => {
        if (recentlySuccessful === true) {
            toast.success('User status changed');
        }
    }, [recentlySuccessful]);

    return (
        <Card {...props}>
            <CardHeader title="Basic Details"/>
            <PropertyList>
                <PropertyListItem
                    divider
                    label="First name"
                    value={customer.name}
                />
                <PropertyListItem
                    divider
                    label="Last name"
                    value={customer.surname ?? 'undefined'}
                />
                <PropertyListItem
                    divider
                    label="Email"
                    value={customer.email ?? 'undefined'}
                />
                <PropertyListItem
                    divider
                    label="Phone"
                    value={customer.phone}
                />
                <PropertyListItem
                    divider
                    label="Country"
                    value={customer.geo ?? 'undefined'}
                />
                <PropertyListItem
                    divider
                    label="User status"
                    value={<>
                        <form onSubmit={submit}>
                            <div style={{
                                display: 'flex',
                                flexFlow: 'column nowrap',
                                paddingBottom: '1.25rem'
                            }}>
                                <div style={{
                                    marginBottom: '0.625rem',
                                    display: 'flex',
                                    flexFlow: 'column nowrap',

                                }}>
                                    <AutocompleteInputAdd
                                        options={mapStatuses(customer.statuses)}
                                        value={data.status}
                                        setValue={onStatusChange} name={'status'}/>
                                    <div>
                                        {errors.status ? errors.status : ''}
                                    </div>
                                </div>
                                <div>
                                    <Button type={'submit'} variant={'contained'}>Update</Button>
                                </div>
                            </div>
                        </form>
                    </>}
                />
            </PropertyList>
            {/*<CardActions>*/}
            {/*    <Button*/}
            {/*        color="inherit"*/}
            {/*        size="small"*/}
            {/*    >*/}
            {/*        Reset Password11*/}
            {/*    </Button>*/}
            {/*</CardActions>*/}
        </Card>
    );
};

CustomerBasicDetails.propTypes = {
    address1: PropTypes.string,
    address2: PropTypes.string,
    country: PropTypes.string,
    email: PropTypes.string,
    isVerified: PropTypes.bool,
    phone: PropTypes.string,
    state: PropTypes.string
};
