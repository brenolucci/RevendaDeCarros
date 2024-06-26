export class ProductService {

    async cadastrarVersao (body: FormData) {
        const requestOptions = {
            method: "POST",
            body: body
        }
        const response = await fetch('http://localhost/revendaCarro/hmtl/src/Controllers/UploadImg.php', requestOptions)
        const data = await response.json();

        return data;
    }

    // async cadastrarVersao(body: Cadastro, imagens: FormData) {
    //     console.log('ESSE É O BODY CRU QUE VEM DO COMPONENTE', body)
    //     const versao = body
        
    //     const requestOptions = {
    //         method: "POST",
    //         headers: {"Content-Type": "application/json"},
            
    //         // body: JSON.stringify(body)
    //         body: {body, imagens}
    //     };
    //     console.log('ESSE É O BODY TRANSFORMADO EM JSON', requestOptions.body)

    //     // console.log(requestOptions.body)
    //     const response = await fetch("http://localhost/revendaCarro/hmtl/src/controllers/CadastrarVersao.php", requestOptions);
    //     return
    //     const data = await response.json();
        
    //     return data;
    // }
    
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
