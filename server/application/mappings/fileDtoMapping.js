export const fileDtoMapping = (model) => {
    return {
        id: model._id,
        description: model.Description,
        file: model.File,
        insertDate: model.InsertDate.toLocaleString(),
    };
};
