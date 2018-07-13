import styled from 'styled-components'

export const StyledApp = styled.div`
    position: absolute;
    height: 100%;
    width: 100%;
    background-color: #ff999a;
    overflow-y:scroll;
`;

export const Center = styled.div`
display: flex;
justify-content: center;
`;



export const Logo = styled.div`
    padding-left: 4em;
    padding-top: 1.5em;
    width: 150px;
`;

export const Wrapper = styled.header`
    padding: 2em 4em;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    @media (max-width: 800px) {
        flex-direction: column;
      }
`;

export const StyledSection = styled.section`
    flex : ${props=>props.width};
    min-width: 300px;
`;

export const Pizza = styled.div`
    margin: auto;
      display: block;
    height: 100%;
    position: relative;
    text-align: center;
    width : ${props=> {
    switch (props.base) {
    case '20cm':
      return '60%'
    case '25cm':
      return '65%'  
    case '30cm':
      return '70%'     
    default:
      return '75%'
    }     
  }};

  @media (max-width: 800px) {
    display: none;
  }
`;

export const Price = styled.span`
    font-size: 11px;
`;

export const Order = styled.div`
    padding: 20px 15px;
    background-color: white;
    border: 1px solid #c5c5c5;

    @media (max-width: 1040px) {
        margin-top: 50px;
      }
`;

export const Total = styled.h3`
    font-size: 20px;
    padding-top: 25px;
`;

export const StyledForm = styled.form`
    padding: 1em 0em;
    border-bottom: dotted 2px hsla(0, 95%, 35%, 1);
`;

export const Button = styled.button`
    border: none;
    padding: 0.35em 1.4em;
    margin: 10px 0px;
    margin-right: 10px;
    background-color: #fef28f;
    color: #333;
    cursor: pointer; 
    font-size: 18px;  
`;

export const ButtonB = styled.button`
    border: none;
    padding:  0px 5px;
    margin: 10px 0px;
    margin-right: 10px;
    background-color: #662485;
    color: white;
    cursor: pointer; 
    font-size: 14px;  
`;


export const Input = styled.input`
    margin: 5px;
    padding: 5px;
`;

export const Label = styled.label`
    margin-right: 5px;
     cursor: pointer;
`;

export const Img = styled.img`
    width: 100%;
    position: relative;
`;

export const H3 = styled.h3`
    font-size: 1.8em;
    padding-bottom: 10px;
`;

export const H4 = styled.h3`
    font-size: 20px;
    padding: 10px 0px;
`;

export const StyledList = styled.ul`
    border-bottom: dotted 2px hsla(0, 95%, 35%, 1);
    padding-bottom: 15px;
`;

export const ListItem = styled.li`
    margin-bottom: 7px;
`;

export const Span = styled.span`
    margin-right: 10px;
`;



