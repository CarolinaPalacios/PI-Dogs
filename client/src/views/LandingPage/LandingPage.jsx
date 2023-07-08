import { NavLink } from "react-router-dom";
import logo from "../../assets/dog-house.svg";
import GitHubIcon from "../../assets/GitHubIcon.svg";
import LinkedinIcon from "../../assets/LinkedinIcon.svg";
import style from "./LandingPage.module.css";

const LandingPage = () => {
  return (
    <div className={style.container}>
      <h1 className={style.title}>Welcome to the DogApp!</h1>
      <p className={style.text}>
        If you want to know more about, <br /> click on the button to go to our
        home.
      </p>
      <NavLink to="/home" className={style.navLinktoHome}>
        <button className={style.landingButton}>
          <img src={logo} alt="home" className={style.logoButton} />
        </button>
      </NavLink>
      <footer className={style.footer}>
        <div className={style.socialLinks}>
          <a
            href="https://github.com/CarolinaPalacios"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={GitHubIcon} alt="GitHub" className={style.GitHubIcon} />
          </a>
          <a
            href="https://www.linkedin.com/in/carolina-palacios-0723b726b/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={LinkedinIcon}
              alt="LinkedIn"
              className={style.LinkedinIcon}
            />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
