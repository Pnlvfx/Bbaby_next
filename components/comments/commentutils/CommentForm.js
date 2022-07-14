import axios from 'axios';
import Link from 'next/link';;
import {useContext, useState} from 'react'
import AuthModalContext from '../../auth/AuthModalContext';
import UserContext from '../../auth/UserContext';
import Button from '/components/utils/Button';
import Textarea from '/components/utils/Textarea';


function CommentForm(props) {
    const provider = useContext(UserContext)
    const {session} = provider

    const server = process.env.NEXT_PUBLIC_SERVER_URL
    const [commentBody,setCommentBody] = useState('');
    const authModalContext = useContext(AuthModalContext)

    const postComment = async(e) => {
        e.preventDefault();
        try {
        const data = {body:commentBody, parentId:props.parentId, rootId:props.rootId};
        const res = await axios.post(server+'/comments', data, {withCredentials:true})
            .then(response => {
            setCommentBody('');
            if(props.onSubmit) {
                props.onSubmit();
            }    
        })
        } catch (err) {
            if(err.response.status === 401) {
                authModalContext.setShow('login');
            }
        }
    }

  return (
    <>
        {session && props.showAuthor && (
            <div className='mb-2 text-[13px] self-center'>
                <p className='self-center'>Comment as <Link href={`/user/${session.user.username}`}> 
                    <a className='text-reddit_blue mt-[1px] self-center'>{session.user.username}</a> 
                    </Link>
                </p>
            </div>
        )}
        <form onSubmit={e => postComment(e)}>
            <Textarea
                className="w-full h-[150px] border-reddit_border min-h-[150px] max-h-[270px] placeholder:text-sm placeholder:text-reddit_text-darker"
                onChange={e => setCommentBody(e.target.value)}
                value={commentBody} 
                placeholder={'What are your thoughts?'} />
            <div className='bg-reddit_dark-brightest h-28px] w-full mb-3'>
                <div className="text-right">
                    {!!props.onCancel && (
                        <Button outline className="p-1 mr-4 hover:bg-reddit_hover border-none" onClick={e => props.onCancel()}>Cancel</Button>
                    )}
                    <Button className="p-1 my-1 mr-4">Comment</Button>
                </div>
            </div>
        </form> 
    </>
  )
}

export default CommentForm;