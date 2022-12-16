export const documentFilter = (action, userId) => {
    return {
        Versions: {
            $elemMatch: {
                Current: true,
                Action: action,
                Editors: {
                    $elemMatch: { "User._id": userId },
                },
            },
        },
    };
};
