import styled from 'styled-components';

export const Container = styled.form`
    margin: auto;
    width: 60%;

    h2{
        /* color: var(--text-title); */
        font-size: 1.5rem;
        text-align: center;
    }

    input, select{
        width: 100%;
        padding: 0 0.25rem;
        height: 2.2rem;
        border-radius: 0.25rem;

        border: 1px solid #d7d7d7;
        background: #e7e9ee;

        font-weight: 400;
        font-size: 1rem;
        margin-top: 1rem;

        &::placeholder{
            color: var(--text-body);
        }
    }

    select{
        color: var(--text-body);
    }

    input[type='radio']{
        height: 1rem;
    }

    button[type='submit'], button[type='button']{
        width: 100%;
        padding: 0 1.5rem;
        height: 2.5rem;
        background: #2c3e4e;
        color: #fff;
        border-radius: 0.25rem;
        border: 0;
        font-size: 1rem;
        margin-top: 1.5rem;
    
        transition: filter 0.2s;
    
        &:hover{
            filter: brightness(0.9);
        }
    }
`;

export const GenderContainer = styled.div`
    margin: 1rem 0;
    display: flex;
    justify-content: space-around;
`;

export const GenderContainerType = styled.div`
    display: flex;
    flex-direction: row;
    align-items: baseline;
    justify-content: center;

    input[type='radio']{
        height: 1rem;
        width: 1rem;
    }

`;

export const CodBarrasContainer = styled.form`
    margin: auto;
    width: 60%;
    text-align: center;
    
    h2{
        /* color: var(--text-title); */
        font-size: 1.5rem;
        text-align: center;
    }

    input, select{
        width: 30%;
        margin-right: 50px;

        padding: 0 0.25rem;
        height: 2.2rem;
        border-radius: 0.25rem;

        border: 1px solid #d7d7d7;
        background: #e7e9ee;

        font-weight: 400;
        font-size: 1rem;
        margin-top: 1rem;

        &::placeholder{
            color: var(--text-body);
        }
    
    }

    button[type='submit']{
        padding: 0 1.5rem;
        height: 2.5rem;
        background: #2c3e4e;
        color: #fff;
        border-radius: 0.25rem;
        border: 0;
        font-size: 1rem;
        margin-top: 1.5rem;
        width: 30%;
    
        transition: filter 0.2s;
    
        &:hover{
            filter: brightness(0.9);
        }
    }
`;