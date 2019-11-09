
let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let noteSchema = new Schema ({

    _headlineId:{
        type: String,
        required: Schema.Types.ObjectId,
        ref:"Headline",
    },
    date: String,
    noteText: String
});

let Note = mongoose.model("Headline", noteSchema);

module.exports = Note;