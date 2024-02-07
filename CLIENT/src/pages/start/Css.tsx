import styled from "styled-components";

const Body = styled.div`
  width: 300px;
  margin: 0 auto;
  padding: 20px;

  *{
    transition: all 0.3s;
  }

  .content {
    background-color: #000000;
    border-radius: 3px;
    padding: 20px;
    width: 100%;
    height: 100%;
    font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
    border: 1px solid white;

    nav {
      display: flex;
      justify-content: center;
      padding: 10px 0;

      a {
        color: white;
        text-decoration: none;
        margin: 0 15px;
        font-weight: bold;

        &:hover {
          color: #ffd700;
        }
      }
    }

    h1 {
      color: #dadada;
      margin-bottom: 20px;
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
  }
  ::-webkit-scrollbar {
    display: none;
  }
`;

export default Body;
