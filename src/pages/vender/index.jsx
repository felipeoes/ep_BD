/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback, useState } from "react";
import "./vender.css";

// import { Container, GenderContainer, GenderContainerType, FuncionalContainer } from "./styles";

function Venda() {

  return (
    <div class="vender">
      Criar Venda
    </div>
  );

  // const [itensVenda, setItensVenda] = useState([]);
  // const [total, setTotal] = useState("");
  // const [formaPagamento, setFormaPagamento] = useState("");
  // const [descontoProgFidelidade, setDescontoProgramaFidelidade] = useState("");
  // const [cpfCliente, setCpfCliente] = useState("");
  // const [qntProdutos, setQntProdutos] = useState(1);

  // const handleNewVenda = useCallback((event) => {
  //   event.preventDefault();

  //   // falta incluir os produtos das vendas

  //   const obg = {
  //     total,
  //     formaPagamento,
  //     descontoProgFidelidade
  //     // produtos das vendas
  //   }
  //   console.log(obg);
  // }, [total, formaPagamento, descontoProgFidelidade]);

  // return (
  //   <div className="vender">

  //     <Container onSubmit={handleNewVenda}>
  //       <h2>Venda</h2>
  //       <input
  //         type="text"
  //         placeholder="Digite o CPF do Cliente"
  //         value={cpfCliente}
  //         onChange={(event) => setCpfCliente(event.target.value)}
  //       />
  //       <select name="employeeType"
  //         onChange={(event) => setFormaPagamento(event.target.value)}
  //       >
  //         <option value="dinheiro">Dinheiro</option>
  //         <option value="cartao-de-credito">Cartão de Crédito</option>
  //         <option value="cartao-de-debito">Cartão de Débito</option>
  //         <option value="vale-compras">Vale Compras</option>
  //       </select>
  //       <input
  //         type="text"
  //         placeholder="Total"
  //         value={total}
  //         readOnly={true}
  //       />

  //       {qntProdutos !== 0 && itensVenda.map(function (object, i) {
  //         return <ObjectRow obj={object} key={i} />;
  //       })}

  //       <GenderContainer>
  //         <GenderContainerType>
  //           <label htmlFor="sexo_masc">Masculino</label>
  //           <input id="sexo_masc" type="radio" name="sexo" value="masculino" onChange={(event) => setGender(event.target.value)} />
  //         </GenderContainerType>
  //         <GenderContainerType>
  //           <label htmlFor="sexo_fem">Feminino</label>
  //           <input type="radio" id="sexo_fem" name="sexo" value="feminino" onChange={(event) => setGender(event.target.value)} />
  //         </GenderContainerType>
  //       </GenderContainer>

  //       <select name="employeeType"
  //         onChange={(event) => setEmployeeType(event.target.value)}
  //       >
  //         <option value="farmaceutico">Farmaceutico</option>
  //         <option value="caixa">Caixa</option>
  //         <option value="gerente">Gerente</option>
  //         <option value="outros">outros</option>
  //       </select>
  //       {employeeType === 'outros' &&
  //         <input
  //           type="text"
  //           placeholder="Cargo Alternativo"
  //           value={otherEmployeeType}
  //           onChange={(event) => setOtherEmployeeType(event.target.value)}
  //         />
  //       }
  //       <input
  //         type="number"
  //         placeholder="Salário"
  //         value={salary}
  //         onChange={(event) => setSalary(event.target.value)}
  //       />

  //       <button type="submit">Atualizar</button>
  //     </Container>
  //   </div>
  // );
}

export default Venda;
