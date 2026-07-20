import React, { useEffect, useState } from "react";

export default function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);

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
        }

        .grid{
          display:grid;
          grid-template-columns:repeat(auto-fit,minmax(250px,1fr));
          gap:20px;
        }

        .card{
          background:#fff;
          border-radius:10px;
          overflow:hidden;
          box-shadow:0 2px 10px rgba(0,0,0,.1);
          cursor:pointer;
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
        }

        .description{
          color:#555;
          font-size:14px;
          height:40px;
          overflow:hidden;
          margin-bottom:10px;
        }

        .price{
          color:green;
          font-size:20px;
          font-weight:bold;
          margin-bottom:10px;
        }

        .rating{
          color:orange;
          margin-bottom:10px;
        }

        button{
          width:100%;
          padding:10px;
          border:none;
          background:#007bff;
          color:white;
          border-radius:5px;
          cursor:pointer;
        }

        button:hover{
          background:#0056b3;
        }

        .loading{
          text-align:center;
          margin-top:100px;
        }

        /* Modal */

        .overlay{
          position:fixed;
          top:0;
          left:0;
          width:100%;
          height:100%;
          background:rgba(0,0,0,.6);
          display:flex;
          justify-content:center;
          align-items:center;
        }

        .modal{
          background:#fff;
          width:500px;
          max-width:90%;
          border-radius:10px;
          padding:20px;
          position:relative;
        }

        .modal img{
          width:100%;
          height:300px;
          object-fit:cover;
          border-radius:10px;
        }

        .close{
          position:absolute;
          right:15px;
          top:10px;
          font-size:28px;
          cursor:pointer;
          color:red;
        }

        .modal h2{
          margin:15px 0;
        }

        .modal p{
          margin:8px 0;
        }

        .modal .price{
          font-size:24px;
        }
      `}</style>

      <div className="container">
        <h1>🛒 Products</h1>

        <div className="grid">
          {products.map((product) => (
            <div
              className="card"
              key={product.id}
              onClick={() => setSelectedProduct(product)}
            >
              <img
                src={product.thumbnail}
                alt={product.title}
              />

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

      {selectedProduct && (
        <div
          className="overlay"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="modal"
            onClick={(e) => e.stopPropagation()}
          >
            <span
              className="close"
              onClick={() => setSelectedProduct(null)}
            >
              ×
            </span>

            <img
              src={selectedProduct.thumbnail}
              alt={selectedProduct.title}
            />

            <h2>{selectedProduct.title}</h2>

            <p>{selectedProduct.description}</p>

            <p className="price">
              ${selectedProduct.price}
            </p>

            <p>
              <strong>Rating:</strong> ⭐ {selectedProduct.rating}
            </p>

            <p>
              <strong>Brand:</strong> {selectedProduct.brand}
            </p>

            <p>
              <strong>Category:</strong> {selectedProduct.category}
            </p>

            <p>
              <strong>Stock:</strong> {selectedProduct.stock}
            </p>

            <p>
              <strong>Discount:</strong>{" "}
              {selectedProduct.discountPercentage}%
            </p>

            <button>Add to Cart</button>
          </div>
        </div>
      )}
    </>
  );
}