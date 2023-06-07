
const Footer = () => {
    return (
        <footer className="bd-footer bg-body-tertiary pt-5" style={{ backgroundColor: "#F8E4E5" }}>
        <div className="container  px-4 px-md-3 text-body-secondary">
          <div className="row">
            <div className="col-lg-3 mb-3">
              <div className="list-unstyled small">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXqzmeP64kFR2BNfkWSHSxN_2F1aSjdDmyDA&usqp=CAU" width={'180px'} alt="News Presenter School Logo" />
                <p className="mb-2">
                  News Presenter School is a leading institution dedicated to training aspiring news presenters. Our programs provide comprehensive training in journalism, broadcasting, and on-camera presentation skills.
                </p>
              </div>
            </div>
            <div className="col-6 col-lg-3 mb-3">
              <h5>Links</h5>
              <ul className="list-unstyled">
                <li className="mb-2"><a href="#">Home</a></li>
                <li className="mb-2"><a href="#">Contact</a></li>
                <li className="mb-2"><a href="#">Blog</a></li>
                <li className="mb-2"><a href="#">FAQ</a></li>
              </ul>
            </div>
            <div className="col-6 col-lg-3 mb-3">
              <h5>Community</h5>
              <ul className="list-unstyled">
                <li className="mb-2"><a href="#">Issues</a></li>
                <li className="mb-2"><a href="#">Discussions</a></li>
                <li className="mb-2"><a href="#">Corporate sponsors</a></li>
                <li className="mb-2"><a href="#">Open Collective</a></li>
              </ul>
            </div>
            <div className="col-6 col-lg-3 mb-3">
              <h3>Subscribe to Our Newsletter</h3>
              <form>
                <input type="email" id="email" name="email" placeholder="Enter your email" required className="form-control" />
                <button type="submit" className="btn btn-primary my-2">Subscribe Now</button>
              </form>
              <h3>Follow us:</h3>
              <ul className="social-icons d-flex list-unstyled justify-content-between">
                <li><a href="#"><i className="fs-5 m-1 fa fa-facebook"></i></a></li>
                <li><a href="#"><i className="fs-5 m-1 fa fa-twitter"></i></a></li>
                <li><a href="#"><i className="fs-5 m-1 fa fa-instagram"></i></a></li>
                <li><a href="#"><i className="fs-5 m-1 fa fa-linkedin"></i></a></li>
                <li><a href="#"><i className="fs-5 m-1 fa fa-youtube"></i></a></li>
                <li><a href="#"><i className="fs-5 m-1 fa fa-pinterest"></i></a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="text-center px-4 py-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
          © 2023. All rights reserved.
        </div>
      </footer>
    );
};

export default Footer;