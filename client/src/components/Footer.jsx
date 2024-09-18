import { Footer } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";
import { BsFacebook, BsGithub, BsInstagram, BsX } from "react-icons/bs";

export default function FooterComp() {
  return (
    <Footer container className="border border-t-8 border-blue-800">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1">
          {/* Logo */}

          <div className="mt-5">
            <Link
              to="/"
              className="self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white"
            >
              <span className="px-2 py-1 bg-gradient-to-r from-pink-600 via-orange-500 to-yellow-400 rounded-lg text-white">
                Amal's
              </span>
              Blog
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <Footer.Title title="About" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="/about"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Amal's Blog
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Follow Us" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://github.com/Amaljith06"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Github
                </Footer.Link>
              </Footer.LinkGroup>
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://www.linkedin.com/in/amaljith-kumar-a-846523228/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Legal" />
              <Footer.LinkGroup col>
                <Footer.Link href="#">Privacy Policy</Footer.Link>
              </Footer.LinkGroup>
              <Footer.LinkGroup col>
                <Footer.Link href="#">Terms &amp; Conditions</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm:item-center sm:justify-between">
          <Footer.Copyright
            href="#"
            by="Amal's blog"
            year={new Date().getFullYear()}
          />
          <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
            <Footer.Icon
              href="https://www.facebook.com/amaljith.kumara"
              icon={BsFacebook}
            />
            <Footer.Icon
              href="https://www.instagram.com/amaljith_kumar_a/"
              icon={BsInstagram}
            />
            <Footer.Icon href="https://x.com/AmaljithKumar" icon={BsX} />
            <Footer.Icon href="https://github.com/Amaljith06" icon={BsGithub} />
          </div>
        </div>
      </div>
    </Footer>
  );
}
