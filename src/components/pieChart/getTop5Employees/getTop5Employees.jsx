import { useState, useEffect } from "react";
import api from "../../../services/api";
import { toast } from "react-toastify";

const names = ["Maxit", "Oliver peças", "Susienne", "Mappit", "Lorenzetti"];

export default function ListTop5Employees(props) {
  const [top5Employees, setTop5Employees] = useState([]);

  useEffect(() => {
    loadTop5Suppliers();
  }, []);

  async function loadTop5Suppliers() {
    try {
      const response = await api.get(`top5-funcionarios/`);
      const employees = response.data.results;

      const employeesNames = [];
      for (const employee of employees) {
        const response = await api.get(`funcionarios/${employee.num_func}`);
        const employeeResponse = response.data;

        employeesNames.push(employeeResponse.nome);
      }

      console.log(employeesNames);
      let name = "";
      let value = 0;
      const employeesObj = [];
      let i = 0;
      employees.forEach((employee) => {
        name = employeesNames[i];
        value = employee.total;

        employeesObj.push({ name, value });
        i++;
      });

      console.log(employeesObj);
      setTop5Employees(employeesObj);
    } catch (error) {
      toast.error("Não foi possível encontrar os top5 produtos");
      console.log(error);
    }
  }
  return top5Employees;
}
