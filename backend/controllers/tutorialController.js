import { UserProgress } from "../../archives/tutorials.js";
import { Tutorial } from "../models/Tutorial.js";

export class tutorialController {
  static async list(req, res) {
    const {skillLevel, contentType} = req.query;
    const query = {};

    if(skillLevel){
      query.skillLevel = skillLevel;
    }
    if(contentType){
      query.contentType = contentType;
    }

    const tutorials = await Tutorial.find(query).sort('order').populate('prerequisites', 'title');

    res.status(201).json(tutorials);
  }

  static async getById(req, res) {
    const tutorial = await Tutorial.findById(req.params.id).populate('prerequisites', 'title');

    if(!tutorial){
      return res.status(401).json({message: 'Tutorial Not Found'});
    }

    res.json(tutorial);
  }

  static async checkPrerequisites(req, res) {
    const tutorial = await Tutorial.findById(req.params.id).populate('prerequisites');

    if(!tutorial){
      return res.status(404).json({message: 'Tutorial Not found'});
    }

    const prerequisiteIds = tutorial.prerequisites.map(p=>p._id);
    const completedPrereqs = await UserProgress.find({
      user: req.user._id,
      tutorial: {$in: prerequisiteIds},
      completed: true
    });

    const missingPrereqs = tutorial.prerequisites.filter(prereq =>
      !completedPrereqs.some(cp=>cp.tutorial.equals(prereq._id))
    );

    res.status(201).json({
      canStart: missingPrereqs.length === 0,
      missingPrerequisites: missingPrereqs.map(p => ({
        id: p._id,
        title: p.title
      }))
    });
  }

  
}