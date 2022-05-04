const { ref, uploadBytes, getDownloadURL } = require("firebase/storage");
const { Storage } = require("./firebase/Storage");

/**
 * Transforma adecuadamente cada propiedad del objeto "body" a valor JSON.
 * @param {*} body Objeto Comida
 * @returns Objeto JSON de Comida
 */
exports.comidaBodyParse = (body) => {
  const parsedBody = {};
  parsedBody.precio = JSON.parse(body.precio);
  parsedBody.cantidad = JSON.parse(body.cantidad);
  parsedBody.categoria = JSON.parse(body.categoria);
  parsedBody.baja = JSON.parse(body.baja);
  parsedBody.nombre = JSON.parse(body.nombre);
  parsedBody.descripcion = JSON.parse(body.descripcion);

  return parsedBody;
};

exports.sucursalBodyParse = (body) => {
  const parsedBody = {};
  parsedBody.nombre = JSON.parse(body.nombre);
  parsedBody.direccion = JSON.parse(body.direccion);
  parsedBody.telefono = JSON.parse(body.telefono);
  parsedBody.calificacion = JSON.parse(body.calificacion);
  parsedBody.baja = JSON.parse(body.baja);

  return parsedBody;
};

/**
 *
 * @param {Array} imagenes Arreglo de imagenes.
 * @param {String} raiz Carpeta raíz.
 * @param {String} nombreObjeto Carpeta hijo.
 * @return {Array} Arreglo con las urls de la imagenes.
 */
exports.uploadImages = async (imagenes, raiz, nombreObjeto) => {
  var urls = [];

  for (let i = 0; i < imagenes.length; i++) {
    const comidaRef = ref(Storage, `${raiz}/${nombreObjeto}/image${i + 1}.jpg`);

    const snapshot = await uploadBytes(comidaRef, imagenes[i].data, {
      contentType: imagenes[i].mimetype,
    });

    let url = await getDownloadURL(snapshot.ref);
    urls.push(url);
  }

  return urls;
};
