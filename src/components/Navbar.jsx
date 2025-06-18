"use client";

import Link from "next/link";
import arrow from "@/assets/downward-arrow-icon-3.jpg";
import {
  Navbar,
  Nav,
  Container,
  NavDropdown,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import "../styles/components.css";
import { useEffect, useState } from "react";
import Image from "next/image";
import { getWishlist } from "@/utils/localWishlist";
export default function AppNavbar() {
  const [selectedLang, setSelectedLang] = useState("En");
  const [disp, setdisp] = useState(false);
  const [arrWish, setArrWish] = useState([]);

  const handleSelect = (eventKey) => {
    setSelectedLang(eventKey);
    console.log("Selected language:", eventKey);
  };
  useEffect(() => {
    const updateWishlist = () => {
      const arr = getWishlist();
      setArrWish(arr);
      setdisp(arr.length !== 0);
    };

    updateWishlist();
    window.addEventListener("wishlistUpdated", updateWishlist);
    return () => {
      window.removeEventListener("wishlistUpdated", updateWishlist);
    };
  }, []);
  return (
    <Navbar
      className="mb-4 custom-navbar ps-4 py-0"
      style={disp ? { paddingRight: 50 } : { paddingRight: 25 }}
      variant="dark"
      expand="lg"
    >
      {/* <Container> */}
      <Link
        href="/"
        className="navbar-brand fw-bold"
        style={{ color: "black" }}
      >
        Movie App
      </Link>

      <Navbar.Toggle aria-controls="main-nav" />
      <Navbar.Collapse id="main-nav">
        <Nav className="ms-auto align-items-center">
          <DropdownButton
            id="language-dropdown"
            title={
              <span className="lang" style={{ fontWeight: "bold" }}>
                {selectedLang}
                <Image
                  className="ms-1"
                  src={arrow}
                  alt="Logo"
                  width={15}
                  height={15}
                />
              </span>
            }
            onSelect={handleSelect}
            variant="none"
            className="fw-bold"
          >
            <Dropdown.Item eventKey="En">En</Dropdown.Item>
            <Dropdown.Item eventKey="Ar">Ar</Dropdown.Item>
            <Dropdown.Item eventKey="Fr">Fr</Dropdown.Item>
          </DropdownButton>
          <Link
            href="/wishlist"
            className="nav-link d-flex align-items-center wish py-0"
          >
            <span className="text-dark heart" style={{ fontSize: 50 }}>
              ♥
            </span>
            <span className="ms-1 texted">Watchlist</span>
            <div className={`whishNum ${disp ? "d-flex" : "d-none"}`}>
              <h5>{arrWish.length}</h5>
            </div>
          </Link>
        </Nav>
      </Navbar.Collapse>
      {/* </Container> */}
    </Navbar>
  );
}
