export const userDtoMapping = (model) => {
    return {
        id: model._id,
        email: model.Email,
        name: model.Name,
        company: model.Company,
        department: model.Department 
    };
};


export const userByIdDtoMapping = (model) => {
    return {
        id: model._id,
        email: model.Email,
        name: model.Name,
        company: model.Company,
        department: model.Department,
        address: model.Address,
        phoneNumber: model.PhoneNumber 
    };
};
