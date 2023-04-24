import React from "react";
import "./TopBar.css";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";
import { signOut } from "../../action";
import { connect } from "react-redux";

function TopBar(props) {
  if (!props.isSignedIn) return null;
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">Admin</span>
        </div>
        <div className="topRight">
          <div className="topbarIconsContainer">
            <div
              style={{
                border: "1px solid black",
                width: "40px",
                height: "40px",
                borderRadius: "20px",
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '30px',
                fontWeight: 'bold'
              }}
            >
              A
            </div>
          </div>
          <button
            className="ui red button tiny"
            onClick={() => props.signOut()}
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
  };
};

export default connect(mapStateToProps, { signOut })(TopBar);
