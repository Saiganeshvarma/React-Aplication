import React, { useEffect, useState } from "react";

export default function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <h2 className="loading">Loading Products...</h2>;
  }

  return (
    <>
      <style>{`
        *{
          margin:0;
          padding:0;
          box-sizing:border-box;
          font-family:Arial,sans-serif;
        }

        body{
          background:#f5f5f5;
        }

        .container{
          width:90%;
          margin:30px auto;
        }

        h1{
          text-align:center;
          margin-bottom:30px;
          color:#333;
        }

        .grid{
          display:grid;
          grid-template-columns:repeat(auto-fit,minmax(250px,1fr));
          gap:20px;
        }

        .card{
          background:white;
          border-radius:10px;
          overflow:hidden;
          box-shadow:0 2px 10px rgba(0,0,0,0.1);
          transition:.3s;
        }

        .card:hover{
          transform:translateY(-5px);
        }

        .card img{
          width:100%;
          height:220px;
          object-fit:cover;
        }

        .content{
          padding:15px;
        }

        .title{
          font-size:18px;
          margin-bottom:10px;
          color:#333;
        }

        .description{
          color:#666;
          font-size:14px;
          margin-bottom:10px;
          height:40px;
          overflow:hidden;
        }

        .price{
          font-size:20px;
          color:#28a745;
          font-weight:bold;
          margin-bottom:10px;
        }

        .rating{
          color:orange;
          margin-bottom:15px;
        }

        button{
          width:100%;
          padding:10px;
          border:none;
          background:#007bff;
          color:white;
          cursor:pointer;
          border-radius:5px;
          font-size:16px;
        }

        button:hover{
          background:#0056b3;
        }

        .loading{
          text-align:center;
          margin-top:100px;
        }
      `}</style>

      <div className="container">
        <h1>🛒 Products</h1>

        <div className="grid">
          {products.map((product) => (
            <div className="card" key={product.id}>
              <img src={product.thumbnail} alt={product.title} />

              <div className="content">
                <h3 className="title">{product.title}</h3>

                <p className="description">
                  {product.description}
                </p>

                <p className="price">${product.price}</p>

                <p className="rating">
                  ⭐ {product.rating}
                </p>

                <button>Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}