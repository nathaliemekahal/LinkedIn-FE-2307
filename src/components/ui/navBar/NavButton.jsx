import React from "react";
import { Nav } from "react-bootstrap";
import { createUseStyles } from "react-jss";
import ProfileImage from "../profile-images/ProfileImage";

function NavButton({item, color}) {
  const useStyles = createUseStyles((theme) => ({
    container: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      color: color ? color : theme.secondary.lighter,
      marginRight: "20px",
    },
    icon: {
      fontSize: "1.3rem",
    },
    label: {
      fontSize: "0.7rem",
      fontWeight: theme.text.weight.bold,
    },
  }));
  const classes = useStyles();
 
  return (
    <div className={classes.container}>
      {item.icon ? (
        <item.icon className={classes.icon} />
      ) : (
        <ProfileImage src={"https://scontent-cdg2-1.xx.fbcdn.net/v/t1.0-9/20139741_10213956490452698_880545826996706462_n.jpg?_nc_cat=111&_nc_sid=174925&_nc_ohc=5Ok161MLPm8AX8IRgj1&_nc_ht=scontent-cdg2-1.xx&oh=c3964c31f80f301a82b22a4dbe7f8bab&oe=5F1270E3"} height={"1.3rem"} />
      )}
      <span className={classes.label}>
        {item.label} {item.secondaryIcon && <item.secondaryIcon />}
      </span>
    </div>
  );
}

export default NavButton;
