export const documentDtoMapping = (model) => {
  return {
    id: model._id,
    action: model.Versions.find((v) => v.Current === true).Action,
    title: model.Versions.find((v) => v.Current === true).Title,
    editor: model.Versions.find((v) => v.Current == true).Editors[0].User.Name,
    publisher: model.Versions.find((v) => v.Current == true).Editors[0].User
      .Email,
    lastUpdateDate: new Date(
      model.Versions.find((v) => v.Current == true).LastUpdate.Date
    ).toLocaleString(),
    lastUpdateUser: model.Versions.find((v) => v.Current == true).LastUpdate
      .User.Name,
  };
};

export const documentByIdDtoMapping = (model) => {
  return {
    id: model._id,
    completedDate: new Date(model.CompletedDate).toLocaleString(),
    createdDate: new Date(model.CreatedDate).toLocaleString(),
    files: model.Files.map((f) => fileMapping(f)),
    sn: model.SN,
    versions: model.Versions.map((v) => versionMapping(v)),
  };
};

const fileMapping = (model) => {
  return {
    id: model._id,
    description: model.Description,
  };
};

const versionMapping = (model) => {
  return {
    action: model.Action,
    createdDate: new Date(model.CreatedDate).toLocaleString(),
    current: model.Current,
    editors: model.Editors.map((e) => editorMapping(e)),
    lastUpdate: {
      date: new Date(model.LastUpdate.Date).toLocaleString(),
      user: {
        id: model.LastUpdate.User._id,
        name: model.LastUpdate.User.Name,
      },
    },
    recipients: model.Recipients.map((r) => recipientMapping(r)),
    title: model.Title,
  };
};

const editorMapping = (model) => {
  return {
    readDate: new Date(model.ReadDate).toLocaleString(),
    user: {
      id: model.User._id,
      email: model.User.Email,
      name: model.User.Name,
    },
  };
};

const recipientMapping = (model) => {
  return {
    sendDate: new Date(model.SendDate).toLocaleString(),
    user: {
      id: model.User._id,
      email: model.User.Email,
      name: model.User.Name,
    },
  };
};
