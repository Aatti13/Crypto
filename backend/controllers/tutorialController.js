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
      return res.status(401).json()
    }
  }
}