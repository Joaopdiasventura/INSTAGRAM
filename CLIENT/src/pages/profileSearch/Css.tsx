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

nav {
  display: flex;
  justify-content: space-around;
}

nav a {
  color: gray;
  text-decoration: none;
}

.profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.profile h2,
.profile small {
  color: #ffffff;
  margin-bottom: 5px;
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

.profile textarea::placeholder {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.view {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  overflow-y: auto;
  padding: 10px;
  max-height: 300px;
}

.views {
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

.views img {
  width: 100%;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  object-fit: cover;
}

.views:hover {
  transform: scale(1.1);
}

#seguir {
  padding: 10px 15px;
  border: none;
  background-color: #000000;
  color: rgb(255, 0, 0);
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 200px;
}

#seguir:hover {
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
  display: none;
}

#picture,
#preview {
  width: 75px;
  height: 75px;
  border-radius: 50%;
  position: relative;
}

#preview {
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

#picture {
  margin-top: 40px;
  margin-bottom: 20px;
}

#picture:hover {
  transform: scale(1.2);
  border: none;
}

input[type="file"] {
  display: none;
}

#addFoto {
  display: flex;
  flex-direction: column;
  align-items: center;
}

form {
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

.posts {
      max-height: 500px;
      overflow-y: auto;
      border-radius: 10px;
      .post {
        background-color: #000000;
        border: 1px solid #252525;
        border-radius: 20px;
        padding: 10px;
        margin-bottom: 20px;
        position: relative;
        color: white;
        height: 350px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
      }

      .profile {
        display: flex;
        align-items: center;
        height: 50px;
        cursor: pointer;
        width: 100%;
      }

      .profileImage {
        width: 35px;
        height: 35px;
        border-radius: 50%;
        margin-right: 10px;
      }

      .postImage {
        text-align: center;
        height: 200px;
        width: 200px;
        object-fit: cover;
        border-radius: 5px;
      }

      .postImage:hover {
        box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
      }

      .texts{
        width: 100%;
      }

      .like{
        background: none;
        color: white;
        border: none;
        cursor: pointer;
        margin: 3px;
      }
    }

#close {
  position: absolute;
  top: 5%;
  left: 80%;
  cursor: pointer;
}
`;

export default Body;