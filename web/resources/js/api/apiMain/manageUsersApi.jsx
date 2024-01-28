import apiRequest from "@/api/helper";

async function getUsers({token, searchState}) {
    console.log('Search state:');
    console.log(searchState);
    return await apiRequest(token).post(route('api.manage.users'), searchState);
}

async function getMyUsers({token, searchState}) {
    return await apiRequest(token).post(route('api.manage.my-users'), searchState);
}

async function getUser(token, id) {
    return await apiRequest(token).get(route('api.manage.users.show', {id: id}));
}

export const manageUserApi = {
    getUsers: getUsers,
    getMyUsers: getMyUsers,
    getUser: getUser,
};
