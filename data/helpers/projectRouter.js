const express = require("express");

const Projects = require("./projectModel");

const router = express.Router();
// /api/projects
router.get("/", (req, res) => {
    Projects.get()
        .then(projs => {
            res.status(200).json(projs);
        })
        .catch(err => {
            res.status(500).json({ error: "something went wrong" });
        })
});

router.get("/:id", (req, res) => {
    Projects.get(req.params.id)
        .then(projs => {
            if (!projs) {
                res.status(404).json({ error: "id does not exist" });
            } else {
                res.status(200).json(projs[0]);
            }
        })
        .catch(err => {
            res.status(500).json({ error: "something went wrong" });
        })
});

router.post("/", (req, res) => {
    if (!req.body.name || !req.body.description) {
        res.status(400).json({ error: "missing name or description "});
    } else {
        Projects.insert({ ...req.body, completed: false })
            .then(proj => {
                res.status(201).json(proj);
            })
            .catch(err => {
                res.status(500).json({ error: "something went wrong" });
            })
    }
});

router.put("/:id", (req, res) => {
    Projects.update(req.params.id, req.body)
        .then(proj => {
            if (proj === null) {
                res.status(404).json({ error: "id does not exist" });
            } else {
                res.status(200).json(proj);
            }
        })
        .catch(err => {
            res.status(500).json({ error: "something went wrong" });
        })
});

router.delete("/:id", (req, res) => {
    Projects.get(req.params.id)
        .then(proj => {
            if (!proj) {
                res.status(404).json({ error: "id does not exist" });
            } else {
                Projects.remove(req.params.id)
                    .then(del => {
                        res.status(202).json({ message: "project removed" });
                    })
                    .catch(err => {
                        res.status(500).json({ error: "something went wrong." });
                    })
            }
        })
        .catch(err => {
            res.status(500).json({ error: "something went wrong" });
        })
});

module.exports = router;