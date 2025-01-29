import React from "react";
import {
  FacebookIcon,
  FacebookMessengerIcon,
  FacebookMessengerShareButton,
  FacebookShareButton,
  InstapaperIcon,
  InstapaperShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  ViberIcon,
  ViberShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";

const ShareButtons = ({ url, id }) => {
  url = `https://www.facebook.com/http://localhost:3000/blood_requests/${id}`;

  return (
    <>
      <div className="p-5 border d-flex flex-row flex-wrap gap-3 rounded-md shadow-md bg-white">
        <FacebookShareButton url={url} className="mb-2 bg-blue">
          <FacebookIcon size={32} round />
        </FacebookShareButton>

        <FacebookMessengerShareButton url={url} className="mb-2">
          <FacebookMessengerIcon size={32} round />
        </FacebookMessengerShareButton>

        <InstapaperShareButton url={url} className="mb-2">
          <InstapaperIcon size={32} round />
        </InstapaperShareButton>

        <TelegramShareButton url={url} className="mb-2">
          <TelegramIcon size={32} round />
        </TelegramShareButton>

        <TwitterShareButton url={url} className="mb-2">
          <TwitterIcon size={32} round />
        </TwitterShareButton>

        <ViberShareButton url={url} className="mb-2">
          <ViberIcon size={32} round />
        </ViberShareButton>

        <WhatsappShareButton url={url} quote className="mb-2">
          <WhatsappIcon size={32} round />
        </WhatsappShareButton>
      </div>
    </>
  );
};

export default ShareButtons;
