import axios from "axios";

const access_token = localStorage.getItem('user')
const headerConfig = {
    headers: {
        'Authorization':  `Bearer ${access_token}`
    }
} 

export class ProductService {

    async cadastrarVersao (body: FormData) {

        const response = await axios.post('http://localhost/revendaCarro/hmtl/src/Controllers/UploadImg.php', body, headerConfig);
            
        return response.data;
    }

    async login(body: any) {
        return axios.post('http://localhost/revendaCarro/hmtl/src/controllers/Login.php', body)
            .then((response) => {
                console.log(response.data);
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
        const response = await axios.get(`http://localhost/revendaCarro/hmtl/src/controllers/FiltrarVersoes.php${params}`, headerConfig);

        return response.data;
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
}