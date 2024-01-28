import {useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {SvgIcon} from '@mui/material';
import Users03Icon from '@/icons/untitled-ui/duocolor/users-03';
import {CreditScore, DashboardSharp, Groups3, ListAlt, Person4, TaskSharp} from "@mui/icons-material";
import {Settings01, Users02} from "@untitled-ui/icons-react";
import {adminRoutes} from "@/routes/main";

export const useSections = () => {
    const {t} = useTranslation();

    return useMemo(() => {
        return [{
            permissions: ['manager'], subheader: 'Navigation', items: [{
                title: 'Dashboard', path: route('manager.dashboard'), icon: (<SvgIcon fontSize="small">
                    <DashboardSharp/>
                </SvgIcon>)
            }]
        }, {
            permissions: ['admin'], subheader: 'Navigation', items: [{
                title: 'Dashboard', path: route('admin.dashboard'), icon: (<SvgIcon fontSize="small">
                    <DashboardSharp/>
                </SvgIcon>)
            },]
        }, {
            permissions: ['customer'], subheader: 'Navigation', items: [
                {
                    title: 'Dashboard', path: route('dashboard'), icon: (<SvgIcon fontSize="small">
                        <DashboardSharp/>
                    </SvgIcon>)
                },
                {
                    title: 'Withdrawal',
                    path: '/withdrawal',
                    icon: (<SvgIcon fontSize="small">
                        <CreditScore/>
                    </SvgIcon>),
                },
                {
                    title: 'Settings',
                    path: '/settings',
                    icon: (<SvgIcon fontSize="small">
                        <Settings01/>
                    </SvgIcon>),
                    // label: (
                    //     <Chip
                    //         color="primary"
                    //         label="New"
                    //         size="small"
                    //     />
                    // )
                },
            ]
        }, {
            permissions: ['manager', 'admin'], subheader: 'Manage', items: [
                {
                    title: 'My users', path: route('manage.my-users'), icon: (<SvgIcon fontSize="small">
                        <Person4/>
                    </SvgIcon>)
                },
                {
                    title: 'My tasks', path: route('manage.my-tasks'), icon: (<SvgIcon fontSize="small">
                        <TaskSharp/>
                    </SvgIcon>)
                },

            ],
        },

            {
                permissions: ['admin'], subheader: 'Admin', items: [
                    {
                        title: 'All leads', path: route('manage.users'), icon: (<SvgIcon fontSize="small">
                            <Users03Icon/>
                        </SvgIcon>)
                    },
                    {
                        title: 'Managers', path: adminRoutes.managers, icon: (<SvgIcon fontSize="small">
                            <Groups3/>
                        </SvgIcon>)
                    },
                    {
                        title: 'General settings', path: route('admin.settings.edit'), icon: (<SvgIcon fontSize="small">
                            <Settings01/>
                        </SvgIcon>)
                    },
                    {
                        title: 'Users', path: route('admin.users'), icon: (<SvgIcon fontSize="small">
                            <Users03Icon/>
                        </SvgIcon>)
                    },
                    {
                        title: 'Mining plans', path: route('admin.tariffs'), icon: (<SvgIcon fontSize="small">
                            <ListAlt/>
                        </SvgIcon>)
                    }
                ],
            },

        ];
    }, [t]);
};
