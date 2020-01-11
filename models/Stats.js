const { model, Schema } = require("mongoose");

const statsSchema = new Schema({
  link: {
    ref: "links",
    type: Schema.Types.ObjectId
  },
  clicks: [{ date: Date }]
});

module.exports = model("Stats", statsSchema);
