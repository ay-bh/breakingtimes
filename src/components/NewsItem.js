
 import React from 'react'
 
 export default function NewsItem(props) {
    let { title, description, imageUrl, newsUrl, source, date, author } = props;
  return (
    <div>
      <div className="card my-2">
        <img
          src={
            imageUrl
              ? imageUrl
              : "https://www.reuters.com/resizer/x4mR__Y73SBLtyKl9H7Cy6VldZU=/1200x628/smart/filters:quality(80)/cloudfront-us-east-2.images.arcpublishing.com/reuters/V52IBJMFUFKX5JCW4IDDVBBRUI.jpg"
          }
          className="card-img-top"
          alt="..."
        />
        <span className="badge bg-dark text-light rounded-0 rounded-bottom">{source}</span>
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <p>
            <a
              rel="noreferrer"
              href={newsUrl}
              target="_blank"
              className="btn btn-dark text-center"
            >
              Read More
            </a>
          </p>
        </div>
        <div className="card-footer">
          <small className="text-muted">
            By {author ? author : "unknown"} on {new Date(date).toGMTString()}
          </small>
        </div>
      </div>
    </div>
  );
   
 }
 