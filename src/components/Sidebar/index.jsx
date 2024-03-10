import { Link } from "react-router-dom";
import "./sidebar.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare,faInstagramSquare,faPinterestSquare,faTwitterSquare } from '@fortawesome/free-brands-svg-icons';

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT US</span>
        <img
          src="https://i.pinimg.com/236x/c2/fc/9d/c2fc9d585f744fdc86993f2d062848b1.jpg"
          alt=""
        />
        <p>
          Laboris sunt aute cupidatat velit magna velit ullamco dolore mollit
          amet ex esse.Sunt eu ut nostrud id quis proident.
        </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <Link className="link" to="/posts?cat=Life">
              Life
            </Link>
          </li>
          <li className="sidebarListItem">
            <Link className="link" to="/posts?cat=Music">
              Music
            </Link>
          </li>
          <li className="sidebarListItem">
            <Link className="link" to="/posts?cat=Sport">
              Sport
            </Link>
          </li>
          <li className="sidebarListItem">
            <Link className="link" to="/posts?cat=Style">
              Style
            </Link>
          </li>
          <li className="sidebarListItem">
            <Link className="link" to="/posts?cat=Tech">
              Tech
            </Link>
          </li>
          <li className="sidebarListItem">
            <Link className="link" to="/posts?cat=Cinema">
              Cinema
            </Link>
          </li>
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
        <FontAwesomeIcon icon={faFacebookSquare} className="sidebarIcon" />
        <FontAwesomeIcon icon={faInstagramSquare} className="sidebarIcon" />
        <FontAwesomeIcon icon={faPinterestSquare} className="sidebarIcon" />
        <FontAwesomeIcon icon={faTwitterSquare} className="sidebarIcon" />
        </div>
      </div>
    </div>
  );
}