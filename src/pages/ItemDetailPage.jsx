import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const ItemDetailPage = () => {

    const navigate = useNavigate();

    const item = JSON.parse(localStorage.getItem("item"));

    if(localStorage.getItem("item") == null){
        navigate('/')
    }
    else{

        const { id, title, price, category, description, image } = item;

            return (
                <>
                    <div className="hero bg-base-200 min-h-screen">
                    <div className="hero-content flex-col lg:flex-row">
                        <img
                        src={image}
                        className="max-w-sm rounded-lg shadow-2xl" />
                        <div>
                        <h1 className="text-5xl font-bold">{title}</h1>
                        <p className="py-6">
                            {description}
                        </p>
                        <button className="btn btn-primary btn-lg">£{price}</button>
                        </div>
                    </div>
                    </div>
                </>
            )
        }
}
export default ItemDetailPage;