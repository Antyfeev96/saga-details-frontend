import React from 'react';
import styled from 'styled-components';

const StyledError = styled.div`
    height: 100px; 
    padding: 15px;
    margin: 0 auto;
    text-align: center;
    background-color: red;
    color: white;
`;

const StyledButton = styled.button`
    margin-top: 15px;
    width: 20%;
    min-width: 75px;
    height: 30px;
    padding: 5px;
    cursor: pointer;
`

const Error = ({ handleRepeat }) => {
    return (
        <StyledError>
            Произошла ошибка! <br/>
            Проверьте соединение и обновите страницу <br/>
            <StyledButton onClick={async () => await handleRepeat()}>Обновить</StyledButton>
        </StyledError>
    );
};

export default Error;