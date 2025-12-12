"use client";

import React, { useState } from "react";

// Single-file Next.js "app" router page (app/page.tsx)
// - Tailwind CSS classes used
// - Barebones shopping UI for beauty products (10 mock products)
// - Client component ("use client") with cart state

const PRODUCTS = [
  {
    id: 1,
    name: "HydraGlow Face Serum",
    brand: "Lumiere",
    price: 799,
    image:
      "https://images.unsplash.com/photo-1580281657524-6f8a2f9f0a2b?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=1",
    desc: "Lightweight serum for daily hydration.",
  },
  {
    id: 2,
    name: "Velvet Matte Lipstick",
    brand: "Rouge",
    price: 599,
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=2",
    desc: "Long-lasting matte finish.",
  },
  {
    id: 3,
    name: "Glow Radiance Face Oil",
    brand: "Aurora",
    price: 1299,
    image:
      "https://images.unsplash.com/photo-1576671080055-3a9d6a6b8d4e?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=3",
    desc: "Nourishing oil for natural glow.",
  },
  {
    id: 4,
    name: "Daily Sunscreen SPF50",
    brand: "SunSafe",
    price: 499,
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=4",
    desc: "Broad spectrum protection.",
  },
  {
    id: 5,
    name: "Purifying Clay Mask",
    brand: "DeepClean",
    price: 699,
    image:
      "https://images.unsplash.com/photo-1556228720-0a0f1b8f9b1f?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=5",
    desc: "Detoxifies pores and mattifies skin.",
  },
  {
    id: 6,
    name: "Soothing Eye Cream",
    brand: "Serein",
    price: 899,
    image:
      "https://images.unsplash.com/photo-1588774069265-79a0f5b7e5d4?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=6",
    desc: "Reduces puffiness and fine lines.",
  },
  {
    id: 7,
    name: "Hydrating Toner",
    brand: "Mistral",
    price: 349,
    image:
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=7",
    desc: "Refreshes and balances skin pH.",
  },
  {
    id: 8,
    name: "Volume Mascara",
    brand: "Forte",
    price: 549,
    image:
      "https://images.unsplash.com/photo-1526403224744-4b7c1b6054c6?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=8",
    desc: "Buildable volume and definition.",
  },
  {
    id: 9,
    name: "Nourishing Hand Cream",
    brand: "Palmier",
    price: 249,
    image:
      "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=9",
    desc: "Fast-absorbing, non-greasy formula.",
  },
  {
    id: 10,
    name: "Silk Hair Serum",
    brand: "Tress",
    price: 999,
    image:
      "https://images.unsplash.com/photo-1513682121636-2d1b8c4fb125?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=10",
    desc: "Smooths frizz and adds shine.",
  },
];

export default function Page() {
  const [cart, setCart] = useState([]);
  const [openCart, setOpenCart] = useState(false);
  const [query, setQuery] = useState("");

  function addToCart(product: any) {
    setCart((prev: any) => {
      const existing = prev.find((p: any) => p.id === product.id);
      if (existing) {
        return prev.map((p: any) =>
          p.id === product.id ? { ...p, qty: p.qty + 1 } : p
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  }

  function removeFromCart(id: any) {
    setCart((prev: any) => prev.filter((p: any) => p.id !== id));
  }

  function changeQty(id: any, delta: any) {
    setCart((prev: any) =>
      prev.map((p: any) =>
        p.id === id ? { ...p, qty: Math.max(1, p.qty + delta) } : p
      )
    );
  }

  const filtered = PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.brand.toLowerCase().includes(query.toLowerCase())
  );

  const total = cart.reduce((s: any, i: any) => s + i.price * i.qty, 0);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="bg-white shadow-sm sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-2xl font-bold">BeautyMarket</div>
            <div className="hidden md:block">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products or brand"
                className="w-72 px-3 py-2 border rounded-md focus:outline-none focus:ring"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setOpenCart(true)}
              className="relative inline-flex items-center gap-2 px-3 py-2 border rounded-md hover:bg-gray-50"
              aria-label="Open cart"
            >
              Cart
              <span className="ml-1 inline-flex items-center justify-center w-6 h-6 text-sm font-medium bg-gray-200 rounded-full">
                {cart.reduce((s: any, c: any) => s + c.qty, 0)}
              </span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <section className="mb-8">
          <h1 className="text-3xl font-semibold">
            Shop popular beauty products
          </h1>
          <p className="text-gray-600 mt-2">
            Single-page demo with 10 mock products. Click "Add" to put items in
            the cart.
          </p>
        </section>

        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map((p: any) => (
              <article
                key={p.id}
                className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col"
              >
                <div className="aspect-4/3 bg-gray-100">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium">{p.name}</h3>
                      <p className="text-sm text-gray-500">{p.brand}</p>
                    </div>
                    <div className="text-lg font-semibold">₹{p.price}</div>
                  </div>

                  <p className="text-sm text-gray-600 mt-2 flex-1">{p.desc}</p>

                  <div className="mt-4 flex items-center justify-between">
                    <button
                      onClick={() => addToCart(p)}
                      className="px-3 py-2 bg-linear-to-r from-pink-500 to-pink-400 text-white rounded-md shadow-sm hover:opacity-95"
                    >
                      Add
                    </button>
                    <button
                      className="text-sm text-gray-600 underline"
                      onClick={() =>
                        alert("Details not implemented in this demo")
                      }
                    >
                      Details
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      {/* Cart drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full md:w-96 bg-white shadow-xl transform transition-transform duration-200 ${
          openCart ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
      >
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-medium">Your cart</h2>
          <button onClick={() => setOpenCart(false)} className="text-gray-600">
            Close
          </button>
        </div>
        <div className="p-4 overflow-y-auto h-[calc(100%-160px)]">
          {cart.length === 0 ? (
            <p className="text-gray-500">Cart is empty.</p>
          ) : (
            <ul className="space-y-4">
              {cart.map((it: any) => (
                <li key={it.id} className="flex items-center gap-3">
                  <img
                    src={it.image}
                    alt={it.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <div className="font-medium">{it.name}</div>
                    <div className="text-sm text-gray-500">{it.brand}</div>
                    <div className="text-sm mt-1">
                      ₹{it.price} × {it.qty} ={" "}
                      <span className="font-semibold">
                        ₹{it.price * it.qty}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => changeQty(it.id, -1)}
                        className="px-2 py-1 border rounded"
                      >
                        -
                      </button>
                      <div className="px-3">{it.qty}</div>
                      <button
                        onClick={() => changeQty(it.id, +1)}
                        className="px-2 py-1 border rounded"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeFromCart(it.id)}
                        className="ml-2 text-sm text-red-600"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="p-4 border-t">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm text-gray-600">Subtotal</div>
            <div className="text-lg font-semibold">₹{total}</div>
          </div>
          <button
            disabled={cart.length === 0}
            onClick={() => alert("Checkout not implemented")}
            className={`w-full px-4 py-3 rounded-md text-white ${
              cart.length === 0
                ? "bg-gray-300"
                : "bg-linear-to-r from-green-500 to-green-400"
            }`}
          >
            Checkout
          </button>
        </div>
      </div>

      <footer className="max-w-6xl mx-auto px-4 py-6 text-sm text-gray-500">
        Demo single-page Next.js app-router using a client component. Tailwind
        CSS is required in the project for proper styles.
      </footer>
    </div>
  );
}
