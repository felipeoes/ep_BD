import "./featuredInfo.css";
import {MonitorHeart,Email,People} from '@mui/icons-material/';
export default function FeaturedInfo() {
    return (
        <div className="featured">
           <div className="featuredItem">
                <div className="featuredInfo">
                    <MonitorHeart className="featuredIconContainer"/>
                    <div className="message">
                        <span className="featuredTitle">Titulo</span>
                        <div className="featuredMessageContainer">
                            <span className="featuredMessage">Mensagem</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="featuredItem">
                <div className="featuredInfo">
                    <Email className="featuredIconContainer"/>
                    <div className="message">
                        <span className="featuredTitle">Titulo</span>
                        <div className="featuredMessageContainer">
                            <span className="featuredMessage">Mensagem</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="featuredItem">
                <div className="featuredInfo">
                    <People className="featuredIconContainer"/>
                    <div className="message">
                        <span className="featuredTitle">Titulo</span>
                        <div className="featuredMessageContainer">
                            <span className="featuredMessage">Mensagem</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
