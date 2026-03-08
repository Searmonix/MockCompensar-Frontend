import doctor from "../../template/static/images/Valen.png";


const MainSection = () => {
    return(
        <section className="banner">
            <div className="content">
                <h1 className="title">EPS Compensar</h1>

                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Nunc in porta lectus. Cras cursus malesuada rutrum. Proin et elit congue, 
                    vulputate tortor eget, semper dolor.</p>
                <ul>
                    <li><a href="/" className="other-btn">Más Información</a></li>
                </ul>
            </div>
            <div className="doctor-img">
                <span><img src={doctor} alt="Doctor"/></span>
            </div>
        </section>
    );
};

export default MainSection;