import React, { useState } from "react";

const Marketplace = () => {
  const [showManualForm, setShowManualForm] = useState(false);
  const [cart, setCart] = useState([]);
  const [marketplaceItems, setMarketplaceItems] = useState([
    {
      id: 1,
      name: "Item 1",
      price: 10,
      image:
        "https://images.pexels.com/photos/842811/pexels-photo-842811.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      description: "Description for Item 1",
    },
    {
      id: 2,
      name: "Item 2",
      price: 20,
      image:
        "https://media.istockphoto.com/id/864505242/photo/mens-clothing-and-personal-accessories.jpg?s=612x612&w=0&k=20&c=TaJuW3UY9IZMijRrj1IdJRwd6iWzXBlrZyQd1uyBzEY=",
      description: "Description for Item 2",
    },
    {
      id: 3,
      name: "Item 3",
      price: 30,
      image:
        "https://images.pexels.com/photos/1300550/pexels-photo-1300550.jpeg?cs=srgb&dl=pexels-thelazyartist-1300550.jpg&fm=jpg",
      description: "Description for Item 3",
    },
    {
      id: 4,
      name: "Item 4",
      price: 40,
      image:
        "https://c0.wallpaperflare.com/preview/758/70/513/fashion-mens-fashion-suits-groom.jpg",
      description: "Description for Item 3",
    },
    {
      id: 5,
      name: "Item 5",
      price: 50,
      image:
        "https://media.istockphoto.com/id/665032164/photo/flat-lay-of-modern-mens-clothing-on-a-wooden-background.jpg?s=612x612&w=0&k=20&c=CVqFStPc5EDNHIqnpYKPm-DaImQVf2VDjl54oPBavK4=",
      description: "Description for Item 3",
    },
  ]);

  const [manualItem, setManualItem] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setManualItem({ ...manualItem, [name]: value });
  };

  const handleAddManualItem = (e) => {
    e.preventDefault();
    if (manualItem.name && manualItem.price && manualItem.image) {
      const newItem = {
        ...manualItem,
        id: new Date().getTime(),
        price: parseFloat(manualItem.price),
      };
      setMarketplaceItems([...marketplaceItems, newItem]);
      setManualItem({ name: "", price: "", image: "", description: "" });
      setShowManualForm(false);
    }
  };

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const [showCart, setShowCart] = useState(false);
  const toggleCart = () => setShowCart(!showCart);

  const handleUpdateCart = (id, newQuantity) => {
    if (newQuantity > 0) {
      // Prevent negative or zero quantity
      setCart(
        cart.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  return (
    <div className="p-8 max-w-full w-full">
      <div>
        <nav className="fixed top-0 left-0 right-0 bg-gray-800 text-white py-4 px-6 shadow-md z-10">
          <div className="flex justify-between items-center  flex-wrap gap-4" >
            <div className="flex space-x-6">
              <button
                onClick={toggleCart}
                className="bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition-colors duration-300"
              >
                Cart ({cart.reduce((total, item) => total + item.quantity, 0)})
              </button>
            </div>

            <h1 className="text-2xl sm:text-4xl font-bold text-gray-800 text-center flex-1 text-white">
              Marketplace
            </h1>

            <div className="flex space-x-6">
              <button
                onClick={() => setShowManualForm(!showManualForm)}
                className="bg-yellow-500 text-white font-semibold rounded-md hover:bg-yellow-600 transition-colors duration-300 py-2 px-6"
              >
                {showManualForm
                  ? "Cancel Add Item"
                  : "Add Custom Item to Marketplace"}
              </button>
            </div>
          </div>
        </nav>
      </div>

      {/* <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
        Marketplace
      </h1> */}

      {showManualForm && (
        <div className="bg-white  p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Add Custom Item
          </h2>
          <form onSubmit={handleAddManualItem}>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={manualItem.name}
                onChange={handleInputChange}
                className="mt-2 p-2 w-full border border-gray-300 rounded-md"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700">
                Price
              </label>
              <input
                type="number"
                name="price"
                value={manualItem.price}
                onChange={handleInputChange}
                className="mt-2 p-2 w-full border border-gray-300 rounded-md"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700">
                Image URL
              </label>
              <input
                type="url"
                name="image"
                value={manualItem.image}
                onChange={handleInputChange}
                className="mt-2 p-2 w-full border border-gray-300 rounded-md"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                value={manualItem.description}
                onChange={handleInputChange}
                className="mt-2 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition-colors duration-300"
            >
              Add to Marketplace
            </button>
          </form>
        </div>
      )}

      <div className="grid mt-[5rem] grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8 w-full">
        {marketplaceItems.map((item) => (
          <div
            key={item.id}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-40 object-cover rounded-md"
            />
            <h2 className="text-xl font-semibold text-gray-800 mt-4">
              {item.name}
            </h2>
            <p className="text-lg text-gray-600 mt-2">${item.price}</p>
            <p className="text-sm text-gray-500 mt-2">{item.description}</p>
            <button
              onClick={() => addToCart(item)}
              className="mt-4 w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors duration-300"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {showCart && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Your Cart
            </h2>
            {cart.length === 0 ? (
              <p className="text-gray-600">Your cart is empty.</p>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center mb-4"
                >
                  <div className="flex items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div className="ml-4">
                      <p className="font-semibold text-gray-800">{item.name}</p>
                      <p className="text-sm text-gray-600">
                        ${item.price} x {item.quantity}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <button
                      onClick={() =>
                        handleUpdateCart(item.id, item.quantity + 1)
                      }
                      className="bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-600 transition-colors duration-300"
                    >
                      +
                    </button>
                    <button
                      onClick={() =>
                        handleUpdateCart(item.id, item.quantity - 1)
                      }
                      className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 transition-colors duration-300 mx-2"
                    >
                      -
                    </button>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            )}
            <div className="mt-4">
              <p className="font-semibold text-gray-800">
                Total: ${getTotalPrice().toFixed(2)}
              </p>
            </div>
            <div className="flex justify-between mt-4">
              <button
                onClick={() => setShowCart(false)}
                className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors duration-300"
              >
                Close Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Marketplace;
