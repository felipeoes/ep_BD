
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback, useState } from "react";
import "./solicitarProduto.css";

import DatePicker, { registerLocale } from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/pt-BR';

import { Container, CNPJContainer } from "./styles";

function SolicitarProduto() {

    const [cnpj, setCnpj] = useState("");
    const [codigoBarras, setCodigoBarras] = useState("");
    const [dataValidade, setDataValidade] = useState("");
    const [quantidade, setQuantidade] = useState("");

    registerLocale('es', es);

    const handlePesquisaCNPJ = useCallback((event) => {
        event.preventDefault();
        //pesquisa cnpj
        console.log('cnpj');
    }, []);

    const handlePesquisaCodBarras = useCallback((event) => {
        event.preventDefault();
        //pesquisa cod barras
        console.log('cod barras');
    }, []);

    const handlePedidoFornecedor = useCallback((event) => {
        event.preventDefault();
        const obg = {
            cnpj,
            codigoBarras,
            dataValidade,
            quantidade
        }
        console.log(obg);
    }, [cnpj, codigoBarras, dataValidade, quantidade]);

    return (
        <div className="solicitarProduto">
            <CNPJContainer onSubmit={handlePesquisaCNPJ}>
                <h2>Solicitação de produto ao Fornecedor</h2>
                <div>
                    <input
                        type="text"
                        placeholder="Digite o número do CNPJ do fornecedor"
                        value={cnpj}
                        onChange={(event) => setCnpj(event.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Nome Fornecedor"
                        value={cnpj}
                        readOnly
                    />
                    <button type="submit">Pesquisar</button>
                </div>
            </CNPJContainer>
            <CNPJContainer onSubmit={handlePesquisaCodBarras}>
                <div>
                    <input
                        type="text"
                        placeholder="Digite o número do Código de barras do produto"
                        value={codigoBarras}
                        onChange={(event) => setCodigoBarras(event.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Nome Produto"
                        value={codigoBarras}
                        readOnly
                    />
                    <button type="submit">Pesquisar</button>
                </div>
            </CNPJContainer>

            <Container onSubmit={handlePedidoFornecedor}>

                <input
                    type="number"
                    placeholder="Quantidade solicitada"
                    value={quantidade}
                    onChange={(event) => setQuantidade(event.target.value)}
                />
                <DatePicker
                    locale='es'
                    selected={dataValidade}
                    onChange={(date) => setDataValidade(date)}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Selecione a data de validade esperada"
                />
                <button type="submit">Enviar Pedido</button>
            </Container>
        </div>
    );
}

export default SolicitarProduto;
