// This is the model for user profile

module.exports = {
  tableName: "profile",
  attributes: {
    user: {
      model: "user",
      unique: true
    },
    handle: {
      type: "string",
      required: true
    },
    status: {
      type: "string",
      required: true
    },
    skills: {
      type: "string",
      required: true
    },
    company: {
      type: "string"
    },
    location: {
      type: "string"
    },
    bio: {
      type: "string"
    },
    githubusername: {
      type: "string"
    },

    experience: {
      type: "json"
    },
    education: {
      type: "json"
    },
    social: {
      type: "json"
    },
    website: {
      type: "string"
    }
  }
};

// experience:[
//     {
//         title:{
//             type:"string",
//             required:true
//         },
//         company:{
//             type:"string",
//             required:true
//         },
//         location:{
//           type:"string"
//       },
//       from:{
//           type:"string",//date
//           required:true
//       },
//       to:{
//           type:"string"//date
//       },
//       current:{
//           type:"string",//date
//           required:true
//       },
//       description:{
//           type:"string"
//       }

//     }
// ],
// education:[
//   {
//       school:{
//           type:"string",
//           required:true
//       },
//       degree:{
//           type:"string",
//           required:true
//       },
//       fieldofstudy:{
//         type:"string"
//     },
//     from:{
//         type:"string",//date
//         required:true
//     },
//     to:{
//         type:"string"//date
//     },
//     current:{
//         type:"string",//date
//         required:true
//     },
//     description:{
//         type:"string"
//     }

//   }
// ],
// social:{
//   youtube:{
//       type:"string"
//   },
//   twitter:{
//       type:"string"
//   },
//   facebook:{
//       type:"string"
//   },
//   linkedIn:{
//       type:"string"
//   },
//   Instagram:{
//       type:"string"
//   }
// }
