
    module.exports = function (app) {
        const modelName = "payment_terms";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            name: { type:  String , required: true, comment: "Name, p, false, true, true, true, true, true, true, , , , ," },
description: { type:  String , required: true, comment: "Description, p, false, true, true, true, true, true, true, , , , ," },
dueDays: { type:  String , required: true, comment: "Due Days, p, false, true, true, true, true, true, true, , , , ," },
paymentTermID: { type:  String , maxLength: 150, index: true, trim: true, comment: "Payment Term ID, p, false, true, true, true, true, true, true, , , , ," },
earlyPaymentDiscount: { type:  String , required: true, comment: "Early Payment Discount, p, false, true, true, true, true, true, true, , , , ," },
latePenalty: { type:  String , required: true, comment: "Late Penalty, p, false, true, true, true, true, true, true, , , , ," },

            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true }
          },
          {
            timestamps: true
        });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };