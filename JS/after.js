const productos = [
    {
      producto: "zapatilla1",
      precio: 100,
      img: "https://images.asics.com/is/image/asics/DL408_0146_SR_RT_GLB?$zoom$",
    },
    {
      producto: "zapatilla2",
      precio: 200,
      img: "https://images.asics.com/is/image/asics/DL408_0146_SR_RT_GLB?$zoom$",
    },
    {
      producto: "zapatilla3",
      precio: 300,
      img: "https://images.asics.com/is/image/asics/DL408_0146_SR_RT_GLB?$zoom$",
    },
    {
      producto: "zapatilla4",
      precio: 400,
      img: "https://images.asics.com/is/image/asics/DL408_0146_SR_RT_GLB?$zoom$",
    },
    {
      producto: "zapatilla5",
      precio: 500,
      img: "https://images.asics.com/is/image/asics/DL408_0146_SR_RT_GLB?$zoom$",
    },
    {
      producto: "zapatilla6",
      precio: 600,
      img: "https://images.asics.com/is/image/asics/DL408_0146_SR_RT_GLB?$zoom$",
    },
  ];
  const carrito = localStorage.carrito ? JSON.parse(localStorage.carrito) : [];
  
  var divProductos = document.querySelector("#grilla_productos");
  var divCarrito = document.querySelector("#contenedor_carrito");
  var divTotal = document.querySelector("#contenedor_total");
  
  //------------------------------------------------------------------------
  
  function diagramarZapas() {
    productos.forEach((producto) => {
      let divIn = document.createElement("div");
      divIn.style.border = "1px solid blue";
      divIn.style.float = "left";
      divIn.style.margin = "50px";
      divIn.className = "producto";
      divIn.innerHTML = `<img src=${producto.img} alt="${
        producto.producto
      }" style="height: 100px; width:100px">
      <h2>${producto.producto}</h2>
      <button onclick="agregarACarrito(${productos.indexOf(
        producto
      )})">Hace Click Acá!</button>
      <p>${producto.precio}</p>`;
  
      divProductos.appendChild(divIn);
    });
  }
  
  //------------------------------------------------------------------------
  
  function inputChange(e) {
    if (e.target.value == 0) {
      carrito.splice(e.target.name, 1);
    } else {
      carrito[e.target.name].cantidad = e.target.value;
    }
    loadCarrito();
    localStorage.carrito = JSON.stringify(carrito);
  }
  
  //------------------------------------------------------------------------
  
  function agregarACarrito(index) {
    var producto = productos[index];
    if (carrito.length > 0) {
      var noExiste = true;
      for (var i = 0; i < carrito.length; i++) {
        if (producto.producto === carrito[i].producto) {
          carrito[i].cantidad++;
          noExiste = false;
        }
      }
      if (noExiste) {
        producto.cantidad = 1;
        carrito.push(producto);
      }
    } else {
      producto.cantidad = 1;
      carrito.push(producto);
    }
    loadCarrito();
    localStorage.carrito = JSON.stringify(carrito);
  }
  
  //------------------------------------------------------------------------
  
  function loadCarrito() {
    divCarrito.innerHTML = "";
    divTotal.innerHTML = "";
  
    if (carrito.length > 0) {
      var sumador = 0;
      carrito.forEach((producto) => {
        let divCar = document.createElement("div");
        divCar.style = "clear:both; style:margin: 10px 0 0 0";
        divCar.innerHTML = `<p>${producto.producto} X${producto.cantidad} $${
          producto.precio * producto.cantidad
        }</p><input name="${carrito.indexOf(
          producto
        )}" style="float:left; width:50px;   vertical-align: baseline;
        " value="${producto.cantidad}" onchange="inputChange(event)"> 
        <button style="float:left" onclick="removerCarrito(${carrito.indexOf(
          producto
        )})">Remover producto</button>`;
        divCarrito.appendChild(divCar);
        sumador = sumador + producto.precio * producto.cantidad;
      });
  
      let divTot = document.createElement("p");
      divTot.style = "clear: both";
      divTot.innerHTML = `Total: ${sumador}`;
      divTotal.appendChild(divTot);
    }
  }
  
  //------------------------------------------------------------------------
  
  function removerCarrito(index) {
    carrito[index].cantidad = carrito[index].cantidad - 1;
    if (carrito[index].cantidad <= 0) {
      carrito.splice(index, 1);
    }
    localStorage.carrito = JSON.stringify(carrito);
    loadCarrito();
  }
  
  //------------------------------------------------------------------------
  
  function crearZapatilla() {
    var nuevoProducto = {
      producto: `zapatilla${productos.length + 1}`,
      precio: (productos.length + 1) * 100,
      img: "https://images.asics.com/is/image/asics/DL408_0146_SR_RT_GLB?$zoom$",
    };
    productos.push(nuevoProducto);
    divProductos.innerHTML = "";
    diagramarZapas();
  }
  
  diagramarZapas();
  loadCarrito();