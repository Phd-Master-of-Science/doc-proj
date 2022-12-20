export const seedDtoMapping = (model) => {
    return {
        id: model._id,
        action: model.Action,
        rows: model.Rows,
        duration: model.Duration
    };
};
