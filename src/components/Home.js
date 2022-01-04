import React from 'react';


function Home(props) {
    return (
        <div>
            <button onClick={()=>props.changeScreen('2Dmap')}>
                2D Map
            </button>
            <button onClick={()=>props.changeScreen('3Dmap')}>
                3D Map
            </button>
        </div>
    );
}

export default Home;