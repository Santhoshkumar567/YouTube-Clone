import React from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { FaWhatsapp, FaFacebookF } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import { BsTwitter } from "react-icons/bs";
import { AiOutlineLinkedin } from "react-icons/ai";
const Share = ({ content }) => {
  //for copy the sharing link
  const handleCopyClick = () => {
    navigator.clipboard
      .writeText(content)
      .then(() => {
        alert("Content copied to clipboard!");
      })
      .catch((error) => {
        console.error("Failed to copy content: ", error);
      });
  };
  return (
    <div className="modal-box">
      <div className="flex">
        <h3 className="font-bold text-xl upload-modal-title">Share</h3>
        <div className="modal-action">
          <form method="dialog">
            <button className="upload-modal-close ">
              <AiOutlineCloseCircle />
            </button>
          </form>
        </div>
      </div>

      <div className="py-4">
        <div className="flex  ">
          <a
            href="whatsapp://send?text=The text to share!"
            data-action="share/whatsapp/share"
            target="_blank"
            className="mr-5 ml-24 hover:text-green-800"
          >
            <FaWhatsapp size="36" />
          </a>
          <a
            href="https://www.facebook.com/help/668969529866328/?helpref=uf_share"
            target="_blank"
            className="mr-5 hover:text-blue-800"
          >
            <FaFacebookF size="36" />
          </a>
          <a
            href="https://mail.google.com/"
            target="blank"
            className="mr-5 hover:text-red-700"
          >
            <AiOutlineMail size="36" />
          </a>
          <a
            href="https://twitter.com/i/flow/login"
            target="_blank"
            className="mr-5 hover:text-blue-600"
          >
            <BsTwitter size="36" />
          </a>
          <a
            href=" https://www.linkedin.com/login?fromSignIn=true&trk=guest_homepage-basic_nav-header-signin"
            target="_blank"
            className="mr-5 hover:text-blue-600"
          >
            <AiOutlineLinkedin size="36" />
          </a>
        </div>
        <div className="w-full mt-10 bg-black border-y-yellow-100 h-12 p-3 flex rounded-lg">
          <div className="w-10/12 ">
            {content.length > 40 ? content.substring(0, 40) + "..." : content}
          </div>
          <button
            className="bg-white text-black rounded-full w-2/12"
            onClick={handleCopyClick}
          >
            Copy
          </button>
        </div>
      </div>
    </div>
  );
};

export default Share;
