head=`
        <nav class="header">
            <div class="container">
                    <nav class="menu">
                        <a href="index.html">Inicio</a>
                        <a href="registro.html">Registro/login</a>
                        <span id="lost"><a href="parquea.html"> Añadir otro parque</a></span>
                    </nav>
                </div>
        </nav>
    `
document.querySelector("header").innerHTML=head
foot=` <h4><p>Sitio desarrollado por Gabriel Hurtado Guimarey</p></h4>`

data = sessionStorage.getItem("login");
document.getElementById("lost").style.display = "none"; 
if (data== "true"){
    document.getElementById("lost").style.display = "initial"; 
}