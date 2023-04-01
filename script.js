const contenedorProductosAgregados = document.querySelector(
  ".contenedorProductosAgregados"
);
const productoAgregadof = document.querySelectorAll(".productoAgregado");

let btnAgregarCarrito = document.querySelectorAll(".comprar");
btnAgregarCarrito.forEach((btnElementoAgregado) => {
  btnElementoAgregado.addEventListener("click", agregarCarritoSeleccionado);
});

const botonComprar = document.querySelector(".btnComprar").addEventListener('click', botonComprarClick);

function agregarCarritoSeleccionado(event) {
  const boton = event.target;
  const item = boton.closest(".elementosProductos");
  let itemDescripcion = item.querySelector(".descripcionProducto").textContent;
  let itemPrecio = item.querySelector(".precio").textContent;
  let itemImagen = item.querySelector(".imagen").src;

  agregarItemCarrito(itemDescripcion, itemPrecio, itemImagen);
}

function agregarItemCarrito(itemDescripcion, itemPrecio, itemImagen) {
  const descripcionElementos =
    contenedorProductosAgregados.getElementsByClassName(
      "descripcionProductoAgregado"
    );

  for (let i = 0; i < descripcionElementos.length; i++) {
    if (descripcionElementos[i].innerText === itemDescripcion) {   
        const productoDuplicado = descripcionElementos[i].parentElement.parentElement.parentElement.querySelector(".cantidadProducto");
        productoDuplicado.value++;
        PrecioTotalCompra();
        return;
    }
  }

  const agregarProductoCarro = document.createElement("div");
  agregarProductoCarro.classList.add("productoAgregado");
  const productoAgregadoCarro = `
    <div class="itemProductosAgregado">
        <div class="producto-descripcionAgregado">
            <img src=${itemImagen} class="imagenProductoAgregado" alt="">
            <h6 class="descripcionProductoAgregado">${itemDescripcion}</h6>
        </div>
        <div class="itemPrecio">${itemPrecio}</div>
        <form >
            <input type="number" class="cantidadProducto" placeholder="1" value="1";>
        </form>
        <div>
            <button class="btnEliminar">Eliminar</button>
        </div>
    
    </div>`;
  agregarProductoCarro.innerHTML = productoAgregadoCarro;
  contenedorProductosAgregados.append(agregarProductoCarro);

  agregarProductoCarro
    .querySelector(".btnEliminar")
    .addEventListener("click", eliminarProducto);

  agregarProductoCarro
    .querySelector(".cantidadProducto")
    .addEventListener("change", operacionCantidad);

  PrecioTotalCompra();
}

function PrecioTotalCompra() {
  let total = 0;
  const precioTotal = document.querySelector(".precioTotal");

  const itemProductosAgregado = document.querySelectorAll(
    ".itemProductosAgregado"
  );
  itemProductosAgregado.forEach((itemProductoAgregado) => {
    const itemProductoAgregadoElementoPrecio =
      itemProductoAgregado.querySelector(".itemPrecio");
    const itemProductoAgregadoPrecio = Number(
      itemProductoAgregadoElementoPrecio.textContent.replace("$", "")
    );
    const itemProductosAgregadoCantidadElemento =
      itemProductoAgregado.querySelector(".cantidadProducto");
    const itemProductosAgregadoCantidad = Number(
      itemProductosAgregadoCantidadElemento.value
    );
    console.log(itemProductosAgregadoCantidad);
    total = total + itemProductoAgregadoPrecio * itemProductosAgregadoCantidad;
    console.log(total);
  });

  precioTotal.innerHTML = `${total.toFixed(2)} $`;
}

function eliminarProducto(event) {
  const botonEliminar = event.target;
  console.log(botonEliminar);
  botonEliminar.closest(".itemProductosAgregado").remove();
  PrecioTotalCompra();
}

function operacionCantidad(event) {
  const input = event.target;
  if (input.value <= 0) {
    input.value = 1;
  }
  PrecioTotalCompra();
}

function botonComprarClick(){
    contenedorProductosAgregados.innerHTML = "";
    PrecioTotalCompra();
}