import styled from "styled-components"

export const css = () => {
    return styled.div`
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap');
    
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Montserrat', sans-serif;
    }
    
    body{
        background-color: #000000;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        height: 100vh;
    }
    
    .container{
        background-color: #000;
        border-radius: 30px;
        box-shadow: 0 5px 15px rgba(255, 255, 255, 0.35);
        position: relative;
        overflow: hidden;
        width: 768px;
        max-width: 100%;
        min-height: 480px;
    }
    
    .container p{
        font-size: 14px;
        line-height: 20px;
        letter-spacing: 0.3px;
        margin: 20px 0;
    }
    
    .container span{
        font-size: 12px;
    }
    
    .container a{
        color: #d6d6d6;
        font-size: 13px;
        text-decoration: none;
        margin: 15px 0 10px;
    }
    
    .container button{
        background-color: #db1a1a;
        color: #ffffff;
        font-size: 12px;
        padding: 10px 45px;
        border: 1px solid transparent;
        border-radius: 8px;
        font-weight: 600;
        letter-spacing: 0.5px;
        text-transform: uppercase;
        margin-top: 10px;
        cursor: pointer;
    }
    
    .container button.hidden{
        background-color: transparent;
        border-color: #ffffff;
    }
    
    .container form{
        background-color: #000;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        padding: 0 40px;
        height: 100%;
        color: white;
    }
    
    .container input{
        background-color: #2c2c2c;
        border: none;
        margin: 8px 0;
        padding: 10px 15px;
        font-size: 13px;
        border-radius: 8px;
        width: 100%;
        outline: none;
        color: white;
    }
    
    .form-container{
        position: absolute;
        top: 0;
        height: 100%;
        transition: all 0.6s ease-in-out;
    }
    
    .sign-in{
        left: 0;
        width: 50%;
        z-index: 2;
    }
    
    .container.active .sign-in{
        transform: translateX(100%);
    }
    
    .sign-up{
        left: 0;
        width: 50%;
        opacity: 0;
        z-index: 1;
    }
    
    .container.active .sign-up{
        transform: translateX(100%);
        opacity: 1;
        z-index: 5;
        animation: move 0.6s;
    }
    
    @keyframes move{
        0%, 49.99%{
            opacity: 0;
            z-index: 1;
        }
        50%, 100%{
            opacity: 1;
            z-index: 5;
        }
    }
    
    .social-icons{
        margin: 20px 0;
    }
    
    .social-icons a{
        border: 1px solid #3a3a3a;
        border-radius: 20%;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        margin: 0 3px;
        width: 40px;
        height: 40px;
    }
    
    .toggle-container{
        position: absolute;
        top: 0;
        left: 50%;
        width: 50%;
        height: 100%;
        overflow: hidden;
        transition: all 0.6s ease-in-out;
        border-radius: 150px 0 0 100px;
        z-index: 1000;
    }
    
    .container.active .toggle-container{
        transform: translateX(-100%);
        border-radius: 0 150px 100px 0;
    }
    
    .toggle{
        background-color: rgb(168, 45, 45);
        height: 100%;
        background: linear-gradient(to right, #f52222, #970000);
        color: #ffffff;
        position: relative;
        left: -100%;
        height: 100%;
        width: 200%;
        transform: translateX(0);
        transition: all 0.6s ease-in-out;
    }
    
    .container.active .toggle{
        transform: translateX(50%);
    }
    
    .toggle-panel{
        position: absolute;
        width: 50%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        padding: 0 30px;
        text-align: center;
        top: 0;
        transform: translateX(0);
        transition: all 0.6s ease-in-out;
    }
    
    .toggle-left{
        transform: translateX(-200%);
    }
    
    .container.active .toggle-left{
        transform: translateX(0);
    }
    
    .toggle-right{
        right: 0;
        transform: translateX(0);
    }
    
    .container.active .toggle-right{
        transform: translateX(200%);
    }
    
    .ti{
        color: white;
        text-align: center;
        margin-bottom: 25px;
    }
    
    #msg{
        display: none;
        color: #db1a1a;
        font-size: 12px;
        padding: 10px 45px;
        border: 1px solid ;
        border-radius: 8px;
        font-weight: 600;
        letter-spacing: 0.5px;
        text-transform: uppercase;
        margin-top: 10px;
        cursor: not-allowed;
    }
    
    #email {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        flex-direction: row;
        z-index: 99999999;
        background-color: black;
        border: 1px solid #db1a1a;
        border-radius: 20px;
        box-shadow: 0 5px 15px #db1a1a;
        text-align: center;
        border: 1px solid ;
        display: none;
    }
    
    #emailc{
        background-color: black;
        border-radius: 20px;
        width: 100%;
        height: 100%;
        padding-top: 25px;
        padding-bottom: 25px;
    }
    
    #emailc input[type="submit"]{
        cursor: pointer;
        background-color: #db1a1a;
    }
    
    #email p {
        position: absolute;
        top: 0%;
        left: 90%;
        color: white;
        cursor: pointer;
    }
    
    input:hover::-webkit-inner-spin-button{
        -webkit-appearance: none;
    
    }
    
    input:focus::-webkit-inner-spin-button{
        -webkit-appearance: none;
    }
    
    input:focus {
        outline: none;
    }
    
    @media screen and (max-width: 768px) {
        .container {
            width: 400px;
            border-radius: 20px;
        }
    }
    
    /* Responsividade para smartphones */
    @media screen and (max-width: 480px) {
        .container {
            min-height: 360px;
            width: 300px;
            padding: 20px;
        }
    }
    
    `
}