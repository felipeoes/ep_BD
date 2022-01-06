import styled from 'styled-components';

export const Container = styled.div`
    margin: auto;
    width: 75%;
    text-align: center;

    h2{
        /* color: var(--text-title); */
        font-size: 1.5rem;
        text-align: center;
    }

    div p{
        font-size: 1.2rem;
    }

    div p:first-child{
        font-weight: bold;
    }

    button[type='button']{
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

export const ProgramasContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content:space-evenly;
    flex-wrap: wrap;

    span.title {
        font-weight: bold;
    }

    p span{
        text-overflow: ellipsis;
    }

    div.prog_container{
        border: 3px dotted #817373;
        margin: 10px 0 0 2%;
        width: calc(100% * (1/4) - 10px - 1px);
    }
    
`;