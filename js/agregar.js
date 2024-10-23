
const { createApp } = Vue
createApp({
    data() {
        return {
            url: 'https://gehg235.pythonanywhere.com/juegos',
            error: false,
            cargando: true,
            id: 0,
            nombre: "",
            genero: "",
            anio: "",
            consola: "",
            imagen: "",
            consolas: [],
            urlc: 'https://gehg235.pythonanywhere.com/consolas',
            nombrec: null,
            urlg: 'https://gehg235.pythonanywhere.com/generos',
            nombreg: null,
            generos: [],
            esconderg: false,
            esconderc: false,
            eli: 0,
            elic: 0
        }
    },
    mounted() {
        if (sessionStorage.login != "true") {
            window.location.href = "index.html";
        }
    },
    methods: {
        fetchData(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.id = data.id;
                    this.nombre = data.nombre;
                    this.genero = data.genero;
                    this.anio = data.anio;
                    this.consola = data.consola;
                    this.imagen = data.imagen;
                    this.cargando = false;
                })
                .catch(err => {
                    console.error(err);
                    this.error = true
                })
        },
        fetchDatac(urlc) {
            fetch(urlc)
                .then(response => response.json())
                .then(datac => {
                    this.consolas = datac;
                    this.cargando = false
                })
                .catch(err => {
                    console.error(err);
                    this.error = true
                })
        },
        fetchDatag(urlg) {
            fetch(urlg)
                .then(response => response.json())
                .then(datag => {
                    this.generos = datag;
                    this.cargando = false
                })
                .catch(err => {
                    console.error(err);
                    this.error = true
                })
        },
        grabar() {
            let juego = {
                nombre: this.nombre,
                anio: this.anio,
                genero: this.genero,
                consola: this.consola,
                imagen: this.imagen
            }
            var options = {
                body: JSON.stringify(juego),
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }

            fetch(this.url, options)
                .then(function () {
                    alert("Juego agregado")
                    window.location.href = "./index.html";
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al Agregar")
                })
        },

        grabarg() {
            let genero = {
                id:this.generos.length + 1,
                nombreg: this.nombreg,
            }
            var options = {
                body: JSON.stringify(genero),
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }
            fetch(this.urlg, options)
                .then(function () {
                    alert("Genero agregado");
                    this.error = false
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al Agregar")
                    this.error = true
                })
                if (this.error== false){
                    this.generos.push({nombreg: this.nombreg,  id: (this.generos.length + 1) })}
        },
        grabarc() {
            let consola = {
                id:this.consolas.length + 1,
                nombrec: this.nombrec,
            }
            var options = {
                body: JSON.stringify(consola),
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }
            fetch(this.urlc, options)
                .then(function () {
                    alert("Consola agregada");
                    this.error = false
                })
                .catch(err => {
                    console.error(err);
                    this.error = true
                    alert("Error al agregar consola")
                })
                if (this.error== false){
                    this.consolas.push({ nombrec: this.nombrec, id: (this.consolas.length + 1) })
                }
        },
        eliminarg(eli) {
            const urlg = this.urlg + '/' + eli;
            var options = {
                method: 'DELETE',
            }
            fetch(urlg, options)
                .then(res => res.text())
                .then(res => {
                    alert('Genero Eliminado')
                    this.generos.pop(eli - 1)
                })
                .catch(err => {
                    alert("El género que trata de eliminar esta siendo utilizado, edite todo juego con referencia a este.");
                })
        },
        eliminarc(elic) {
            const urlc = this.urlc + '/' + elic;
            var options = {
                method: 'DELETE',
            }
            fetch(urlc, options)
                .then(res => res.text())
                .then(res => {
                    alert('Consola Eliminado')
                    this.consolas.pop(elic - 1)
                })
                .catch(err => {
                    alert("La consola que trata de eliminar esta siendo utilizada, edite todo juego con referencia a esta.");
                })
        },
    },
    created() {
        this.fetchData(this.url),
            this.fetchDatac(this.urlc),
            this.fetchDatag(this.urlg)
    },

}).mount('#app')
