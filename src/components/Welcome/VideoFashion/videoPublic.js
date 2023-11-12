import React from 'react';
import '../VideoFashion/videoPublic.scss';
import video from '../../../assets/videos/Spring-Summer-2018-Fashion.mp4';

const VideoPublic = () => {
    return (
        <div style={{ margin: 20 }}>
            <div className="collection_video">
                <div className="title_slogan">
                    <h2 className="title-block-product"> New Collection</h2>
                    <video autoPlay={false} loop muted>
                        <source
                            src={video}
                            type="video/mp4" />
                    </video>
                </div>
            </div>
        </div>
    )
}
export default VideoPublic;