import { useState } from 'react';

import IconPlus from '../../assets/img/plus.svg';

import ModalNovoProduto from './ModalNovoProduto';

function BotaoNovoImovel({ fecharModal }) {

    const [novoProduto, setNovoProduto] = useState(false);

    const abrirModal = () => {
        setNovoProduto(true);
    };

    return (
        <>
            <div className='novo_imovel'>
                <div onClick={abrirModal} className='link'>
                    <div className='botao_novo_imovel' type='button'>

                        <div className='conteudo_adicionar_imovel'>
                            <div className='botao_adicionar_content'>
                                <button type='button' className='botao_adicionar'>
                                    <img className='icon_plus' src={IconPlus} alt='icon'></img>
                                </button>
                            </div>

                            <div className='texto_novo_imovel'>Cadastrar novo imóvel</div>
                        </div>

                    </div>
                </div>
            </div>

            {novoProduto && (
                <div className='modal_editar_produto'>

                    <ModalNovoProduto
                        fecharModal={fecharModal}
                    />

                </div>
            )}
        </>
    );
}

export default BotaoNovoImovel;