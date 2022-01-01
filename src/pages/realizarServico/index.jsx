/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback, useState } from "react";
import "./servicos.css";

import DatePicker, { registerLocale } from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/pt-BR';

import { Container } from "./styles";

function RealizarServico() {

    const [idServico, setIdServico] = useState("");
    const [cpfCliente, setCpfCliente] = useState("");
    const [dataServicoRealizado, setDataServicoRealizado] = useState(new Date());

    registerLocale('es', es);

    const handleCreateServicoRealizado = useCallback((event) => {
        event.preventDefault();
        const obg = {
            idServico, cpfCliente, dataServicoRealizado
        }
        console.log(obg);

    }, [idServico, cpfCliente, dataServicoRealizado]);

    return (
        <div className="servicos">
            <Container onSubmit={handleCreateServicoRealizado}>
                <h2>Cadastrar Serviço Realizado</h2>

                <input
                    type="text"
                    placeholder="Id Servico"
                    value={idServico}
                    onChange={(event) => setIdServico(event.target.value)}
                />
                <p>Listar o nome do serviço embaixo após digitar o ID seria legal</p>
                <input
                    type="text"
                    placeholder="CPF Cliente"
                    value={cpfCliente}
                    onChange={(event) => setCpfCliente(event.target.value)}
                />
                <p>Listar o nome do Cliente embaixo após digitar o CPF seria legal</p>
                <p>Data de realização do serviço</p>
                <DatePicker locale='es' readOnly selected={new Date()} placeholderText="Data de Nascimento" />
                <button type="submit">Cadastrar</button>
            </Container>
        </div>
    );
}

export default RealizarServico;
