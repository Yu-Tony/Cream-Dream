const Promo = require("../models/PromocionSchema");
const CONST = require("../constants");
const { ValidatePromo } = require("./validation");

exports.promo_create = async(req,res)=>{

  const{ body }=req;

  const result = ValidatePromo(body);

  if (result) {
    let newPromo = new Promo(body);

    await newPromo
    .save()
    .then((newObject)=>
    {
        console.log(CONST.created_success, newObject);

        res.send({
          success: true,
          message: `${newObject.nombre} ${CONST.created_success}`,
          data: newObject,
        });
    })
    .catch((err)=> 
    {
        console.error(
            `${CONST.error.toUpperCase()}: ${err.message} in promo_create`
          );
    
          res.send({
            success: false,
            message: err.message,
          });
    });
  }else {
    console.log(`${CONST.valid_info.toUpperCase()}: in promo_create`);
    res.send({
      success: false,
      message: CONST.valid_info,
    });
  }
}

exports.promo_getall = async(req,res)=>{
  const data = await Promo.find();

  console.log(`${CONST.data_found.toUpperCase()} promo_getall`);
  res.send({
    success: true,
    message: `promociones ${CONST.data_found}`,
    data,
  });
}

exports.promo_delete = async(req,res)=>{
    const {id} = req.params;

    try {
        const promodb = await Promo.findById(id);
    
        if (promodb) {
          await Promo.findByIdAndDelete(id);
    
          console.log(`${promodb.nombre} ${CONST.deleted_success}`);
          res.send({
            success: true,
            message: `promoción ${CONST.deleted_success}`,
          });
        } else {
          console.error(`${CONST.not_found.toUpperCase()}: in promo_delete`);
          res.send({
            success: false,
            message: `promoción ${CONST.not_found}`,
          });
        }
      } catch (err) {
        console.error(
          `${CONST.error.toUpperCase()}: ${err.message} in promo_delete`
        );
        res.send({
          success: false,
          message: err.message,
        });
      }
}

