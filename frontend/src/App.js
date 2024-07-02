import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FromPage from "./pages/FromPage";
import TablePage from "./pages/TablePage";
import Sidebar from "./components/Sidebar";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getTables } from "./features/table/tableSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTables());
  }, [dispatch]);

  return (
    <Router>
      <div className="flex min-h-screen h-full">
        <Sidebar />
        <Routes>
          <Route path="/" element={<FromPage />} />
          <Route path="/table/:id" element={<TablePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
