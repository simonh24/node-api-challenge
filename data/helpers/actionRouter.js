const express = require("express");

const Actions = require("./actionModel");
const Projects = require("./projectModel");

const router = express.Router();
// /api/actions
router.get("/", (req, res) => {
    Actions.get()
        .then(acts => {
            res.status(200).json(acts);
        })
        .catch(err => {
            res.status(500).json({ error: "something went wrong" });
        })
});

router.get("/:id", (req, res) => {
    Actions.get(req.params.id)
        .then(act => {
            if (!act) {
                res.status(404).json({ error: "id does not exist" });
            } else {
                res.status(200).json(act);
            }
        })
        .catch(err => {
            res.status(500).json({ error: "something went wrong" });
        })
});

router.post("/:id", (req, res) => {
    Projects.get(req.params.id)
        .then(proj => {
            if (!proj) {
                res.status(404).json({ error: "project id does not exist" });
            } else if (!req.body.description || req.body.description.length > 128 || !req.body.notes) {
                res.status(400).json({ error: "missing fields or desription too long" });
            } else {
                Actions.insert({ ...req.body, completed: false, project_id: req.params.id})
                    .then(act => {
                        res.status(201).json(act);
                    })
                    .catch(err => {
                        res.status(500).json({ error: "something went wrong "});
                    })
            }
        })
        .catch(err => {
            res.status(500).json({ error: "something went wrong" });
        })
});

router.put("/:id", (req, res) => {
    Actions.update(req.params.id, req.body)
        .then(act => {
            if (act === null) {
                res.status(404).json({ error: "id does not exist" });
            } else {
                res.status(200).json(act);
            }
        })
        .catch(err => {
            console.log(req.params.id);
            console.log(req.body);
            console.log(err);
            res.status(500).json({ error: "something went wrong" });
        })
});

router.delete("/:id", (req, res) => {
    Actions.get(req.params.id)
        .then(act => {
            if (!act) {
                res.status(404).json({ error: "id does not exist" });
            } else {
                Actions.remove(req.params.id)
                    .then(del => {
                        res.status(202).json({ message: "action removed" });
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