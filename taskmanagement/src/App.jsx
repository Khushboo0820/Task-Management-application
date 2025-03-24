import React from "react";
import Auth from "./components/auth";

function App() {
  return (
    <div className="App">
      <h1>TaskBuddy</h1>
      <p>Streamline your workflow and track progress effortlessly
        with our all-in-one task management app.
      </p>
      <Auth />
    </div>
  );
}

export default App;
