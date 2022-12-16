export const fileDtoMapping = (model) => {
    return {
        id: model._id,
        description: model.Description
    };
};
