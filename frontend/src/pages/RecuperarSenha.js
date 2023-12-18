import React, { useEffect, useRef, useState } from "react";

import Logo from "../assets/img/logo.png";
import CardInput from "../components/login/CardInput";
import BannerImagem from "../assets/img/banner.png";
import md5 from "md5";
import InputSenha from "../components/login/InputSenha";

function RecuperarSenha() {
  let criarConta = "/criarConta";
  let login = "/login";

  const [email, setEmail] = useState("");
  const [codigo, setCodigo] = useState("");
  const [mensagemLogin, setMensagemLogin] = useState(false);
  const [inputCodigo, setInputCodigo] = useState(false);
  const [inputEmail, setInputEmail] = useState(true);
  const [respostaLocalhost, setRespostaLocalhost] = useState("");
  const [novaSenha, setNovaSenha] = useState(false);
  const [novaSenhaInput, setNovaSenhaInput] = useState("");
  const [confirmarNovaSenha, setConfirmarNovaSenha] = useState("");
  const [emailEnviado, setEmailEnviado] = useState("");
  const [horarioDeExpiracao, setHorarioDeExpiracao] = useState('');
  const buttonRef = useRef(null);

  const dataAtual = new Date();
  const recuperarSenha = () => {
    setInputEmail(true);
    setInputCodigo(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataAtual = new Date();
    dataAtual.setMinutes(dataAtual.getMinutes() + 10);

    const hora = dataAtual.getHours();
    const minutos = dataAtual.getMinutes();

    const horaFormatada = hora < 10 ? `0${hora}` : hora;
    const minutosFormatados = minutos < 10 ? `0${minutos}` : minutos;

    const horario = `${horaFormatada}:${minutosFormatados}`;

    const dados = {
      email,
      horario: horario,
    };

    console.log("Dados a serem enviados:", dados);

    try {
      const response = await fetch("http://localhost:8080/recuperarSenha/", {
        method: "POST",
        body: JSON.stringify(dados),
      });

      const resposta = await response.text();
      console.log("Resposta da API:", resposta);

      if (resposta.length > 50) {
        setInputCodigo(true);
        setInputEmail(false);
        setEmailEnviado(email);
        setMensagemLogin(false);
        setHorarioDeExpiracao(horario);
        return;
      }

      setRespostaLocalhost("Email não cadastrado");
      setMensagemLogin(true);
    } catch (error) {
      console.error("Erro ao enviar os dados para a API:", error);
    }
  };

  const handleSubmitCodigo = async (e) => {
    e.preventDefault();

    let hora = dataAtual.getHours();
    let minutos = dataAtual.getMinutes();

    if (minutos === 60) {
      minutos = 0;
      hora = hora + 1;
    }

    const horaFormatada = hora < 10 ? `0${hora}` : hora;
    const minutosFormatados = minutos < 10 ? `0${minutos}` : minutos;

    const horario = `${horaFormatada}:${minutosFormatados}`;

    const dados = {
      email: emailEnviado,
      horario: horario,
      horarioDeExpiracao: horarioDeExpiracao,
      codigo,
    };

    console.log("Dados a serem enviados:", dados);

    try {
      const response = await fetch("http://localhost:8080/confirmarCodigo/", {
        method: "POST",
        body: JSON.stringify(dados),
      });

      const resposta = await response.text();
      console.log("Resposta da API:", resposta);

      if (resposta === '"Chave correta"') {
        setMensagemLogin(false);
        setNovaSenha(true);
        setInputCodigo(false);
      } else if (resposta === '"Expirou"') {
        setRespostaLocalhost("O código expirou, solicite outro");
        setMensagemLogin(true);
      } else {
        setRespostaLocalhost("Código incorreto");
        setMensagemLogin(true);
      }

    } catch (error) {
      console.error("Erro ao enviar os dados para a API:", error);
    }
  };

  const handleSubmitSenha = async (e) => {
    e.preventDefault();

    const dados = {
      email: emailEnviado,
      novaSenhaInput: md5(novaSenhaInput),
      confirmarNovaSenha: md5(confirmarNovaSenha),
    };

    console.log("Dados a serem enviados:", dados);

    try {
      const response = await fetch("http://localhost:8080/novaSenha/", {
        method: "POST",
        body: JSON.stringify(dados),
      });

      const resposta = await response.text();
      console.log("Resposta da API:", resposta);

      if (resposta !== '"Incorreto"') {
        window.location.href = "/home";
        return;
      }

      setRespostaLocalhost("Confirmação de senha está incorreta");
      setMensagemLogin(true);
    } catch (error) {
      console.error("Erro ao enviar os dados para a API:", error);
    }
  };

  useEffect(() => {
    document.title = "Recuperar Senha";

    if (codigo.length === 6 && buttonRef.current) {
      buttonRef.current.click();
    }

    if (codigo.length < 6) {
      setMensagemLogin(false);
    }
  }, [codigo]);

  return (
    <>
      <div className="login_container">
        <div className="container_content">
          <div className="content">
            <div className="header_content">
              <div className="login_header">
                <div className="login_logo">
                  <img className="login_logo" src={Logo} />
                </div>

                <div className="login_header_texto">
                  <a href={login} className="link">
                    <div className="texto_claro">Fazer Login</div>
                  </a>

                  <a href={criarConta} className="link">
                    <div className="texto_claro">Criar Conta</div>
                  </a>
                </div>
              </div>
            </div>

            <div className="recuperar_senha_content">
              <div className="recuperar_senha_card_content">
                {inputEmail && (
                  <form onSubmit={handleSubmit}>
                    <div className="recuperar_senha">
                      <div className="titulo">Recuperando Senha</div>

                      <div className="enviar_email">
                        <CardInput
                          id={"email"}
                          value={email}
                          onChange={setEmail}
                          textoInput={"E-mail"}
                          placeholder={"E-mail..."}
                        />

                        <div className="recuperar_senha_botao">
                          <button className="botao_submit" type="submit">
                            Enviar E-mail
                          </button>
                        </div>

                        {mensagemLogin && (
                          <div className="mensagem_content">
                            <div className="mensagem_erro">
                              {respostaLocalhost}
                            </div>
                          </div>
                        )}

                      </div>
                    </div>
                  </form>
                )}

                {inputCodigo && (
                  <form
                    onSubmit={handleSubmitCodigo}
                    className="enviar_email_content"
                  >
                    <div className="enviar_email">
                      <div className="titulo_codigo">
                        Verifique sua caixa principal ou de spam
                      </div>

                      <div className="card_input">
                        <div className="input">
                          <div className="texto">Código</div>
                          <input
                            className="input_text"
                            type={"text"}
                            placeholder={"XXXXXX"}
                            value={codigo}
                            onChange={(e) => {
                              const inputValue = e.target.value;
                              if (inputValue.length <= 6) {
                                setCodigo(inputValue);
                              } else {
                                setCodigo(inputValue.slice(0, 6));
                              }
                            }}
                            required
                          />
                        </div>

                      </div>

                      <div className="recuperar_senha_botao">
                        <button ref={buttonRef} className="botao_submit" type="submit">
                          Confirmar
                        </button>
                      </div>

                      <a onClick={recuperarSenha} className="mensagem_content">
                        <div className="mensagem_link">
                          Não recebeu? Envie novamente
                        </div>
                      </a>

                      {mensagemLogin && (
                        <div className="mensagem_content">
                          <div className="mensagem_erro">
                            {respostaLocalhost}
                          </div>
                        </div>
                      )}
                    </div>
                  </form>
                )}

                {novaSenha && (
                  <form onSubmit={handleSubmitSenha} className="nova_senha">
                    <InputSenha
                      value={novaSenhaInput}
                      onChange={setNovaSenhaInput}
                      texto={"Nova Senha"}
                      placeholder={"Nova Senha..."}
                    />

                    <InputSenha
                      value={confirmarNovaSenha}
                      onChange={setConfirmarNovaSenha}
                      texto={"Confirmar Nova Senha"}
                      placeholder={"Confirme..."}
                    />

                    <div className="nova_senha_botao_content">
                      <div className="recuperar_senha_botao">
                        <button className="botao_submit" type="submit">
                          Salvar
                        </button>
                      </div>
                    </div>

                    {mensagemLogin && (
                      <div className="mensagem_content">
                        <div className="mensagem_erro">{respostaLocalhost}</div>
                      </div>
                    )}
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="login_banner">
          <img className="imagem_banner" src={BannerImagem} />
        </div>
      </div>
    </>
  );
}

export default RecuperarSenha;
