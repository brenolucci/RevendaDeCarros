import type Modelo from './Modelo';
import type Combustivel from './Combustivel';

export default interface Versao {
    id?: number,
    modelo: Modelo,
    combustivel: Combustivel,
    nome: string,
    preco: number,
    ano: number,
    ano_modelo: number,
    quilometragem: string,
    localizacao: string
}