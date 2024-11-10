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

  if (localStorage.getItem("item") == null) {
    navigate("/");
  } else {
    const { id, title, price, category, description, image } = item;
    const navigate = useNavigate();

    const [newPrice, setNewPrice] = useState(price);
    const [isButtonDisabled, setButtonDisabled] = useState(false);
    var [currentPrice, setCurrentPrice] = useState(price);

    const singleItemAPI = async () => {
      console.log("Ping")
      console.log(id);
      try {
        const response = await axios.get(`${ITEM_URL}?item_id=${id}`, {
          headers: { "Content-Type": "application/json" },
        });
        if (response.data.length !== 0) {
          setCurrentPrice(response.data[0].price);
        }
      }
      catch (error) {
        if(error?.message == "Network Error"){
          toast.error(error.message + ". Is the database active?");
          setButtonDisabled(false);
        }
        console.log(error);
      }
    };

    useEffect(() => {
      singleItemAPI();
    }, [])

    const priceCheck = (e) => {
      if (e.target.value <= price) {
        setNewPrice(price);
        setButtonDisabled(false);
      } else {
        setNewPrice(e.target.value);
        setButtonDisabled(true);
      }
    };
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
        console.log(error);
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
              <h1 className="text-5xl font-bold">{title}</h1>
              <p className="py-6">{description}</p>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Enter your bid</span>
                  <span className="label-text-alt">Minimum bid £{currentPrice}</span>
                </div>
                <input type="number" placeholder={"£" + currentPrice} className="input input-bordered w-full max-w-xs" onChange={priceCheck}/>
                <div className="label">
                </div>
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
