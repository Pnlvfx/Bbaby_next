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
    acceptFollowers: {
        type: Boolean,
        default: true
    },
    subscribers: {
        type: Number,
        default: 0,
    },
    user_is_moderator: {
        type: Boolean,
        default: false
    },
    user_is_banned: {
        type: Boolean,
        default: false
    },
    user_is_contributor: {
        type: Boolean,
        default: false
    },
    user_is_subscriber: {
        type: Boolean,
        default: false
    },
    user_is_banned: {
        type: Boolean,
        default: false
    },
    icon: { // SHOULD BE THE SMALL COMMUNITYAVATAR FOR SHOWING ON POSTS
        height: {
            type: Number
        },
        width: {
            type: Number
        },
        url: {
            type: String
        },
    }
});

const Community = mongoose.model('Community', schema);

export default Community;