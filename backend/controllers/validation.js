var validator = require("validator");
var result = false;

module.exports = {
  ValidateComida: function (variable) {
    //Solo letras nombre
    //Solo numeros en cantidad
    if (
      validator.isAlpha(variable.nombre, ["es-ES"], { ignore: " " }) &&
      validator.isNumeric(variable.cantidad ? variable.cantidad.toString() : "")
    ) {
      result = true;
      return result;
    } else {
      result = false;
      return result;
    }
  },
  ValidateContrasena: function (variable) {
    if (validator.isStrongPassword(variable.contrasena)) {
      result = true;
      return result;
    } else {
      result = false;
      return result;
    }
  },
  ValidatePersona: function (variable) {
    //Solo letras nombre
    //Solo letras apellido
    //Correo con arroba, un punto y texto antes y despues de estos
    //Contrasena min 8 caracteres, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1
    if (
      validator.isAlpha(variable.nombre, ["es-ES"], { ignore: " " }) &&
      validator.isAlpha(variable.apellido, ["es-ES"], { ignore: " " }) &&
      validator.isEmail(variable.correo) &&
      validator.isStrongPassword(variable.contrasena)
    ) {
      result = true;
      return result;
    } else {
      result = false;
      return result;
    }
  },
  ValidateCombo: function (variable) {
    //Solo letras nombre
    //Solo numeros en precio
    if (
      validator.isAlpha(variable.nombre, ["es-ES"], { ignore: " " }) &&
      validator.isNumeric(variable.precio ? variable.precio.toString() : "")
    ) {
      result = true;
      return result;
    } else {
      result = false;
      return result;
    }
  },
  ValidateCuenta: function (variable) {
    //Solo numeros en propina
    //Solo numeros en total
    //Solo se acepta tipo de pago paypal y efectivo
    if (
      validator.isNumeric(
        variable.propina ? variable.propina.toString() : ""
      ) &&
      validator.isNumeric(variable.total ? variable.total.toString() : "") &&
      (validator.equals(variable.metodo, "paypal") ||
        validator.equals(variable.metodo, "efectivo"))
    ) {
      result = true;
      return result;
    } else {
      result = false;
      return result;
    }
  },
  ValidateMesa: function (variable) {
    //Solo numeros en sillas
    if (
      validator.isNumeric(variable.sillas ? variable.sillas.toString() : "")
    ) {
      result = true;
      return result;
    } else {
      result = false;
      return result;
    }
  },
  ValidatePedido: function (variable) {
    //Solo numeros en subtotal
    if (
      validator.isNumeric(variable.subtotal ? variable.subtotal.toString() : "")
    ) {
      result = true;
      return result;
    } else {
      result = false;
      return result;
    }
  },
  ValidatePromo: function (variable) {
    //Solo numeros en porcentaje
    //Solo fechas para la variable de tiempo
    if (
      validator.isNumeric(
        variable.porcentaje ? variable.porcentaje.toString() : ""
      ) &&
      validator.isDate(variable.tiempo)
    ) {
      //isBefore(str [, date])
      result = true;
      return result;
    } else {
      result = false;
      return result;
    }
  },
  ValidatePromo: function (variable) {
    //Solo numeros en porcentaje
    //Solo fechas para la variable de tiempo
    if (
      validator.isNumeric(
        variable.porcentaje ? variable.porcentaje.toString() : ""
      ) &&
      validator.isDate(variable.tiempo)
    ) {
      //isBefore(str [, date])
      result = true;
      return result;
    } else {
      result = false;
      return result;
    }
  },
  ValidateResena: function (variable) {
    //Solo numeros en calificacion
    //Solo las opciones de empleado y sucursal en onModel
    if (
      validator.isNumeric(
        variable.calificacion ? variable.calificacion.toString() : ""
      ) &&
      (validator.equals(variable.onModel, "empleado") ||
        validator.equals(variable.onModel, "sucursal"))
    ) {
      result = true;
      return result;
    } else {
      result = false;
      return result;
    }
  },
  ValidateReservacion: function (variable) {
    //Solo numeros en no_personas
    //Solo las opciones de empleado y sucursal en onModel
    if (
      validator.isNumeric(
        variable.no_personas ? variable.no_personas.toString() : ""
      ) &&
      validator.isDate(variable.fecha)
    ) {
      result = true;
      return result;
    } else {
      result = false;
      return result;
    }
  },
  ValidateSucursal: function (variable) {
    //Solo numeros en no_personas
    //Solo las opciones de empleado y sucursal en onModel
    if (
      validator.isAlpha(variable.nombre, ["es-ES"], { ignore: " " }) &&
      validator.isNumeric(variable.telefono ? variable.telefono.toString() : "")
    ) {
      result = true;
      return result;
    } else {
      result = false;
      return result;
    }
  },
};
