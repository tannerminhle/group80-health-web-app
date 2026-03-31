import React from "react"
import ReactDOM from "react-dom/client"
import Dashboard from "./pages/Dashboard"

function App() {
  return (
    <div>
      <Dashboard />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <App />
);

export default App;