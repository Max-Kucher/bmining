import {WithdrawalList} from "@/Components/Withdrawal/WithdrawalList";
import {useApiRequest} from "@/api/helper";
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {selectUser} from "@/slices/userSlice";
import {SeverityPill} from "@/Components/severity-pill";

export function WithdrawalsTab({targetUser}) {
    const [withdrawals, setWithdrawals] = useState([]);
    const {apiRequest, responseHandler, errors} = useApiRequest();

    const changeStateRequest = (withdrawalId, state = 'cancel') => {
        apiRequest().patch(`/api/manage/withdrawals/${withdrawalId}/state`, {
            state: state,
        }).then((response) => {
            if (response.status == 200) {
                getWithdrawals();
            } else {
                responseHandler({response});
            }
        });
    };


    const actionsHandler = (item) => {
        return <>
            <SeverityPill
                sx={{
                    cursor: 'pointer',
                    marginBottom: '1rem',
                }}
                title={'Change user withdraw to pending.'}
                onClick={() => {
                    changeStateRequest(item.id, 'pending');
                }}
            >
                Mark as pending
            </SeverityPill>
            <SeverityPill
                color={'error'}
                sx={{
                    cursor: 'pointer',
                    marginBottom: '1rem',
                }}
                title={'Cancel user withdraw.'}
                onClick={() => {
                    changeStateRequest(item.id, 'canceled');
                }}
            >
                Mark as canceled
            </SeverityPill>
            <SeverityPill
                sx={{
                    cursor: 'pointer',
                }}
                color={'success'}
                title={"After this action, the withdrawal amount will be automatically deducted from the user's balance"}
                onClick={() => {
                    changeStateRequest(item.id, 'paid');
                }}
            >
                Mark as paid
            </SeverityPill>
        </>;
    };

    const getWithdrawals = () => {
        apiRequest().post(`/api/manage/users/${targetUser.id}/withdrawals`, {
            page: 0,
        })
            .then((response) => {
                if (response.status == 200) {
                    setWithdrawals(response.data.items);
                } else {
                    responseHandler(response);
                }
            });
    };
    const userWithdrawalsRequest = () => {
    };

    useEffect(() => {
        getWithdrawals();
    }, []);

    return <>
        <WithdrawalList actionsHandler={actionsHandler} errors={errors} items={withdrawals}/>
    </>
}
