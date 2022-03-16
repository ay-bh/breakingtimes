import React, {useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";


export default function News(props) {
const [articles, setArticles] = useState([])
const [page, setPage] = useState(1);
const [totalResults, setTotalResults] = useState(0);
const [loading, setLoading] = useState(true);

  document.title = "BreakingTimes";
 


const updateNews= async () =>{
  
  let data = await fetch(`https://free-news.p.rapidapi.com/v1/search?q=breaking%20news&lang=en&page_size=24&page=${page}`, {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "free-news.p.rapidapi.com",
      "x-rapidapi-key": "4245620b7emsh1e5935ed4a833e8p1795cajsn9ddb54fac144"
    }
  })
  let parsedData = await data.json();
  setArticles(parsedData.articles);
  setTotalResults(parsedData.totalResults);
  setLoading(false);
  console.log(parsedData);
}


useEffect(() => {
 updateNews();
});
console.log(articles);

const fetchMoreData= async()=>{
  let url = `https://free-news.p.rapidapi.com/v1/search?q=breaking%20news&lang=en&page_size=24&page=${page}`;
  // const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=63c957333f134574a5808b85400d9ddd&&pageSize=${props.pageSize}`;
  setPage(page + 1);
  let data = await fetch(url, {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "free-news.p.rapidapi.com",
      "x-rapidapi-key": "4245620b7emsh1e5935ed4a833e8p1795cajsn9ddb54fac144"
    }
  })
  let parsedData = await data.json();
      setArticles(articles.concat(parsedData.articles))
      setTotalResults(parsedData.totalResults)
}

  return (
    <div className="container my-3">
    <h1 className="text-center" style={{ margin: "90px 0px 40px" }}>
      Top Headlines
    </h1>
    {loading ? <Spinner /> : null}
    <InfiniteScroll
      dataLength={articles.length}
      next={fetchMoreData}
      hasMore={articles.length !== totalResults}
      loader={<Spinner />}
    >
    <div className="container">
    <div className="row overflow-hidden">
      {articles.map((article) => {
          return (
            <div className="col-md-6 col-lg-4 col-xl-3" key="{article.url}">
              <div className="card-group">
                <NewsItem
                  key={article.link}
                  title={article.title}
                  description={article.summary}
                  imageUrl={article.media}
                  newsUrl={article.link}
                  source={article.rights}
                  author={article.author}
                  date={article.published_date}
                />
              </div>
            </div>
          );
        })}
    </div>
    </div>
    </InfiniteScroll>
   
    </div>
  
);
}
        

News.defaultProps = {
  country: "in",
  page_size: 24,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  page_size: PropTypes.number,
  category: PropTypes.string,
};
