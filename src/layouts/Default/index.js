import Footer from '../../components/Welcome/Footer/footer';
import Sidebars from '../../components/Admin/Sidebars';



const DefaultLayout = ({ children }) => {
    return (
        <div>
            <div className="row">
                <div className="col-3">
                    <Sidebars />
                </div>
                <div className="col-9">
                    {children}
                </div>
            </div>
            <div>
                <div>
                    <Footer />
                </div>
            </div>
        </div>

    )
}
export default DefaultLayout;