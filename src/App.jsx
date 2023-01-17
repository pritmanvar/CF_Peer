import React from "react";
import Nav from "./components/Nav";

function App() {
    return (
        <div className='App bg-main-bg text-main-font w-full min-h-screen'>
            <Nav selectedIteam='submissions' />
            <div className='w-4/5 ml-1/5'>hello</div>
        </div>
    );
}

export default App;
