import React from "react";
import Submissions from "./views/Submissions";
import Problems from "./views/Problems";
import "react-tooltip/dist/react-tooltip.css";

function App() {
    return (
        <div className='App bg-main-bg text-main-font w-full min-h-screen'>
            {/* <Submissions /> */}
            <Problems />
        </div>
    );
}

export default App;
