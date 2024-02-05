import styled from 'styled-components';

const Body = styled.div`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    color: white;
    height: 100vh;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background-color: #1a1a1a;
    padding-top: 20px;
  }

  .content {
    border: 1px solid #595959;
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 350px;
    height: auto; 
    padding: 20px;
    background-color: #000000;
    overflow: hidden;
  }

  form {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    width: 100%; 
  }

  input[type="text"] {
    width: 100%;
    padding: 10px;
    margin-right: 10px;
    border: 1px solid #595959;
    background-color: #333; /* Change input background color */
    color: white;
  }

  input[type="text"]:focus {
    outline: none;
  }

  #buscar p {
    cursor: text;
  }

  #users {
    width: 100%; 
    position: relative;
    padding: 10px; 
    color: white;
    overflow-y: auto; 
    max-height: 300px; 
  }

  .user {
    display: flex;
    align-items: center;
    border: 1px solid white;
    margin-bottom: 10px;
    cursor: pointer;
    transition: all 0.2s;
    width: calc(100% - 20px); /* Adjust width */
    margin-left: 10px; /* Align with the input's left side */
    margin-right: 10px; /* Align with the input's right side */
  }  

  .user:hover{
    scale: 1.05;
  }

  .user img{
    width: 25px;
    height: 25px;
    margin: 10px;
    border-radius: 50%;
  }
`;

export default Body;