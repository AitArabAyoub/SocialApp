import FeedPosts from "../components/FeedPosts"
import SuggUsers from "../components/SuggUsers"

function Posts() {
    return (
        <div className="grid grid-cols-3 gap-2">
            <div className="col-span-2">
                <FeedPosts/>
            </div>
            <div className="">
                <p className="text-gray-500 pt-3 mb-2">Suggestions for you</p>
                <SuggUsers/>
            </div>
        </div>
    )
}

export default Posts
