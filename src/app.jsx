import React from 'react';

///////////
///////////

function App() {
    return (
        <div>
            <h1>Select an object to begin...</h1>
            {/* <p>This is a simple React application.</p> */}
            <button
                onClick = {() => parent.postMessage("filter-to-interactions", "*")}
            >
                Filter to interactions
            </button>
        </div>
    );
}



export default App;