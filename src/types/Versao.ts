import type Modelo from '@types/Modelo';
import type Combustivel from '@types/Combustivel';

export interface Versao {
    modelo_id: Modelo,
    combustivel_id: Combustivel,
    nome: string,
    preco: number,
    ano: number,
    ano_modelo: number,
    quilometragem: string,
    localizacao: string
}