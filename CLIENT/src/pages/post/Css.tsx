import styled from 'styled-components';

const Body = styled.div`
* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    transition: all 0.5s;
}

body { 
    height: 100vh;
    display: flex;
    justify-content: center;
    overflow: hidden;
    background-color: black;
    color: white;
    height: 100vh;
    align-items: center;
}

#content {
    border: 1px solid rgb(72, 72, 72);
    width: 400px;
    height: 80%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    flex-direction: column;
}

form {
    display: flex;
    flex-direction: column;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    overflow: hidden;
}

#picture {
    width: 200px;
    height: 200px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px dashed rgb(73, 73, 73);
    position: relative;
    border-radius: 2px; 
}

#picture:hover{
    border: 1px dashed rgb(103, 0, 0);
}

#preview{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 0;
}

#file {
    display: none;
}

#file-label {
    position: absolute;
    width: 100%;
    height: 100%;
    cursor: pointer;
}

#file-label img {
    max-width: 100%;
    max-height: 100%;
    object-fit: cover;
}

textarea{
    background-color: black;
    color: white;
    padding: 5px;
    border-radius: 5px;
}

textarea::placeholder{
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
}

textarea:focus {
    outline: none;
    border: 1px solid red;
}

textarea:hover {
    border: 1px solid red;
}

input[type = "submit"]{
    color: white;
    background-color: black;
    border: 1px solid red;
    padding: 10px;
    border-radius: 10px;
    cursor: pointer;
    margin-bottom: 20px;
}

input[type = "submit"]:hover{
    background-color: white;
    color: red;
}

nav{
    position: relative;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    margin-top: 10px;
}
  
  nav a{
    color: gray;
    text-decoration: none;
    margin: 10px;
  }
`;

export default Body;