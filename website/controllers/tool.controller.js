const db=require("../models");
const Tool =require("../models").Tool;

const Op=db.Sequelize.Op;

exports.create=(req, res) => {
 
    if (!req.body.toolName || !req.body.toolsIn ||!req.body.toolsTotal) {
        res.status(400).send({
            message: "Missing at least one parameter"
        });
        return;
    }
    const tool={
        toolName: req.body.toolName,
        toolsIn: req.body.toolsIn,
        toolsTotal: req.body.toolsTotal


    };

    Tool.create(tool)
    .then(data=>{
        res.send(data);
    })
    .catch(err=>{
        res.status(500).send({
            message: 
            err.message || "Noe feil skjedde ved å opprette student"
        });
    });
};
exports.findAll = (req, res) => {
        Tool.findAll()
          .then(data => {
            res.send(data);
          })
          .catch(err => {
            res.status(500).send({
              message:
                err.message || "Noe feil skjedde ved å finne studentene."
            });
          });
      
};
exports.findByName = (req, res) => {
  const toolName = req.query.toolName;
  var condition = toolName ? { toolName: { [Op.iLike]: `%${toolName}%` } } : null;
      Tool.findAll({where: condition})
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Noe feil skjedde ved å finne studentene."
          });
        });
    
};
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Tool.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Kan ikke finne student med id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Feil med å finne student med id=" + id
        });
      });
  };

exports.update = (req, res) => {
    const id = req.params.id;

  Tool.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Tools was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Tool with id=${id}. Maybe Tutorial was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Tools with id=" + id
      });
    });
};
function updateToolNumber(id,n){
  
}
exports.delete = (req, res) => {
    const id = req.params.id;

    Tool.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Tools was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Tool with id=${id}. Maybe student was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Tool with id=" + id
        });
      });
};
exports.deleteAll = (req, res) => {
  
};