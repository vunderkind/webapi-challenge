const express = require("express");

const db = require("../data/helpers/actionModel");

const router = express.Router();

router.use(express.json());

router.get("/", (req, res) => {
    db.get()
      .then(actions => {
        res.status(200).json(actions);
      })
      .catch(err => {
        res.status(500).json({ error: "Something went wrong. Our server is live, so it's probably you, not us." });
      });
  });

  // GET actions by ID
  router.get("/:id", (req, res) => {
    const id = req.params.id;
    db.get(id)
      .then(proj => {
        res.status(200).json(proj);
      })
      .catch(err => {
        res.status(500).json({ error: "Oops. There isn't anything on this id, or your id format is just awful. Fix up, okay? 🤷" });
      });
  });

  // POST TO PROJECTS
  router.post("/", validateActionsId, (req, res) => {
    const action = req.body;
    db.insert(action)
      .then(actions => {
        res.status(200).json(actions);
      })
      .catch(err => {
        res.status(500).json({ error: "New action could not be posted" });
      });
  });

  // DELETE ACTIONS
  router.delete("/:id", (req, res) => {
    const id = req.params.id;
    db.remove(id)
      .then(actions => {
        res.status(200).json(actions);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: "Failed to delete that action . Too bad!" });
      });
  });

  // UPDATE action via PUT request
  router.put("/:id", (req, res) => {
    const id = req.params.id;
    const changes = req.body;
    db.update(id, changes)
      .then(updated => {
        res.status(200).json(updated);
      })
      .catch(err => {
        res.status(500).json({ error: "Something went horribly wrong, and we did not update the thing you wanted updated" });
      });
  });

  function validateActionsId(req, res, next) {
    let id = req.params.id;

    db.get(id)
      .then(actions => {
        if (actions) {
          next();
        } else {
          res.status(400).json({ message: "Doesn't exist" });
        }
      })
      .catch(err => {
        res.status(500).json({ error: "Nope" });
      });
  }
module.exports = router; 
