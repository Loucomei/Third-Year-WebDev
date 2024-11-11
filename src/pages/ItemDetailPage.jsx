import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const BID_URL =
  import.meta.env.MODE === "development"
    ? import.meta.env.VITE_DEVELOPMENT_BID_URL
    : import.meta.env.VITE_PRODUCTION_BID_URL;

const ITEM_URL =
  import.meta.env.MODE === "development"
    ? import.meta.env.VITE_DEVELOPMENT_ITEM_URL
    : import.meta.env.VITE_PRODUCTION_ITEM_URL;

const ItemDetailPage = () => {
  const item = JSON.parse(localStorage.getItem("item"));
  const navigate = useNavigate();

  if (localStorage.getItem("item") == null) {
    useEffect(() => {
      navigate("/");
    }, []);
  } else {
    const { id, title, price, description, image } = item;

    const [newPrice, setNewPrice] = useState(price);
    const [isButtonDisabled, setButtonDisabled] = useState(false);
    var [currentPrice, setCurrentPrice] = useState(price);

    //sends a request to the backend to get the current price of the item
    const singleItemAPI = async () => {
      try {
        const response = await axios.get(`${ITEM_URL}?item_id=${id}`, {
          headers: { "Content-Type": "application/json" },
        });
        if (response.data.length !== 0) {
          setCurrentPrice(response.data[0].price);
        }
      } catch (error) {
        if (error?.message == "Network Error") {
          toast.error(error.message + ". Is the database active?");
          setButtonDisabled(false);
        }
      }
    };

    singleItemAPI();

    //checks the price entered by the user and disables the button if the price is less
    //than the current price of the item
    const priceCheck = (e) => {
      if (e.target.value <= price) {
        setNewPrice(price);
        setButtonDisabled(false);
      } else {
        setNewPrice(e.target.value);
        setButtonDisabled(true);
      }
    };

    //sends a request to the backend to bid on the item
    const bid = async () => {
      const item = { item_id: id, price: Number(newPrice) };
      try {
        const response = await axios.post(BID_URL, item, {
          headers: { "Content-Type": "application/json" },
        });
        toast.success("Bid success");
        setCurrentPrice(newPrice);
      } catch (error) {
        const errorMessage =
          error?.response?.data?.error?.message ||
          "Please double check your credentials";
        toast.error(errorMessage);
        return null;
      }
    };
    return (
      <>
        <div className="hero bg-base-200 min-h-screen">
          <div className="hero-content flex-col lg:flex-row">
            <img src={image} className="max-w-sm rounded-lg shadow-2xl" />
            <div>
              <h1 className="text-5xl font-bold text-accent">{title}</h1>
              <p className="py-6 text-accent">{description}</p>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Enter your bid</span>
                  <span className="label-text-alt">
                    Minimum bid £{currentPrice}
                  </span>
                </div>
                <input
                  type="number"
                  placeholder={"£" + currentPrice}
                  className="input input-bordered w-full max-w-xs"
                  onChange={priceCheck}
                />
                <div className="label"></div>
              </label>
              <button
                className="btn btn-primary btn-lg"
                onClick={bid}
                disabled={!isButtonDisabled}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
};
export default ItemDetailPage;
