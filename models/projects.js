const { MongoClient } = require("mongodb");

const projectSchema = new MongoClient.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    logo: {
        type: String,
        required: true
    },
    active: {
        //check for active, unchecked for inactive
        type: Boolean,
        required: true,
        default: true
    }
});

module.exports = mongoose.model("Project", projectSchema);