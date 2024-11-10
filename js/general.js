head=`
        <nav class="header">
            <div class="container">
                    <nav class="menu">
                        <a href="index.html">Inicio</a>
                        <a href="registro.html">Registro/login</a>
                        <a href="parquea.html" id="lost"> Añadir otro parque</a>
                        <a href="#" id="lost2">Salir</a>
                    </nav>
                </div>
        </nav>
    `
document.querySelector("header").innerHTML=head
foot=` <h4><p>Sitio desarrollado por Gabriel Hurtado Guimarey, Nicolas Fernandez, Rircardo, y Selena </p></h4>`

data = sessionStorage.getItem("login");
document.getElementById("lost").style.display = "none"; 
document.getElementById("lost2").style.display = "none"; 
clase = sessionStorage.getItem("clase");
if (data== "true"&&(clase==0 || clase==2)){
    document.getElementById("lost").style.display = "initial"; 
}
if (data== "true"){
    document.getElementById("lost2").style.display = "initial"; 
}
var button = document.getElementById("lost2");
button.addEventListener("click", clear)
function clear(){sessionStorage.clear(); location.reload()}
