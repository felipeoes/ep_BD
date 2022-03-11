import React, { useCallback, useState } from "react";
import "../funcionarios.css";

import { toast } from "react-toastify";
import api from "../../../services/api";

import {
  Container,
  GenderContainer,
  GenderContainerType,
  FuncionalContainer,
} from "./styles";

function CreateFuncionario() {
  const [pesquisaFuncional, setPesquisaFuncional] = useState(false);
  const [name, setName] = useState("");
  const [funcional, setFuncional] = useState("");
  const [salary, setSalary] = useState("");
  const [gender, setGender] = useState("");
  const [employeeType, setEmployeeType] = useState("farmaceutico");
  const [otherEmployeeType, setOtherEmployeeType] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [crf, setCrf] = useState("");

  const handlePesquisaFuncional = useCallback(
    async (event) => {
      event.preventDefault();
      try {
        const response = await api.get(`funcionarios/${funcional}`);

        console.log(response);
        toast.success("Cliente pesquisado com sucesso");

        const funcionario = response.data;

        setFuncional(funcionario.funcional);
        setName(funcionario.nome);
        setSalary(funcionario.salario);
        setGender(funcionario.sexo);
        setEmployeeType(funcionario.tipo_func);

        if (funcionario.tipo_func === "farmaceutico") {
          setCrf(funcionario.crf);
        }

        setPesquisaFuncional(true);
      } catch (error) {
        console.log("erro");
        console.log(error);
      }
    },
    [funcional]
  );

  const handleUpdateEmployee = useCallback(
    async (event) => {
      event.preventDefault();

      let obg;
      if (employeeType === "farmaceutico") {
        obg = {
          funcional: funcional,
          nome: name,
          salario: Number(salary),
          sexo: gender,
          tipo_func: "farmaceutico",
          crf,
        };
      } else {
        obg = {
          funcional: funcional,
          nome: name,
          salario: Number(salary),
          sexo: gender,
          tipo_func:
            employeeType === "outros" ? otherEmployeeType : employeeType,
        };
      }

      console.log(obg);

      try {
        const response = await api.put(`funcionarios/${funcional}/`, obg);

        console.log(response);
        toast.success("Cliente cadastrado com sucesso");
      } catch (error) {
        console.log("erro");
        console.log(error);
      }
    },
    [funcional, name, crf, salary, gender, employeeType, otherEmployeeType]
  );

  return (
    <div className="funcionarios">
      <FuncionalContainer onSubmit={handlePesquisaFuncional}>
        <h2>Alterar Funcionário</h2>
        <div>
          <input
            type="text"
            placeholder="Digite o número da funcional"
            value={funcional}
            onChange={(event) => setFuncional(event.target.value)}
            required
          />
          <button type="submit">Pesquisar</button>
        </div>
      </FuncionalContainer>
      {pesquisaFuncional && (
        <Container onSubmit={handleUpdateEmployee}>
          <input
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Funcional"
            value={funcional}
            onChange={(event) => setFuncional(event.target.value)}
            readOnly
            pattern="[0-9]{7}"
          />
          <input
            type="text"
            placeholder="Telefone"
            value={phoneNumber}
            onChange={(event) => setPhoneNumber(event.target.value)}
            required
            pattern="[0-9]{7}"
          />
          <GenderContainer>
            <GenderContainerType>
              <label htmlFor="sexo_masc">
                Masculino
                <input
                  id="sexo_masc"
                  required
                  type="radio"
                  checked={gender === "M"}
                  name="sexo"
                  value="M"
                  onChange={(event) => setGender(event.target.value)}
                />
              </label>
            </GenderContainerType>
            <GenderContainerType>
              <label htmlFor="sexo_fem">
                Feminino
                <input
                  type="radio"
                  id="sexo_fem"
                  name="sexo"
                  checked={gender === "F"}
                  value="F"
                  onChange={(event) => setGender(event.target.value)}
                />
              </label>
            </GenderContainerType>
          </GenderContainer>

          <select
            name="employeeType"
            onChange={(event) => setEmployeeType(event.target.value)}
            value={employeeType}
          >
            <option value="farmaceutico">Farmaceutico</option>
            <option value="caixa">Caixa</option>
            <option value="gerente">Gerente</option>
            <option value="outros">outros</option>
          </select>
          {employeeType === "outros" && (
            <input
              type="text"
              placeholder="Cargo Alternativo"
              value={otherEmployeeType}
              onChange={(event) => setOtherEmployeeType(event.target.value)}
            />
          )}
          {employeeType === "farmaceutico" && (
            <input
              type="text"
              placeholder="crf"
              value={crf}
              onChange={(event) => setCrf(event.target.value)}
              required={employeeType === "farmaceutico"}
              pattern="[0-9]{6}"
            />
          )}
          <input
            type="number"
            placeholder="Salário"
            value={salary}
            onChange={(event) => setSalary(event.target.value)}
            required
          />

          <button type="submit">Cadastrar</button>
        </Container>
      )}
    </div>
  );
}

export default CreateFuncionario;
