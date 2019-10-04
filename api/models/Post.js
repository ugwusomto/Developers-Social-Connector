//This is the post model
module.exports = {
  tableName: "post",
  attributes: {
    user: {
      model: "user"
    },
    text: {
      type: "string",
      required: true
    },
    name: {
      type: "string"
    },
    avatar: {
      type: "string"
    },
    likes: {
      //user id will be stored here
      type: "json"
    },
    comments: {
      type: "json"
      //  format == id:{
      //       text,name,avatar,date,userid
      //  }
    }
  }
};
