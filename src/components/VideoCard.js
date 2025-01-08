import React from "react";

const VideoCard = (info) => {
  // console.log(info);

  // const channelTitle = info?.info?.snippet?.channelTitle;
  // const title = info?.info?.snippet?.title;
  // const thumbnails = info?.info?.snippet?.thumbnails.medium?.url;
  // const viewCount = info?.info?.statistics?.viewCount;

  const { snippet, statistics } = info?.info || {};
  const { channelTitle, title, thumbnails } = snippet || {};
  const { medium } = thumbnails || {};
  const { url } = medium || {};
  const { viewCount } = statistics || {};

  // console.log(channelTitle, title, url, viewCount);



  return (
    <div className="p-2 m-2 w-72 shadow-lg">
      <img className="rounded-xl" alt="thumbnail" src={url} />
      <ul>
        <li className="font-bold py-2">{title}</li>
        <li>{channelTitle}</li>
        <li>{viewCount} views</li>
      </ul>
    </div>
  );
};

export default VideoCard;