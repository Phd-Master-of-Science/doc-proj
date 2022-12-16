export const directoryFilter = (action, userId) => {
  return {
    UserId: userId,
    Category: action,
  };
};
