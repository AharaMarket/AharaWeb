import { BsFillBagFill } from "react-icons/bs";
import './Card.css'

const Card = ({ img, title, star, vendor, reviews, prevPrice, newPrice }) => {
  return (
    <>
      <section className="card">
        <div className="card-details">
          <h3 className="card-title">{title}</h3>
          <h4 className="card-vendor">{vendor}</h4>
          <img src={img} alt={title} className="card-img" />
          <section className="card-reviews">
            {star} {star} {star} {star} {star} 
            {/* <div className="total-reviews">{reviews}</div> */}
          </section>
          <section className="card-price">
            <div className="price">
              <del>{prevPrice}</del> ${newPrice}
            </div>
            <div className="bag">
              Add to cart <BsFillBagFill className="bag-icon" />
            </div>
          </section>
        </div>
      </section>
    </>
  );
};

export default Card;