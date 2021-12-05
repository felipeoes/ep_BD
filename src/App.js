import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Dashboard from "./pages/dashboard/Dashboard";
function App() {
  return (
    <div>
     <Topbar/>
     <div className="container">
      <Sidebar/>
      <Dashboard/>
     </div>
    </div>
  );
}

export default App;
