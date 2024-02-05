import styled from 'styled-components';

const Body = styled.div`
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  transition: all 0.3s ease-in-out;
}

body {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-color: #000000;
}

.content {
  border: 1px solid #595959;
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 400px;
  height: 650px;
  padding: 20px;
  background-color: #000000;
}

.profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.profile h2 {
  color: #ffffff;
  margin-bottom: 5px;
  text-align: center;
}

.profile small {
  color: #ffffff;
  margin-bottom: 10px;
  text-align: center;
}

.profile textarea {
  word-break: break-all;
  color: #ffffff;
  width: 80%;
  height: 25%;
  background-color: #000000;
  border: none;
}

.profile textarea::placeholder{
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.posts {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  overflow-y: auto;
  padding: 10px;    
}

.post {
  width: 100px;
  height: 100px;
  margin-bottom: 15px;
  cursor: pointer;
  border: 1px solid white;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.post img {
  width: 100%;  
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  object-fit: cover;
}

.post:hover {
  scale: 1.1;
}

button,
input[type="submit"] {
  padding: 10px 15px;
  border: none;
  background-color: #000000;
  color: rgb(255, 0, 0);
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 200px;
}

button:hover,
input[type="submit"]:hover {
  background-color: #ffffff;
}

textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 10px;
  resize: vertical;
}

::-webkit-scrollbar {
  width: 1px;
}

::-webkit-scrollbar-track {
  background: black;
}

::-webkit-scrollbar-thumb {
  background: white;
  border-radius: 100px;
}

#picture, #preview{
    width: 75px;
    height: 75px;
    border-radius: 50%;
    position: relative;
}

#preview{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    cursor: pointer;
    margin: 0;
    padding: 0;
}

#picture{
    margin-top: 40px;
    border: 1px solid white;
    margin-bottom: 20px;
}

#picture:hover{
  scale: 1.2;
  border: none;
}

input[type = "file"]{
    display: none;
}

#addFoto{
    display: flex;
    flex-direction: column;
}

form{
    text-align: center;
    text-align: center;
    margin-top: 20px; 
    display: none;
}

#addFoto {
  display: flex;
  flex-direction: column;
  align-items: center;
}

#upfoto {
  width: auto;
  margin-top: 10px; 
}

#picture {
  margin-top: 20px;
  text-align: center; 
}

#file-label {
  display: inline-block;
}

#addFoto {
  text-align: center;
  margin-top: 20px; 
  display: none;
}

nav {
  display: flex;
  justify-content: space-around;
}

nav a {
  color: gray;
  text-decoration: none;
}

.Post {
  width: 300px;
  height: auto;
  border: 1px solid white;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  background-color: #010101;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-radius: 10px;
  display: none;
}

.Picture {
  position: relative;
  width: 100px;
  height: 100px;
  border: 1px solid gray;
  background-image: url("https://insta-teste.s3.us-east-1.amazonaws.com/026547e49332d4bd4c8fc5cf392718ca-vini.jpeg");
  background-size: cover;
  background-repeat: no-repeat;
  margin: 15px;
}

.Post p {
  color: white;
  max-height: 100px;
  display: flex;
  overflow-y: auto;
  word-wrap: break-word;
  white-space: normal;
  margin: 15px;
  align-items: center;
}

.Post button {
  width: 80px;
  height: 40px;
  margin: 15px;
  background-color: #00000000;
}

.Post small {
  color: white;
}

#close {
  position: absolute;
  top: 5%;
  left: 80%;
  cursor: pointer;
}
`;

export default Body;