import "./topbar.css";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";
import { useSelector } from "react-redux";

const Topbar = () => {
  const adminImg = useSelector((state) => state.user.currentUser?.img);
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">store-admin</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">3</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">4</span>
          </div>
          <div className="topbarIconContainer">
            <Settings />
          </div>
          <img src={adminImg} alt="" className="topAvatar" />
        </div>
      </div>
    </div>
  );
};

export default Topbar;
