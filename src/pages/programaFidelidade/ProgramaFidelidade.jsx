import "./programaFidelidade.css"
import { Link } from "react-router-dom";
import { AddCircle, Edit, Search, Ballot } from '@mui/icons-material/';

import { Container, Card, CardTitle, CardContainer } from "./styles.js";

export default function ProgramaFidelidade() {
    return (
        <div className="programaFidelidade">
            <Container>
                <h2>Gerenciar Programas de Fidelidade</h2>
                <CardContainer>
                    <Card>
                        <AddCircle color="primary" />
                        <Link to='/create-fid'><CardTitle>Cadastrar Programa</CardTitle></Link>
                    </Card>

                    <Card>
                        <Edit color="primary" />
                        <Link to='/update-fid'><CardTitle>Atualizar Programa</CardTitle></Link>
                    </Card>


                    <Card>
                        <Search color="primary" />
                        <Link to='/srch-fid'><CardTitle>Pesquisar Programa</CardTitle></Link>
                    </Card>

                    <Card>
                        <Ballot color="primary" />
                        <Link to='/list-fid'><CardTitle>Listar Programas</CardTitle></Link>
                    </Card>
                </CardContainer>
            </Container>
        </div>
    )
}
