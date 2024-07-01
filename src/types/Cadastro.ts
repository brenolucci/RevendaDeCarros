import type Opcional from "./Opcional";

export default interface Cadastro {
    id?: number,
    modelo_id: number | null,
    combustivel_id: number | null,
    nome: string,
    preco: number,
    ano: number,
    ano_modelo: number,
    quilometragem: string,
    localizacao: string,
    opcionais:Array<Opcional>,
    imagens?: any
}