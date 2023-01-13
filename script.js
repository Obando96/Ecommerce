window.addEventListener('load', function(){
    new Glider(this.document.querySelector('.listaProductos'), {
        slidesToShow: 4,
        slidesToScroll: 4,
        dots: '.productosIndicadores',
        arrows: {
            prev: '.productosAnterior',
            next: '.productosSiguiente'
        }
    });
});

window.addEventListener('load', function(){
    new Glider(this.document.querySelector('.listaProductos2'), {
        slidesToShow: 4,
        slidesToScroll: 4,
        dots: '.productosIndicadores2',
        arrows: {
            prev: '.productosAnterior2',
            next: '.productosSiguiente2'
        }
    });
});

const contenedorProductosAgregados = document.querySelector('.contenedorProductosAgregados');

let btnAgregarCarrito = document.querySelectorAll('.comprar');
btnAgregarCarrito.forEach((btnElementoAgregado) => {
    btnElementoAgregado.addEventListener('click', agregarCarritoSeleccionado);
});

function agregarCarritoSeleccionado(event){
    const boton = event.target;
    const item = boton.closest('.elementosProductos');
    let itemDescripcion = item.querySelector('.descripcionProducto').textContent;
    let itemPrecio = item.querySelector('.precio').textContent;
    let itemImagen = item.querySelector('.imagen').src;

    agregarItemCarrito(itemDescripcion, itemPrecio, itemImagen);
}

function agregarItemCarrito(itemDescripcion, itemPrecio, itemImagen){
    const agregarProductoCarro = document.createElement('div');
    agregarProductoCarro.classList.add('productoAgregado');
    const productoAgregadoCarro = `
    <div class="itemProductoAgregado">
        <div class="producto-descripcionAgregado">
            <img src=${itemImagen} class="imagenProductoAgregado" alt="">
            <h6 class="descripcionProductoAgregado">${itemDescripcion}</h6>
        </div>
        
    </div>
    <div class="itemPrecio">${itemPrecio}</div>
    <input type="text" class="cantidadProducto" placeholder="1" width="40px" height: 40px;>
    </div>
    <div>
        <button class="btnEliminar">Eliminar</button>
    </div>`;
    agregarProductoCarro.innerHTML = productoAgregadoCarro;
    contenedorProductosAgregados.append(agregarProductoCarro);
}