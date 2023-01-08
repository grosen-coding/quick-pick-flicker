import logo from '../tmdb.svg'

function Footer () {
    return (
      <footer>
        {/* <p>This product uses the TMDb API but is not endorsed or certified by TMDb.</p> */}
        <div className="wrapper footerStyle">
          <div className="footerLeft">
            <a className="juno" href="https://junocollege.com/">
              Copyright 2021 <span>Juno College</span>
            </a>
          </div>

          <div className="footerRight">
            <img className="logo" src={logo} alt="The Movie Database Logo" />
          </div>
        </div>
      </footer>
    );
}

export default Footer;