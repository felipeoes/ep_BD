/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback, useState } from "react";
import "../servicos.css";

import { toast } from "react-toastify";
import api from "../../../services/api";

import {
  CreateProductContainer,
  CreateProductFormLabel,
  CreateProductFormInput,
  CreateProductButtonsContainer,
  SaveButton,
  CancelButton,
} from "./styles";
import { FormContainer, FormInput, FormLabel } from "../../auth/login/styles";
import { NameInputContainer } from "../../auth/signup/styles";

function CreateServico(props) {
  const [id, setId] = useState(Math.floor(Math.random() * 999) + 1);
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");

  const handleCreateServico = useCallback(
    async (event) => {
      props.handleOnClose();
      event.preventDefault();

      let response;
      try {
        const obg = {
          id,
          nome,
          descricao,
          preco,
        };
        console.log(obg);

        response = await api.post(`servicos/`, obg);

        console.log(response);
        toast.success("Serviço cadastrado com sucesso!");
      } catch (error) {
        toast.error(
          "Não foi possível cadastrar o serviço! Verifique os campos preenchidos."
        );
        console.log("erro");
        console.log(error);
      }
    },
    [nome, descricao, preco, id, props]
  );

  return (
    <CreateProductContainer>
      <FormContainer
        onSubmit={() => handleCreateServico}
        style={{ marginTop: 0, width: "100%" }}
      >
        <NameInputContainer>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <CreateProductFormLabel htmlFor="lastName">
              Nome do Serviço
            </CreateProductFormLabel>
            <br />
            <CreateProductFormInput
              type="text"
              placeholder="Digite o nome do serviço"
              value={nome}
              onChange={(event) => setNome(event.target.value)}
              required
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginRight: 12,
            }}
          >
            <CreateProductFormLabel htmlFor="firstName">
              Preço
            </CreateProductFormLabel>
            <br />
            <CreateProductFormInput
              type="number"
              placeholder="Digite o preço"
              value={preco}
              onChange={(event) => setPreco(event.target.value)}
              required
            />
          </div>
        </NameInputContainer>

        <NameInputContainer>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <CreateProductFormLabel htmlFor="lastName">
              Descrição
            </CreateProductFormLabel>
            <br />
            <CreateProductFormInput
              type="text"
              placeholder="Digite a descrição do serviço"
              value={descricao}
              onChange={(event) => setDescricao(event.target.value)}
              required
            />
          </div>
        </NameInputContainer>
        <CreateProductButtonsContainer>
          <CancelButton onClick={props.handleOnClose}>Cancelar</CancelButton>
          <SaveButton type="submit" onClick={handleCreateServico}>
            Salvar
          </SaveButton>
        </CreateProductButtonsContainer>
      </FormContainer>
    </CreateProductContainer>
  );
}

export default CreateServico;
