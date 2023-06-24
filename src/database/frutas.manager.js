const fs = require("fs");
const path = require("path");

const ruta = path.join(__dirname, "frutas.json");

function guardarFruta(contenido) {
    return new Promise((resolve, reject) => {
        fs.writeFileSync(
            ruta,
            JSON.stringify(contenido, null, "\t"),
            "utf8",
            (error) => {
                if (error) reject(new Error("Error. No se pudo escribir"));
            }
        );
        resolve(true);
    });
}

function leerFrutas() {
    return new Promise((resolve, reject) => {
        fs.readFile(ruta, "utf8", (error, result) => {
            if (error) reject(new Error("Error. No se pudo escribir"));
            resolve(JSON.parse(result));
        });
    });
}

function generarId(frutas) {
    let mayorId = 0;
    frutas.forEach((fruta) => {
        if (fruta.id > mayorId) {
            mayorId = fruta.id;
        }
    });
    return mayorId + 1;
}

async function findAll() {
    const frutas = await leerFrutas();
    return frutas;
}

async function findOneById(id) {
    if (!id) {
        throw new Error("Error!  ID indefinido");
    }
    const frutas = await leerFrutas();
    const fruta = frutas.find((elemento) => elemento.id === Number(id));
    if (!fruta) {
        throw new Error("Error!  ID no corresponde a un fruta");
    }
    return fruta;
}

async function create(fruta) {
    if (!fruta.tipo || !fruta.precio || !fruta.stock) {
        throw new Error("Error! Datos incompletos");
    }
    const frutas = await leerFrutas();
    const frutaConId = { id: generarId(frutas), ...fruta };
    frutas.push(frutaConId);
    await guardarFruta(frutas);
    return frutaConId;
}

async function update(fruta) {
    if (!fruta.id || !fruta.tipo || !fruta.precio || !fruta.stock) {
        throw new Error("Error! Datos incompletos");
    }
    const frutas = await leerFrutas();
    const index = frutas.findIndex((elemento) => elemento.id === Number(fruta.id));
    if (!fruta) {
        throw new Error("Error!  ID no corresponde a un fruta");
    }
    frutas[index] = fruta;
    await guardarFruta(frutas);
    return fruta;
}

async function destroy(id) {
    if (!id) throw new Error("Error! Id Indefinido");
    const frutas = await leerFrutas();
    const fruta = frutas.find((elemento) => elemento.id === Number(id));
    const index = frutas.findIndex((elemento) => elemento.id === Number(id));
    if (!index) throw new Error("Error!  ID no corresponde a un fruta");

    frutas.splice(index, 1);
    await guardarFruta(frutas);
    return fruta;
}

module.exports = {
    findAll,
    findOneById,
    create,
    update,
    destroy
};