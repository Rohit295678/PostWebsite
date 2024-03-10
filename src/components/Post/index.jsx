import { Link } from "react-router-dom";
import "./post.css";

export default function Post({data}) {
  return (
    <div className="post">
      <img
        className="postImg"
        src={data.img}
        alt="logo"
      />
      <div className="postInfo">
        <div className="postCats">
          <span className="postCat">
            <Link className="link" to="/posts?cat=Music">
              Music
            </Link>
          </span>
          <span className="postCat">
            <Link className="link" to="/posts?cat=Music">
              Life
            </Link>
          </span>
        </div>
        <span className="postTitle">
          <Link to={`/singlepost/${data._id}`} className="link">
            {data.title}
          </Link>
        </span>
        <hr />
        <span className="postDate">{data.createdAt.slice(2,10)}</span>
      </div>
      <p className="postDesc">
        {data.desc}
      </p>
    </div>
  );
}