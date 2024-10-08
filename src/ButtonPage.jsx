import React, { useState } from 'react';

const ButtonPage = () => {
    const [text, setText] = useState('Нажми на кнопку');

    const handleButton1Click = () => {
        setText('Ты нажал на первую кнопку!');
    };

    const handleButton2Click = () => {
        setText('Ты нажал на вторую кнопку!');
    };

    const handleButton3Click = () => {
        setText('Ты нажал на третью кнопку!');
    };

    return (
        <div>
            <h1>{text}</h1>
            <button onClick={handleButton1Click}>Кнопка 1</button>
            <button onClick={handleButton2Click}>Кнопка 2</button>
            <button onClick={handleButton3Click}>Кнопка 3</button>
        </div>
    );
};

export default ButtonPage;