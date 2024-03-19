import Footer from '../Layout/Footer'

const Home = () => {
    return (
        <div className="page">
            <div className="page-contents">
                <div className="logo">
                    <img src="/assets/icons/ppf.png" alt="" />
                    <div className="intro">
                        <br/>
                        <h2>Puntland Police Force</h2>
                        <h4>Web Based clean architecture system</h4>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}
 
export default Home;