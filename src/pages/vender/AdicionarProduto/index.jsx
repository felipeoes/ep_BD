import React, { useState } from 'react';

function AdicionarProduto() {

    const [idProduto, setIdProduto] = useState("");
    const [quantidade, setQuantidade] = useState("");

    return (
        <div>
            <input
                type="text"
                placeholder="ID Produto"
                value={idProduto}
                onChange={(event) => setIdProduto(event.target.value)}
            />
            <input
                type="text"
                placeholder="Quantidade"
                value={quantidade}
                onChange={(event) => setQuantidade(event.target.value)}
            />
        </div>
    );
}

export default AdicionarProduto;