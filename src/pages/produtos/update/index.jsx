/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { UpdateItemContainer } from "./styles";
import { toast } from "react-toastify";
import api from "../../../services/api";
import { FormContainer } from "./../../auth/login/styles";
import {
  CreateProductFormInput,
  CreateProductFormLabel,
} from "../create/styles";
import Loading from "./../../../components/loading/Loading";
import {
  CreateProductButtonsContainer,
  CancelButton,
} from "./../../servicos/create/styles";
import { SaveButton } from "./../../funcionarios/create/styles";
import { NameInputContainer } from "../../auth/signup/styles";

function UpdateProduto(props) {
  const [codBarras, setCodBarras] = useState("");
  const [nome, setNome] = useState("");
  const [categoria, setCategoria] = useState("");
  const [preco, setPreco] = useState("");
  const [loading, setLoading] = useState(true);

  let item = props.item;
  const updateProduct = props.updateItem;

  useEffect(() => {
    setCodBarras(item.codigo_barras);
    setNome(item.nome);
    setCategoria(item.categoria);
    setPreco(item.preco);
    setLoading(false);
  }, []);

  let navigate = useNavigate();

  const handleOnUpdateProduct = useCallback(
    async (event) => {
      event.preventDefault();
      try {
        const obj = {
          codigo_barras: codBarras,
          nome,
          categoria,
          preco,
        };

        const response = await api.put(`produtos/${codBarras}/`, obj);

        console.log(response);
        toast.success("Produto atualizado com sucesso!");
        updateProduct(obj);
        props.handleOnClose();
      } catch (error) {
        toast.error("Erro ao atualizar o produto");
        console.log(error);
      }
    },
    [codBarras, navigate, categoria, nome, preco]
  );

  return (
    <UpdateItemContainer>
      <FormContainer onSubmit={handleOnUpdateProduct}>
        {!loading ? (
          <>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <CreateProductFormLabel htmlFor="productName">
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

            <NameInputContainer>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <CreateProductFormLabel htmlFor="productPrice">
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
                <CreateProductFormLabel htmlFor="productCategory">
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
              <CancelButton onClick={props.handleOnClose}>
                Cancelar
              </CancelButton>
              <SaveButton type="submit" onClick={handleOnUpdateProduct}>
                Atualizar
              </SaveButton>
            </CreateProductButtonsContainer>
          </>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "10%",
            }}
          >
            <Loading width={150} height={150} />
          </div>
        )}
      </FormContainer>
    </UpdateItemContainer>
  );
}

export default UpdateProduto;
