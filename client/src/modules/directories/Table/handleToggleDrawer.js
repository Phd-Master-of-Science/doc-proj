export const handleToggleDrawer = (setState, state) => {
  return (anchor, open) => (event) => {
    if (event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
};
