import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: {
        type:String,
        required:true,
    },
    communityAvatar: {
        type:String,
        default: 'https://res.cloudinary.com/bbabystyle/image/upload/v1652738651/default/defaultCommunityAvatar_zdywvw.jpg'
    },
    cover: {
        type:String,
        default:'https://res.cloudinary.com/bbabystyle/image/upload/v1652738627/default/defaultCommunityCover_h9scxu.jpg'
    },
    communityAuthor: {
        type:String,
        required: true
    },
    description: {
        type:String,
        default: 'Add your description'
    },
    createdAt: {
        type:Date,
        required:true
    },
});

const Community = mongoose.model('Community', schema);

export default Community;