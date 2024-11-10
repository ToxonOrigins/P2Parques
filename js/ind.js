const { createApp } = Vue
createApp({
    data() {
        return {
            parques: [],
            url: 'https://gehg235.pythonanywhere.com/parques',
            error: false,
            cargando: true,
            id: 0,
            nombre: "",
            genero: 0,
            edad: "",
            consola: 0,
            imagen: "",
            login: false,
            clase: 0,
            urlz: 'https://gehg235.pythonanywhere.com/zonas',
            zonas: [],
        }
    },
    mounted() {
        if (sessionStorage.login == "true") {
            this.login = true;
        }
        switch (parseInt(sessionStorage.clase)) {
            case 1:
                this.clase = 1;
                break;
            case 2:
                this.clase = 2;
                break;
        }
        setTimeout(() => {
            this.onas(this.zonas, this.parques)
        }, 3000)
    },
    methods: {
        fetchData(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.parques = data;
                    this.cargando = false
                })
                .catch(err => {
                    console.error(err);
                    this.error = true
                })
        },
        fetchDataz(urlz) {
            fetch(urlz)
                .then(response => response.json())
                .then(dataz => {
                    this.zonas = dataz;
                    this.cargando = false
                })
                .catch(err => {
                    console.error(err);
                    this.error = true
                })
        },
        eliminar(id) {
            const url = this.url + '/' + id;
            var options = {
                method: 'DELETE',
            }
            fetch(url, options)
                .then(res => res.text())
                .then(res => {
                    alert('Registro Eliminado')
                    location.reload();
                })
        },
        onas(zonas, parques) {
            //LLamo a la api de google
            google.charts.load('current', { packages: ['corechart'] });
            google.charts.setOnLoadCallback(drawChart);
            function drawChart(){
                var datas = new google.visualization.DataTable();
                datas.addColumn('string', 'Zona');
                datas.addColumn('number', 'Visitas');
                for (let i = 0; i < zonas.length; i++) {
                    vis = 0
                    for (let z = 0; z < parques.length; z++) {
                        if (parques[z].nombreg == zonas[i].nombreg) {
                            vis += parques[z].visitantes
                        };
                    }
                    datas.addRows([[String(zonas[i].nombreg), vis]])
                }
                //Dejo Titulo
                const options = {
                    title: 'Distribución de visitas por Zona'
                };
                // Dibujo
                const chart = new google.visualization.PieChart(document.getElementById('myChart'));
                chart.draw(datas, options);
            }
        }
    },
    created() {
        this.fetchData(this.url),
            this.fetchDataz(this.urlz)
    },
}
).mount('#app')

