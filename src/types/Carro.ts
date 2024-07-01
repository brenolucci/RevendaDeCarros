import type Versao from "./Versao";

export default interface Carro {
    versao: Versao,
    imagens: [{
        img_url: string,
    }],
    opcionais: [{
        opcional_id: []
    }]
}