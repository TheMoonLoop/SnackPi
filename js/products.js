const products = [
    {
        id: "cho",
        name: "Chocoflan",
        price: 39.99,
        discount: "-13%",
        image: "img/chocoflan.jpg",
        alt: "Chocoflan con descuento del 13%",
        stars: 4,
        category: "postre"
    },
    {
        id: "na",
        name: "Nachos",
        price: 34.99,
        discount: "-22%",
        image: "img/papas.jpg",
        alt: "Nachos con descuento del 22%",
        stars: 3,
        category: "salado"
    },
    {
        id: "heor",
        name: "Helado de Oreo",
        price: 34.99,
        image: "img/HeladoOreo.jpg",
        alt: "Helado de Oreo en vaso",
        stars: 5,
        category: "helados"
    },
    {
        id: "frcr",
        name: "Fresas con crema",
        price: 49.99,
        image: "img/Fresas-crema.jpg",
        alt: "Vaso con capas de fresas y crema intercaladas",
        stars: 4,
        category: "postre"
    },
    {
        id: "o2c",
        name: "Agua chica",
        price: 10.00,
        discount: 13,
        image: "img/AguaCh.jpg",
        alt: "Botella de agua chica, 500ml",
        stars: 3,
        category: "bebidas"
    },
    {
        id: "pe",
        name: "Pepsi",
        price: 19.99,
        image: "img/pepsi.jpg",
        alt: "Botella de Pepsi",
        stars: 3,
        category: "bebidas"
    },
    {
        id: "cob",
        name: "Coca cola",
        price: 23.99,
        image: "img/cocacola.jpg",
        alt: "Botella de Coca Cola, 500ml",
        stars: 5,
        category: "bebidas"
    },
    {
        id: "ar",
        name: "Arizona",
        price: 25.60,
        image: "img/arizona.jpg",
        alt: "Lata de Arizona",
        stars: 4,
        category: "bebidas"
    },
    {
        id: "7u",
        name: "Seven Up",
        price: 21.99,
        image: "img/sevenup.jpg",
        alt: "Refresco Seven Up",
        stars: 4,
        category: "bebidas"
    },
    {
        id: "be",
        name: "Bebere",
        price: 19.99,
        image: "img/bebere.jpg",
        alt: "Jugo Bebere",
        stars: 3,
        category: "bebidas"
    },
    {
        id: "sh",
        name: "Shasta",
        price: 23.99,
        image: "img/shasta.jpg",
        alt: "Refresco Shasta",
        stars: 5,
        category: "bebidas"
    },
    {
        id: "man",
        name: "Manzanita",
        price: 19.60,
        image: "img/manzanita.jpg",
        alt: "Refresco Manzanita",
        stars: 4,
        category: "bebidas"
    },
    {
        id: "o2g",
        name: "Agua Grande",
        price: 15.00,
        image: "img/AguaGrande.jpg",
        alt: "Botella de Agua Grande, 1L",
        stars: 4,
        category: "bebidas"
    },
    {
        id: "col",
        name: "Coca Cola de lata",
        price: 20.00,
        image: "img/CocaColaLata.jpg",
        alt: "Coca Cola de lata, 355ml",
        stars: 4,
        category: "bebidas"
    },
    {
        id: "nco",
        name: "Nieve Cono de Oblea",
        price: 16.00,
        image: "img/NieveConoOblea.jpg",
        alt: "Nieve de vainilla, chocolate y fresa con cono de oblea",
        stars: 4,
        category: "helados"
    },
    {
        id: "ncg",
        name: "Nieve Cono de Galleta",
        price: 18.00,
        image: "img/NieveConoGalleta.jpg",
        alt: "Nieve de vainilla y chocolate con cono de galleta",
        stars: 4,
        category: "helados"
    },
    {
        id: "ncd",
        name: "Nieve Cono Doble",
        price: 22.00,
        image: "img/NieveConoDoble.jpg",
        alt: "Nieve de vainilla con el doble de nieve",
        stars: 4,
        category: "helados"
    },
    {
        id: "suc",
        name: "Sundae Chico",
        price: 16.00,
        image: "img/SundaeChico.jpg",
        alt: "Nieves en vaso chico con topping de jarabe",
        stars: 3,
        category: "helados"
    },
    {
        id: "sum",
        name: "Sunae Mediano",
        price: 26.00,
        image: "img/SundaeMediano.jpg",
        alt: "Nieves en vaso mediano con topping de jarabe",
        stars: 4,
        category: "helados"
    },
    {
        id: "sug",
        name: "Sundae Grande",
        price: 50.00,
        image: "img/SundaeGrande.jpg",
        alt: "Nieves en vaso grande con topping de jarabe",
        stars: 5,
        category: "helados"
    },
    {
        id: "frcn",
        name: "Fresas con Crema y Nieve",
        price: 50.00,
        image: "img/Fresas-CreamayNieve.jpg",
        alt: "Vaso con capas de fresas, crema y nieve intercaladas",
        stars: 5,
        category: "helados"
    },
    {
        id: "che",
        name: "Cheesecake de Zarzamora",
        price: 45.00,
        image: "img/Cheescake.jpg",
        alt: "Rebanada de Cheescake de Zarzamora",
        stars: 4,
        category: "postre"
    },
    {
        id: "pcho",
        name: "Pastel de Chocolate",
        price: 50.00,
        image: "img/PastelChocolate.jpg",
        alt: "Rebanada de Pastel de Chocolate",
        stars: 3,
        category: "postre"
    },
    {
        id: "tc",
        name: "Tarta de Cereza",
        price: 50.00,
        image: "img/TartaCereza.jpg",
        alt: "Rebanada de Tarta de Cereza",
        stars: 4,
        category: "postre"
    },
    {
        id: "elc",
        name: "Elote Chico",
        price: 24.99,
        image: "img/elote.jpg",
        alt: "Elote Chico",
        stars: 3,
        category: "salado"
    },
    {
        id: "mar",
        name: "Maruchan",
        price: 24.99,
        image: "img/maruchan.jpg",
        alt: "Maruchan",
        stars: 3,
        category: "salado"
    },
    {
        id: "pa",
        name: "Palomitas",
        price: 12.99,
        image: "img/palomitas.jpg",
        alt: "Palomitas",
        stars: 3,
        category: "salado"
    },
    {
        id: "che",
        name: "Cheetos C/Queso",
        price: 35.90,
        image: "img/cheetos.jpg",
        alt: "Cheetos con queso",
        stars: 3,
        category: "salado"
    }
];
