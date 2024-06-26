import type Marca from '@/types/Marca';

export default interface Modelo {
    id: number,
    nome: string,
    marca: Marca
}