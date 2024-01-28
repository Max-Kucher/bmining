export function permissionCheck(perms, roles = []) {
    if (perms.length === 0) {
        return true;
    } else if (roles.length === 0) {
        return false;
    }

    for (let item of perms) {
        if (roles.includes(item)) {
            return true;
        }
    }
    return false;
}
