import React, { useEffect, useState } from "react";
import { InfinitySpin } from "react-loader-spinner";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
const Cart = () => {
  const [carts, setCarts] = useState(
    JSON.parse(localStorage.getItem("carts")) || []
  );
  const [products, setProdects] = useState([]);
  const [cartProduct, setCartProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState("");
  const fetchProducts = async () => {
    const res = await fetch("https://fakestoreapi.com/products");
    if (res.status >= 200 && res.status <= 299) {
      const data = await res.json();
      setProdects(data);
      setLoading(false);
    } else {
      setLoading(true);
    }
    let newArrOfProducts = [];
    for (let i = 0; i < products.length; i++) {
      for (let j = 0; j < carts.length; j++) {
        if (products[i].id === carts[j]) {
          newArrOfProducts.push(products[i]);
        }
      }
    }
    setCartProduct(newArrOfProducts);
  };
  const handleRemoveCart = (id) => {
    let newCart = carts.filter((item) => item !== id);
    localStorage.setItem("carts", JSON.stringify(newCart));
    setCarts(newCart);
  };
  useEffect(() => {
    fetchProducts();
    const totalPrice = cartProduct.reduce((total, current) => {
      return total + current.price;
    }, 0);
    setTotal(totalPrice);
  }, [carts, cartProduct]);
  return (
    <>
      <Navbar />
      <div className="flex justify-between p-3 flex-wrap flex-row">
        {loading ? (
          <div className="flex justify-center items-center h-screen w-full">
            <InfinitySpin
              visible={true}
              width="200"
              color="#ff00d3"
              ariaLabel="infinity-spin-loading"
            />
          </div>
        ) : (
          <div className="flex flex-wrap w-3/4">
            {cartProduct.map((product) => {
              return (
                <div
                  className="card bg-base-100 h-96 w-72 shadow-xl m-3"
                  key={product.id}
                >
                  <figure>
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-40 h-60"
                    />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">
                      {product.title.length > 10
                        ? product.title.substr(0, 10) + "...."
                        : product.title.substr(0, 10)}
                    </h2>
                    <p className="text-xl font-bold">${product.price}</p>
                    <div className="card-actions justify-end ">
                      <div className="bg-gray-400 text-white p-3 mx-3 absolute -left-5 rounded-s-none rounded-e-md">
                        {product.category}
                      </div>
                      <div>
                        <button
                          className="btn btn-primary"
                          onClick={() => handleRemoveCart(product.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {carts.length < 1 ? (
          <div className="flex justify-center flex-col gap-5 items-center w-full p-44">
            <h1 className="text-xl">
              No Prodect Added To cart Please Go Home And Make Shopping
            </h1>
            <Link to="/" className="btn btn-secondary">
              Shopping Now
            </Link>
          </div>
        ) : (
          <div className="flex justify-start items-center pt-16 w-1/4 bg-slate-300 flex-col">
            <h1 className="text-2xl font-bold">
              Total product: {cartProduct.length} product
            </h1>
            <h1 className="text-2xl font-bold my-6">Total price: {total}$</h1>
            <button className="btn btn-secondary tex-2xl">Buy</button>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
