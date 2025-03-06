import React from "react"
import {createRoutesFromElements , createBrowserRouter , Route} from "react-router-dom"
import Layout from "../Layout/Layout"
import Home from "../pages/Home"
import Sell from "../pages/Sell"
import Shop from "../pages/Shop"
import ProductDetail from "../pages/ProductDetail"
import Checkout from "../pages/Checkout"
import Cart from "../pages/Cart"

export const router = createBrowserRouter(
    createRoutesFromElements(
        <>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/buy" element={<Shop />} />
          <Route path="/sell" element={<Sell />} />
          <Route path="/buyDetail/:id" element={<ProductDetail />} />
          <Route path="/checkout" element={<Checkout />} />
        </Route>
        </>
    )
)