const Clarifai=require('clarifai');

const app=new Clarifai.App({
    apiKey: process.env.API_KEY
  });

  const handleApiCall=(req,res)=>{
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data=>{
        res.json(data);
    })
    .catch(err=>res.status(400).json('Unable to work with API'));
  }
  
const handleImage=(req,res,db)=>{
    const {id}=req.body;
    db('users').where('id','=',id)
    .increment('entries',1)
    .then(updated =>{
        db('users').where('id','=',id).select('entries')
        .then(updatedtodo=>{
            return res.json(updatedtodo[0].entries);
        })
    })
    .catch(err => res.status(400).json('unable to get entries'));
}

module.exports={
    handleImage:handleImage,
    handleApiCall
}
