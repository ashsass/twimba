import { tweetsData } from './data.js'
const tweetInput = document.getElementById('tweet-input')
const tweetBtn = document.getElementById('tweet-btn')

tweetBtn.addEventListener('click', function(){
    console.log(tweetInput.value)
})

//Take the uuid of the tweet that is being clicked on by identifying the data attribute
document.addEventListener('click', function(e){
    if(e.target.dataset.like){
       handleLikeClick(e.target.dataset.like) 
    } 
    else if(e.target.dataset.retweet){
        handleRetweetClick(e.target.dataset.retweet)
    }
})

//When the data attribute it grabbed, check which object matches the uuid and increment the likes
function handleLikeClick(tweetId){
    const targetTweetObj = tweetsData.filter(item => {
        return item.uuid === tweetId
    })[0]

    targetTweetObj.isLiked ? targetTweetObj.likes-- : targetTweetObj.likes++
    targetTweetObj.isLiked = !targetTweetObj.isLiked
    render()
}

function handleRetweetClick(tweetId) {
    const targetTweetObj = tweetsData.filter(item => {
        return item.uuid === tweetId
    })[0]

    targetTweetObj.isRetweeted ? targetTweetObj.retweets-- : targetTweetObj.retweets++
    targetTweetObj.isRetweeted = !targetTweetObj.isRetweeted
    render()
}

function getFeedHtml(){
    let feedHtml = ``

    tweetsData.forEach(function(tweet){
        let likeIconClass = ''
        if(tweet.isLiked){
            likeIconClass = 'liked'
        }

        let retweetIconClass = ''
        if(tweet.isRetweeted){
            retweetIconClass = 'retweeted'
        }

        if(tweet.replies.length){ //Only access a tweet that has a reply
            console.log(tweet.uuid)
        }
    
        feedHtml += `
<div class="tweet">
    <div class="tweet-inner">
        <img src="${tweet.profilePic}" class="profile-pic">
        <div>
            <p class="handle">${tweet.handle}</p>
            <p class="tweet-text">${tweet.tweetText}</p>
            <div class="tweet-details">
                <span class="tweet-detail">
                    <i class="fa-regular fa-comment-dots"
                    data-reply="${tweet.uuid}"
                    ></i>
                    ${tweet.replies.length}
                </span>
                <span class="tweet-detail">
                    <i class="fa-solid fa-heart ${likeIconClass}"
                    data-like="${tweet.uuid}"
                    ></i>
                    ${tweet.likes}
                </span>
                <span class="tweet-detail">
                    <i class="fa-solid fa-retweet ${retweetIconClass}"
                    data-retweet="${tweet.uuid}"
                    ></i>
                    ${tweet.retweets}
                </span>
            </div>   
        </div>            
    </div>
</div>
`
   })
   return feedHtml 
}

function render(){
    document.getElementById('feed').innerHTML = getFeedHtml()
}

render()