const express = require("express")
const router = express.Router()
const { handleCareerQuery, listCareers, getCareer, addCareer, editCareer, removeCareer } = require("../controllers/careerController")

router.post("/career", handleCareerQuery)
router.get("/careers", listCareers)
router.get("/careers/:id", getCareer)
router.post("/careers", addCareer)
router.put("/careers/:id", editCareer)
router.delete("/careers/:id", removeCareer)

module.exports = router
