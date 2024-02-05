import styled from "styled-components";

const Body = styled.div`
  width: 300px;
  margin: 0 auto;
  padding: 20px;

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
      overflow-x: hidden;
      .post {
        background-color: #000000;
        border: 1px solid #252525;
        border-radius: 10px;
        padding: 10px;
        margin-bottom: 10px;
        position: relative;

        h3 {
          color: #b9b9b9;
          margin-bottom: 5px;
          word-wrap: break-word;
        }

        p {
          color: #666;
          margin-bottom: 10px;
          margin-top: 5px;
          word-wrap: break-word;
        }

        small {
          color: #999;
          display: block;
          margin-bottom: 5px;
          word-wrap: break-word;
        }

        button {
          background-color: #000000;
          border: none;
          cursor: pointer;
          font-size: 16px;
          margin-top: 5px;
          color: #ffffff;
        }

        .delete {
          position: absolute;
          top: 10px;
          right: 10px;
          background-color: #000000;
          border: none;
          cursor: pointer;
          font-size: 16px;
          color: #ffffff;
        }
      }
    }
  }
  ::-webkit-scrollbar {
    width: 1px;
    margin-left: 2px;
  }

  ::-webkit-scrollbar-track {
    background: #0f0f0f;
  }

  ::-webkit-scrollbar-thumb {
    background: white;
    border-radius: 100px;
  }
`;

export default Body;