const express = require("express");
const router = express.Router();
const multer = require("multer");

// Multer setup
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./images");
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});

const upload = multer({ storage: storage }).single('image');

// Routes
router.get("/", async (req, res) => {
    try {
        const projects = await req.app.locals.coll.find().toArray();
        res.render("projects", { title: "Projects", projects: projects });
    } catch (err) {
        res.json({ message: err.message, type: "danger" });
    }
});

router.get("/add", (req, res) => {
    res.render("add_project", { title: "Add a Project" });
});

router.post("/add", upload, async (req, res) => {
    const { name, description, active } = req.body;
    const booleanValue = active === "true";

    const project = {
        name: name,
        description: description,
        logo: req.file.filename,
        active: booleanValue
    };

    try {
        await req.app.locals.coll.insertOne(project);
        req.session.message = { type: "success", message: "Project added successfully" };
        res.redirect("/");
    } catch (err) {
        res.json({ message: err.message, type: "danger" });
    }
});

module.exports = router;
