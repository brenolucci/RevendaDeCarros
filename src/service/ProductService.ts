import router from "@/router";
import type User from "@/types/User";
import axios from "axios";

export class ProductService {

    async cadastrarVersao (body: FormData) {

        const response = await fetch('http://localhost/revendaCarro/hmtl/src/Controllers/UploadImg.php', {
            method: "POST",
            body: body
        });
            
        return await response.json();
    }

    login(body: User) {
        axios.post('/login/route', body)
        .then((response) => {
            console.log('logou');
            router.push({path: '/'});
        })
        .catch((errors) => {
            console.log('falhou');
        });
    }

    async buscarOpcionais() {
        const requestOptions = {
            method: "GET",
            headers: {"content-type": "application/json"},
        };
        const response = await fetch('http://localhost/revendaCarro/hmtl/src/controllers/BuscarOpcionais.php', requestOptions);
        const data = await response.json();
    
        return data;
    }

    async buscarCombustiveis() {
        const requestOptions = {
            method: "GET",
            headers: {"content-type": "application/json"},
        };
        const response = await fetch('http://localhost/revendaCarro/hmtl/src/controllers/BuscarCombustiveis.php', requestOptions);
        const data = await response.json();
    
        return data;
    }

    async buscarVersoesFiltradas(params: string) {
        const response = await fetch(`http://localhost/revendaCarro/hmtl/src/controllers/FiltrarVersoes.php${params}`, {
            method: "GET",
        });

        return await response.json();
    }

    async buscarVersoes() {
        const requestOptions = {
            method: "GET",
            headers: {"content-type": "application/json"},
        };
        const response = await fetch('http://localhost/revendaCarro/hmtl/src/controllers/BuscarVersoes.php', requestOptions);
        const data = await response.json();
    
        return data;
    }

    async buscarModelos() {
        const requestOptions = {
            method: 'GET',
            headers: {"content-type": "application/json"},
        };
        const response = await fetch('http://localhost/revendaCarro/hmtl/src/controllers/BuscarModelos.php', requestOptions);
        const data = await response.json();

        return data;
    }

    async buscarModelosPorMarca(marcaId: number) {
        const requestOptions = {
            method: 'GET',
            headers: {"content-type": "application/json"},
        };
        const response = await fetch(`http://localhost/revendaCarro/hmtl/src/controllers/BuscarModelosPorMarca.php?marca_id=${marcaId}`, requestOptions);
        const data = await response.json();

        return data;
    }

    async buscarMarcas() {
        const requestOptions = {
            method: "GET",
            headers: {"content-type": "application/json"},
        };
        const response = await fetch('http://localhost/revendaCarro/hmtl/src/controllers/BuscarMarcas.php', requestOptions);
        const data = await response.json();
    
        return data;
    }

    getProductsSmall() {
        return fetch('/demo/data/products-small.json', { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json())
            .then((d) => d.data);
    }
    

    getProducts() {
        return fetch('/demo/data/products.json', { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json())
            .then((d) => d.data);
    }

    getProductsMixed() {
        return fetch('/demo/data/products-mixed.json', { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json())
            .then((d) => d.data);
    }

    getProductsWithOrdersSmall() {
        return fetch('/demo/data/products-orders-small.json', { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json())
            .then((d) => d.data);
    }

    getProductsWithOrdersLarge() {
        return fetch('/demo/data/products-orders.json', { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json())
            .then((d) => d.data);
    }
}
