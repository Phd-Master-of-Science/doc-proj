import { Navigate, Route, Routes } from "react-router-dom";
import { Home } from "./modules/common/Home";
import { DirectoriesTable } from "./modules/directories/Table/DirectoriesTable";
import { DocumentsTable } from "./modules/documents/Table/DocumentsTable";
import { PreviewDocument } from "./modules/documents/View/PreviewDocument";
import { FilesTable } from "./modules/files/Table/FilesTable";
import { PreviewFile } from "./modules/files/View/PreviewFile";
import { UsersTable } from "./modules/users/Table/UsersTable";
import { PreviewUser } from "./modules/users/View/PreviewUser";

export const Routing = () => {
  return (
    <Routes>
      <Route exact path="/home" element={<Home/>}></Route>
      <Route exact path="/documents" element={<DocumentsTable/>}></Route>
      <Route exact path="/documents/:id" element={<PreviewDocument/>}></Route>
      <Route exact path="/directories" element={<DirectoriesTable />}></Route>
      <Route exact path="/users" element={<UsersTable />}></Route>
      <Route exact path="/users/:id" element={<PreviewUser />}></Route>
      <Route exact path="/files" element={<FilesTable />}></Route>
      <Route exact path="/files/:id" element={<PreviewFile />}></Route>
      <Route path='*' element={<Navigate to="/home" replace />} />
    </Routes>
  );
};
