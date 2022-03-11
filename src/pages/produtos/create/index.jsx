/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback, useState } from "react";

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

function CreateProduto(props) {
  const [codBarras, setCodBarras] = useState("");
  const [nome, setNome] = useState("");
  const [categoria, setCategoria] = useState("");
  const [preco, setPreco] = useState("");

  const handleCreateProduto = useCallback(
    async (event) => {
      props.handleOnClose();

      event.preventDefault();
      const obg = {
        codigo_barras: codBarras,
        nome,
        categoria,
        preco: Number(preco),
      };
      console.log(obg);

      try {
        const response = await api.post("produtos/", obg);

        console.log(response);
        toast.success("Produto cadastrado com sucesso");

        props.loadItems();
      } catch (error) {
        console.log(error);
      }
    },
    [nome, categoria, preco, codBarras, props]
  );

  return (
    <CreateProductContainer>
      <FormContainer
        onSubmit={() => handleCreateProduto}
        style={{ marginTop: 0, width: "100%" }}
      >
        <NameInputContainer>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <CreateProductFormLabel htmlFor="lastName">
              Nome do produto
            </CreateProductFormLabel>
            <br />
            <CreateProductFormInput
              type="text"
              placeholder="Digite o nome do produto"
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
              Código de barras
            </CreateProductFormLabel>
            <br />
            <CreateProductFormInput
              type="text"
              placeholder="Digite o código de barras"
              value={codBarras}
              onChange={(event) => setCodBarras(event.target.value)}
              required
              max={12}
            />
          </div>
        </NameInputContainer>

        <NameInputContainer>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <CreateProductFormLabel htmlFor="lastName">
              Preço
            </CreateProductFormLabel>
            <br />
            <CreateProductFormInput
              type="number"
              placeholder="Digite o preço do produto"
              value={preco}
              onChange={(event) => setPreco(event.target.value)}
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
              Categoria
            </CreateProductFormLabel>
            <br />
            <CreateProductFormInput
              type="text"
              placeholder="Categoria"
              value={categoria}
              onChange={(event) => setCategoria(event.target.value)}
              required
            />
          </div>
        </NameInputContainer>
        <CreateProductButtonsContainer>
          <CancelButton onClick={props.handleOnClose}>Cancelar</CancelButton>
          <SaveButton type="submit" onClick={handleCreateProduto}>
            Salvar
          </SaveButton>
        </CreateProductButtonsContainer>
      </FormContainer>
    </CreateProductContainer>
  );
}

export default CreateProduto;
