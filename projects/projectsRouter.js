//Declaring Express, importing data persistence and helper methods, and importing Router + JSON functionality. Whew. 
const express = require("express");
const db = require("../data/helpers/projectModel");
const router = express.Router();
router.use(express.json());


// GET request to get everything on the project data using the projectModel.js helper methods
router.get("/", (req, res) => {
    db.get()
      .then(proj => {
        res.status(200).json({ proj });
      })
      .catch(err => {
        res.status(500).json({ error: "Oh dear. Seems there's no project in here. Awkward." });
      });
  });

  // GET/READ PROJECT by id
  router.get("/:id", validateProjectsId, (req, res) => {
    const id = req.params.id;
    db.get(id)
      .then(proj => {
        res.status(200).json(proj);
      })
      .catch(err => {
        res.status(500).json({ error: "Nothing to see here. Consider PUTting to this id and make it live." });
      });
  });

  // POST to project
  router.post("/", (req, res) => {
    const proj = req.body;
    db.insert(proj)
      .then(project => {
        res.status(200).json(project);
      })
      .catch(err => {
        res.status(500).json({ error: "Odds are that you did not formulate your object properly. Did you include a project_id, hm?" });
      });
  });

  // DELETE from project
  router.delete("/:id", validateProjectsId, (req, res) => {
    const id = req.params.id;
    db.remove(id)
      .then(project => {
        res.status(200).json(project);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: "Project data could not be evicted. This means war. " });
      });
  });

  // PUT data
  router.put("/:id", validateProjectsId, (req, res) => {
    const id = req.params.id;
    const changes = req.body;
    db.update(id, changes)
      .then(updated => {
        res.status(200).json(updated);
      })
      .catch(err => {
        res.status(500).json({ error: "Nothing has changed, he is the same." });
      });
  });

  

  router.get("/:id/actions", validateProjectsId, (req, res) => {
    const { id } = req.params;

    db.getProjectActions(id)
      .then(proj => {
        res.status(200).json(proj);
      })
      .catch(err => {
        res.status(500).json({ error: "Not functioning" });
      });
  });

  function validateProjectsId(req, res, next) {
    let id = req.params.id;

    db.get(id)
      .then(proj => {
        if (proj) {
          next();
        } else {
          res.status(400).json({ message: "We couldn't find anything mapped to that id" });
        }
      })
      .catch(err => {
        res.status(500).json({ error: "This id does not exist" });
      });
  }
module.exports = router;