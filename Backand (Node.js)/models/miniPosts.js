let mongoose = require(`mongoose`);

let Schema = mongoose.Schema;

let Post = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  createUserId: {
    type: Object,
    required: true
  },
  createTime: {
    type: String,
    required: true
  },
  srcCover: {
    type: String,
    required: true
  },
  authorName: {
    type: String,
    required: true
  },
  srcAuthorAvatar: {
    ref: `User`,
    type: Schema.Types.ObjectId
  },
  comments: [
    {
      createTime:{
        type: String,
        required: true
      },
      createAuthorName: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      authorAvatarSrc: {
        ref: `User`,
        type: Schema.Types.ObjectId
      },
      createUserId: {
        type: String,
        required: true
      }
    }
  ]
})

module.exports = mongoose.model(`Posts`, Post)