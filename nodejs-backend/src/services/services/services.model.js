
    module.exports = function (app) {
        const modelName = "services";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            serviceID: { type:  String , required: true, comment: "Service ID, p, false, true, true, true, true, true, true, , , , ," },
name: { type:  String , maxLength: 150, index: true, trim: true, comment: "Name, p, false, true, true, true, true, true, true, , , , ," },
description: { type:  String , required: true, comment: "Description, p, false, true, true, true, true, true, true, , , , ," },
units: { type:  String , required: true, comment: "Units, p, false, true, true, true, true, true, true, , , , ," },
serviceType: { type:  String , required: true, comment: "ServiceType, p, false, true, true, true, true, true, true, , , , ," },
price: { type:  String , required: true, comment: "Price, p, false, true, true, true, true, true, true, , , , ," },

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