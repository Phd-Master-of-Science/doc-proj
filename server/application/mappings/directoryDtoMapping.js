export const directoryDtoMapping = (model) => {
    return {
        id: model.DocumentId,
        category: model.Category,
        title: model.Title,
        editor: model.FirstEditor,
        publisher: model.Publisher,
        lastUpdateDate: new Date(model.LastUpdate).toLocaleString(),
    };
};
