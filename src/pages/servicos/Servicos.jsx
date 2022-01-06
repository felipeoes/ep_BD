import { Link } from "react-router-dom";
import "./servicos.css"

import { MedicalServices, Ballot, AddCircle, Edit, Search } from '@mui/icons-material/';

import { Container, Card, CardTitle, CardContainer } from "./styles.js";

export default function Servicos() {
    return (
        <div className="servicos">
            <Container>
                <h2>Gerenciar Serviços</h2>
                <CardContainer>
                    <Card>
                        <AddCircle color="primary" />
                        <Link to='/create-serv'><CardTitle>Cadastrar Serviço</CardTitle></Link>
                    </Card>
                    <Card>
                        <Edit color="primary" />
                        <Link to='/update-serv'><CardTitle>Alterar Serviço</CardTitle></Link>
                    </Card>
                    <Card>
                        <Ballot color="primary" />
                        <Link to='/list-serv'><CardTitle>Listar Serviços</CardTitle></Link>
                    </Card>
                </CardContainer>
            </Container>
        </div>
    )
}


