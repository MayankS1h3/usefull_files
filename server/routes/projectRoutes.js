const express = require("express");
const projectsRouter = express.Router();
const Project = require("../db/schema/projectSchema");
const { sendemail, ResetPassword } = require("./../controllers/user");
const { HomePageProjects, GetProjectByID } = require("./../controllers/public");

// Routes
/**
 * @swagger
 * /getprojectsbyskill:
 *  get:
 *    description: Get a list of projects by skill on the basis of query
 *    responses:
 *      '200':
 *        description: Response Successful
 *      '404':
 *        description: Not found.
 *      '500':
 *        description: Internal server error
 */
projectsRouter.get("/getprojectsbyskill", async (req, res) => {
  var query = req.query.q;

  try {
    const result = await Project.find({
      skills: { $elemMatch: { $regex: `^${query}$`, $options: "i" } }
    });

    if (result) {
      return res.status(200).json(result);
    } else {
      return res.status(404).json({ message: "Projects Not found" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

/**
 * @swagger
 * /getprojectsbyname:
 *  get:
 *    description: Get a list of projects by name on the basis of query 
 *    responses:
 *      '200':
 *        description: Response Successful
 *      '404':
 *        description: Not found.
 *      '500':
 *        description: Internal server error
 */
projectsRouter.get("/getprojectsbyname", async (req, res) => {
  var query = req.query.q;
  query = query.toLowerCase();

  try {
    const result = await Project.find({
      name: { $regex: query, $options: "i" }
    });

    if (result) {
      return res.status(200).json(result);
    } else {
      return res.status(404).json({ message: "Projects Not found" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Routes for password and project by id
projectsRouter.post("/send-forgetpassword-email", sendemail);
projectsRouter.post("/reset-password", ResetPassword);
projectsRouter.post("/project-by-id", GetProjectByID);

module.exports = projectsRouter;