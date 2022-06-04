import Post from '../../models/Post.js'
import Comment from '../../models/Comment.js'
import {getUserFromToken} from '../user/UserFunctions.js'
import cloudinary from '../../utils/cloudinary.js';
import 'dotenv/config';
import User from '../../models/User.js';

const PostCtrl = {
    getPosts: async (req, res) => {
        const {token} = req.cookies
            if(token) {
                const user = await getUserFromToken(token)
                const userUpVote = await Post.find({_id : {'$in': user.upVotes}}).updateMany({"liked" : "true"})
            }
        const {search, community, limit, skip} = await req.query;
        let filters = search ? {body: {regex: '.*'+search+'.*'}} : {}

        if (community) {
            filters.community = community
        }
        const posts = await Post.find(filters).sort({createdAt: -1}).limit(limit).skip(skip)
        res.json(posts)
    },
    getPost: async (req,res) => {
            const {id} = req.params
            const post = await Post.findById(id)
            res.json(post);
    },
    addImage: async (req,res) => {
        try {
            const fileStr = req.body.data
            const uploadedResponse = await cloudinary.uploader.upload(fileStr,{
                upload_preset: 'bbaby_avatar'
            })
            res.json({url:uploadedResponse.secure_url})
        } catch (err) {
            res.status(500).json({err:'something went wrong'})
        }
    },
    createPost: async (req, res) => {
        try {
            const {token} = req.cookies
            if(!token) {
                res.sendStatus(401);
                return;
            }
            const user = await getUserFromToken(token)
            const {title,body,image,community,communityIcon,isImage} = req.body;
            if(isImage) {
                
            }
            const post = await new Post({
                author:user.username,
                authorAvatar:user.avatar,
                title,
                body,
                image,
                community,
                communityIcon,
                isImage
            })
            const savedPost = await post.save()
            if(savedPost) {
                res.json(savedPost)
            } else {
                res.sendStatus(401)
            }
        } catch (err) {
            
        }
    },
    voting: async (req,res) => {
        try {
            const {token} = req.cookies
            if(!token) {
                res.status(401).json({msg: "You need to be logged for vote this post"})
                return;
            }
            const user = await getUserFromToken(token)
            const {id} = req.params
            const {dir} = req.body
            if(dir === '1') {
                const post = await Post.findByIdAndUpdate(id, {$inc : {'ups' : +1}})
                const userVote = await User.findOneAndUpdate({username: user.username},{$push: {upVotes : id}})
                res.status(200).json({vote: post.ups})
            } else {
                const post = await Post.findByIdAndUpdate(id, {$inc : {'ups' : -1}})
                const userVote = await User.findOneAndUpdate({username: user.username},{$push: {downVotes: id}})
                res.status(200).json({vote: post.ups})
            }
            
        } catch (err) {
            res.status(500).json({msg: err})
        }
    },
    deletePost: async (req,res) => { //and comments related
        try {
            const {id} = req.params
            const findPost = await Post.findByIdAndDelete(id)
            const findChildComments = await Comment.deleteMany({rootId:id})
            res.json({msg: "Deleted Success"})
        } catch (err) {
            return res.status(500).json({msg: err})
        }
    },
}

export default PostCtrl;