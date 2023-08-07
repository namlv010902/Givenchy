
import 'react-toastify/dist/ReactToastify.css';
import "./lazyloaded.css";


const Lazyloaded = () => {




  return (
    <>
      <div className="lazyloaded">
        <div className="box-info">
          <div className="box-info-text">
            <h3>  Significance of glamour with 20% </h3>
            <button>SHOW NOW</button>
          </div>
          <div className="box-info-image">
            <img src="https://permia-store-demo.myshopify.com/cdn/shop/files/bannerV3-img1.jpg?v=1675502544" alt="" />

          </div>
        </div>
        <div className="box-info">
          <div className="box-info-text">
            <h3>
              Fragrance that makes the outfits
            </h3>
            <button>SHOW NOW</button>
          </div>
          <div className="box-info-image">
            <img src="https://permia-store-demo.myshopify.com/cdn/shop/files/bannerV3-img2.jpg?v=1675502544" alt="" />

          </div>
        </div>
      </div>
    </>
  )
};

export default Lazyloaded;
