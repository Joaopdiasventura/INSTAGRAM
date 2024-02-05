import { useState, useRef, FormEvent } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { css } from './Css';

const app = axios.create({
    baseURL: "https://insta-mn2w.onrender.com"
});

const Body = css();

let code:number;

function Enter() {
    const [isActive, setIsActive] = useState(false);
    const navigate = useNavigate();
    const emailLoginRef = useRef<HTMLInputElement>(null);
    const emailRegisterRef = useRef<HTMLInputElement>(null);
    const senhaLoginRef = useRef<HTMLInputElement>(null);
    const senhaRegisterRef = useRef<HTMLInputElement>(null);
    const senha2RegisterRef = useRef<HTMLInputElement>(null);
    const nameRegisterRef = useRef<HTMLInputElement>(null);
    const codeRef = useRef<HTMLInputElement>(null);
    const [showVerification, setShowVerification] = useState(false);

    const sregistrar = () => {
        setIsActive(true);
    };

    const slogar = () => {
        setIsActive(false);
    }

    const containerClasses = isActive ? "container active" : "container";

    const logar = async (event: FormEvent) => {
        event.preventDefault();
    
        const email = emailLoginRef.current?.value;
        const password = senhaLoginRef.current?.value;
    
        if (email && password) {
            try {
                const result = await app.post("/login", { email, password }).then(result => result.data);
                
                localStorage.setItem("token", result);
    
                setTimeout(() => {
                    navigate('/start');
                }, 500);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
                alert("Erro ao logar: " + error.response.data.message);
            }
        }
    };
    
    const enviarCodigo = async (event: FormEvent) => {
        event.preventDefault();
        const email = emailRegisterRef.current?.value;

        if (email) {
            try {
                const cod = await app.get(`/email/${email}`).then(result => result.data);
                code = cod;
                console.log(code);
                
                setShowVerification(true); 
            } catch (error) {
                console.error("Erro ao enviar email:", error);
            }
        }
    };

    const registrar = async (event: FormEvent) => {
        event.preventDefault();
        const codInput = parseInt(codeRef.current?.value ?? '0');
        
        if (code == codInput) {
            const name = nameRegisterRef.current?.value;
            const email = emailRegisterRef.current?.value;
            const password = senhaRegisterRef.current?.value;
            const senha2 = senha2RegisterRef.current?.value;
    
            if (name && email && password && senha2 && password === senha2) {
                try {
                    const result = await app.post("/register", { name, email, password }).then(result => result.data);
                    localStorage.setItem("token", result);
                    setTimeout(() => {
                        navigate('/start');
                    }, 500);
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                } catch (error: any) {
                    alert("Erro ao registrar: " + error.response.data.message);
                }
            } else{
                alert('As senhas precisam ser iguais!')
            }
        } else {
            alert('O código de verificação está errado! Tente novamente ou solicite outro');
        }
    }

    const fechar = () => {
        setShowVerification(false)
    }

  return (
    <Body>
        <div className={containerClasses} id="container">

        <div id="email" style={{ display: showVerification ? 'flex' : 'none' }}>
                    <p id="close" onClick={fechar}>X</p>
                    <form id="emailc" onSubmit={registrar}>
                        <h2>DIGITE O CÓDIGO DE VERIFICAÇÃO</h2> <br />
                        <input type="number" id="code" placeholder="código" ref={codeRef} required />
                        <input type="submit" value="VERIFICAR" />
                    </form>
                </div>

            <div className="form-container sign-up">
            <form id="registrar" onSubmit={enviarCodigo}>
                <h1>CRIE SUA CONTA</h1>
                <input type="text" placeholder="Nome:" id="nome" name="nome" ref={nameRegisterRef} required />
                <input type="email" placeholder="Email:" id="emailr" name="emailr" ref={emailRegisterRef} required/>
                <input type="password" placeholder="Senha:" id="senhar" name="senhar" ref={senhaRegisterRef} required/>
                <input type="password" placeholder="Repita sua senha:" id="senha2" ref={senha2RegisterRef} name="senha2" required />
                <button id="enviar">REGISTRE-SE</button>
            </form>
            </div>
            
            <div className="form-container sign-in">
                <form id="logar" onSubmit={logar}>
                    <h1>LOGIN</h1>
                    <input type="email" placeholder="Email:" ref={emailLoginRef} required />
                    <input type="password" placeholder="Senha:" ref={senhaLoginRef} required />
                    <button>LOGIN</button>
                </form>
            </div>

            <div className="toggle-container">
                <div className="toggle">
                    <div className="toggle-panel toggle-left">
                        <h1>BEM VINDO DE VOLTA</h1>
                        <button className="hidden" id="login" onClick={slogar}>LOGAR</button>
                    </div>
                    <div className="toggle-panel toggle-right">
                        <h1>BEM VINDO</h1>
                        <p>não tem uma conta?</p>
                        <button className="hidden" id="register" onClick={sregistrar}>REGISTRE-SE</button>
                    </div>
                </div>
            </div>
        </div>
    </Body>
  );
}

export default Enter;