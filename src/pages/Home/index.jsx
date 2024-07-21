import React, { useEffect, useState } from "react";
import { InfinitySpin } from "react-loader-spinner";
import Navbar from "../../components/Navbar";
let count = [0, 9, 18];
const Home = () => {
  const [products, setProdects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState([]);
  const [pageStore, setPageStore] = useState(0);
  const [categoryName, setCategoryName] = useState("");
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("carts")) || []
  );
  const fetchProducts = async () => {
    const res = await fetch("https://fakestoreapi.com/products");
    if (res.status >= 200 && res.status <= 299) {
      const data = await res.json();
      if (categoryName) {
        let filteredData = data.filter(
          (product) => product.category === categoryName
        );
        setProdects(filteredData.slice(pageStore, pageStore + 9));
        console.log(filteredData);
      } else {
        setProdects(data.slice(pageStore, pageStore + 9));
        setLoading(false);
        let uniqueCategories = new Set();
        data.map((product) => {
          return uniqueCategories.add(product.category);
        });
        setCategory([...uniqueCategories]);
        console.log(data);
      }
    } else {
      setLoading(true);
    }
  };
  const handleAddToCart = (id) => {
    if (cart?.includes(id) === false) {
      let arrOfIds = [...cart];
      arrOfIds.push(id);
      setCart([...arrOfIds]);
    } else {
      alert("Product is already in cart");
    }
  };
  useEffect(() => {
    localStorage.setItem("carts", JSON.stringify(cart));
    fetchProducts();
  }, [cart, pageStore, categoryName]);
  return (
    <>
      <Navbar />
      <div className="mt-10 flex flex-wrap justify-center gap-5">
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
          <>
            <div className="navbar bg-neutral text-neutral-content flex justify-center gap-4">
              {category.map((item, index) => {
                return (
                  <button
                    key={index}
                    className="btn btn-ghost text-white capitalize text-lg"
                    onClick={() => setCategoryName(item)}
                  >
                    {item}
                  </button>
                );
              })}
              <button
                className="btn btn-ghost text-white capitalize text-lg"
                onClick={() => setCategoryName("")}
              >
                All
              </button>
            </div>
            {products.map((product) => {
              return (
                <div
                  className="card bg-base-100 w-96 shadow-xl mb-7"
                  key={product.id}
                >
                  <figure className="h-96">
                    <img src={product.image} alt={product.title} width={200} />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">
                      {product.title.length > 18
                        ? product.title.substr(0, 18) + "...."
                        : product.title.substr(0, 18)}
                      <div className="badge badge-secondary">NEW</div>
                    </h2>
                    <p>
                      {product.description.length > 100
                        ? product.description.substr(0, 100) + "...."
                        : product.description.substr(0, 100)}
                    </p>
                    <p className="text-xl font-bold">${product.price}</p>
                    <div className="card-actions justify-end p-5">
                      {categoryName ? null : (
                        <div className="bg-gray-400 text-white p-3 mx-3 absolute -left-5 rounded-s-none rounded-e-md">
                          {product.category}
                        </div>
                      )}
                      <div>
                        <button
                          className="btn btn-primary"
                          onClick={() => handleAddToCart(product.id)}
                        >
                          Add To Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
      <div className="flex w-full justify-center gap-5 p-5">
        {categoryName
          ? null
          : count.map((i, index) => {
              return (
                <span
                  className="btn"
                  key={i}
                  onClick={() => {
                    setPageStore(i);
                    window.scrollTo({
                      top: 0,
                      behavior: "smooth",
                    });
                  }}
                >
                  {index + 1}
                </span>
              );
            })}
      </div>
    </>
  );
};
export default Home;
