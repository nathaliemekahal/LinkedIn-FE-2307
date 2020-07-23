import React from "react";
import { Col } from "react-bootstrap";
import ProfileJumbotron from "../ProfileJumbotron";
import { createUseStyles } from "react-jss";
import Dashboard from "./dashboard/Dashboard";
import ProgressBarComponent from "./ProgressBarSection/ProgressBarComponent";
import ContainerEExp from "../ExperienceSection/ContainerEExp";
import ContainerSkills from '../SkillsSection/ContainerSkills'
import ContainerEdu from "./education/ContainerEdu";
import Auth from '../../authorization/Auth'

function LeftRail(props) {
  return (
    <Col lg={8}>
      <ProfileJumbotron {...props} />
      <ProgressBarComponent {...props} />
    {props.user.username===Auth.user&& <Dashboard {...props} />}
     
      <ContainerEExp {...props} />
      <ContainerSkills />
       
      <ContainerEdu />
    </Col>
  );
}

export default LeftRail;
