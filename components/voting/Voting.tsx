import { useState } from 'react'
import { BiUpvote, BiDownvote } from 'react-icons/bi'
import { useCommentContext } from '../comments/commentutils/RootCommentContext'

interface CommentVoting {
  comment: CommentProps
}

const Voting = ({ comment }: CommentVoting) => {
  const { comments, getComments } = useCommentContext()
  const [upVote, setUpVote] = useState(comment?.ups ? comment.ups : 0)
  const userVote = null // to change

  const handleVoteUp = () => {
    //sendVote('up')
  }

  const handleVoteDown = () => {
    //sendVote('down')
  }

  function arrowButton(directionName = 'up') {
    const directionNumber = directionName === 'up' ? 1 : -1
    let classNames = ' block'

    if (directionNumber === userVote) {
      classNames += ' text-reddit_red '
    } else {
      classNames += ' text-reddit_text-darker hover:bg-gray-600 '
    }

    if (directionName === 'up') {
      return (
        <button onClick={handleVoteUp} className={classNames}>
          <BiUpvote className="w-6" />
        </button>
      )
    } else {
      return (
        <button onClick={handleVoteDown} className={classNames}>
          <BiDownvote className="w-6" />
        </button>
      )
    }
  }

  return (
    <div className="flex p-2 pl-0">
      {arrowButton('up')}
      <span className="">{upVote}</span>
      {arrowButton('down')}
    </div>
  )
}

export default Voting
