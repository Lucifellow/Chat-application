import React from 'react';
import online from '../icons/online.png';
import "./TextContainer.css"

const TextContainer = ({users})=>(
    <div className="textContainer">
        {
            users?(
                <div>
                    <h1>Online in Room:</h1>
                <div className="activeContainer">
                    <h2>
                        {users.map(({name})=>(
                            <div key={name} className="activeItem">
                                <img src={online} alt="Online" />
                                {' '}
                                {name}
                            </div>
                        ))}
                    </h2>
                </div>
                </div>

            ):null
        }
    </div>
);

export default TextContainer;
