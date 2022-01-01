import "../servicos.css"
import { Link } from "react-router-dom";

import { AddCircle, MedicalServices, Edit, Search, Ballot } from '@mui/icons-material/';

import { Container, Card, CardTitle, CardContainer } from "./styles.js";

export default function Servicos() {
    return (
        <div className="servicos">
            <Container>
                <h2>Serviços</h2>
                <CardContainer>
                    <Card>
                        <Ballot color="primary" />
                        <Link to='/list-serv'><CardTitle>Listar Serviços</CardTitle></Link>
                    </Card>
                    <Card>
                        <MedicalServices color="primary" />
                        <Link to='/realizar-servico'><CardTitle>Realizar Serviço</CardTitle></Link>
                    </Card>
                </CardContainer>
            </Container>
        </div>
    )
}


