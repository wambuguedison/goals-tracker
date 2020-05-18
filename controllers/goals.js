const db = require('../models/db');
const goals = db.goals;

exports.view_all = (req, res, next) => {
  goals.find({}, (err, docs) => {
    if(err){
      console.log(err)
    }
    let object = {
      goals: docs,
      template: 'home',
      goals_present: false
    }
    if (docs.length > 0) {
      object.goals_present = true;
    }
    res.render('index', object);
  });
}

exports.view_details = (req, res, next) => {
  let id = req.params.id.replace(':', '');
  goals.find({ _id: id }, (err, doc) => {
    if(err) {
      res.send(err)
    }
    res.send(doc)
  });
}

exports.add_page = (req, res, next) => {
  let add = {
    add_new: 'added',
    template: 'add'
  }
  res.render('add', add)
}

exports.add_goal = (req, res, next) => {
  const goal = {
    title: req.body.title,
    description: req.body.description,
    imageUrl: '',
    successes: 0,
    deleted: 0,
    goal: true,
    created_at: new Date().toDateString()
  };
  goals.insert(goal,(err, doc) => {
    if(err){
      console.error(err)
    }
    let added = {
      title: doc.title,
      description: doc.description,
      id: doc._id,
      add: 'added',
      template: 'added'
    }
    res.render('add', added)
  })
}

exports.edit = (req, res, next) => {
  let id = req.params.id.replace(':', '');
  goals.find({ _id: id }, (err, doc) => {
    if(err) {
      console.log(err)
    }
    let objects = {
      goal: doc
    }
    res.render('update', objects)
  });
}

exports.update = (req, res, next) => {
  const goal = {
    title: req.body.title,
    description: req.body.description,
    imageUrl: '',
    successes: 0,
    deleted: 0
  };
  goals.update({_id: req.body.id}, goal, {}, (err, numReplaced) => {
    if(err){
      res.status(400).json({
        error: err
      });
    }
    let update = {
      title: goal.title,
      update: 'updated',
      template: 'edit'
    }
    res.render('update', update);
  });
}

exports.delete_page = (req, res, next) => {
  let id = req.params.id.replace(':', '');
  goals.find({ _id: id }, (err, doc) => {
    if(err) {
      console.log(err)
    }
    let delete_object = {
      del_goal: doc,
      template: 'delete'
    }
    res.render('update', delete_object);
  });
}

exports.delete_goal = (req, res, next) => {
  let id = req.params.id.replace(':', '');
  goals.remove({ _id: id }, {}, (err, numRemoved) => {
    let delete_goal = {
      delete: 'deleted',
      template: 'deleted'
    }
    res.render('update', delete_goal);
  });
}

exports.delete_all = (req, res, next) => {
  goals.remove({}, { multi: true }, (err, numRemoved) => {
    if(err) {
      console.log(err)
    }
    res.send(String(numRemoved));
  });
}
