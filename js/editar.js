var id = location.search.substr(4)

const { createApp } = Vue
createApp({
    data() {
        return {
            url: 'https://gehg235.pythonanywhere.com/parques/' + id,
            error: false,
            cargando: true,
            id: 0,
            nombre: "",
            zona: "",
            visitantes: "",
            consola: "",
            imagen: "",
            urlg: 'https://gehg235.pythonanywhere.com/zonas',
            nombreg: null,
            zonas: [],
            esconderg: false,
            eli: 0,
        }
    },
    mounted() {
        if (sessionStorage.login != "true"&&(sessionStorage.clase!=1 || sessionStorage.clase!=2)) {
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
                    this.zona = data.zona;
                    this.visitantes = data.visitantes;
                    this.imagen = data.imagen;
                    this.cargando = false;
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
                    this.zonas = datag;
                    this.cargando = false
                })
                .catch(err => {
                    console.error(err);
                    this.error = true
                })
        },
        grabar() {
            let parque = {
                nombre: this.nombre,
                visitantes: this.visitantes,
                zona: this.zona,
                consola: this.consola,
                imagen: this.imagen
            }
            var options = {
                body: JSON.stringify(parque),
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }
            fetch(this.url, options)
                .then(function () {
                    alert("Registro modificado")
                    window.location.href = "./index.html";
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al Modificar")
                })
        },

        grabarg() {
            let zona = {
                id:this.zonas.length + 1,
                nombreg: this.nombreg,
            }
            var options = {
                body: JSON.stringify(zona),
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }
            fetch(this.urlg, options)
                .then(function () {
                    alert("Zona agregada");
                    this.error = false             
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al Agregar")
                    this.error = true
                })
                if (this.error== false){
                    this.zonas.push({nombreg: this.nombreg,  id: (this.zonas.length + 1) })}
        },
        eliminarg(eli) {
            const urlg = this.urlg + '/' + eli;
            var options = {
                method: 'DELETE',
            }
            fetch(urlg, options)
                .then(res => res.text())
                .then(res => {
                    alert('Zona Eliminada')
                    this.zonas.pop(eli - 1)
                })
                .catch(err => {
                    alert("La zona que trata de eliminar esta siendo utilizado, edite todo parque con referencia a esta.");
                })
        },
    },
    created() {
        this.fetchData(this.url),
            this.fetchDatag(this.urlg)
    },
}).mount('#app')

