import express from 'express';
import { getCareers, getCareerRecommendations, calculateSkillGap, generateRoadmap } from '../controllers/careerController.js';

const router = express.Router();

router.get('/careers', getCareers);
router.post('/recommendations', getCareerRecommendations);
router.post('/skill-gap', calculateSkillGap);
router.post('/roadmap', generateRoadmap);

export default router;