"use client";
import { IconBrandInstagram } from "@tabler/icons-react";
import React from "react";

const Footer = () => {
    return (
        <>
            <div className="footer mt-5">
                <div className="copyright">
                    <p>
                        Copyright © Developed by{" "}
                        <a href="https://www.instagram.com/marcell_ims">
                            @marcell_ims
                        </a>
                        <IconBrandInstagram />
                        2024
                    </p>
                </div>
            </div>
        </>
    );
};

export default Footer;
