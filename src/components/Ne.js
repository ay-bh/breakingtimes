import React, {useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";


export default function News(props) {
const [articles, setArticles] = useState([])
const [page, setPage] = useState(1);
const [totalResults, setTotalResults] = useState(0);
const [loading, setLoading] = useState(false);
// const [apiK, setApiK] = useState("765c8344bb974b888d87cb5221185475");
const cFL = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
// apiK = 'a98db098da0b47fb8cc23ec88e1ac083';
// 63c957333f134574a5808b85400d9ddd
// apiK: "765c8344bb974b888d87cb5221185475",

  document.title = `${cFL(props.category)} - DailyAffairs`;


const updateNews= async () =>{
  const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=63c957333f134574a5808b85400d9ddd&page=${page}&pageSize=${props.pageSize}`;
  
  let data = await fetch(url);
  let parsedData = await data.json();
  setArticles(parsedData.articles);
  setTotalResults(parsedData.totalResults);
  setLoading(false);
  
}


useEffect(() => {
 updateNews();
},[]);

const fetchMoreData= async()=>{
  const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=63c957333f134574a5808b85400d9ddd&page=${page+1}&pageSize=${props.pageSize}`;
  setPage(page + 1);
  let data = await fetch(url);
  let parsedData = await data.json();
      setArticles(articles.concat(parsedData.articles))
      setTotalResults(parsedData.totalResults)
}

  return (
    <div className="container my-3">
    <h1 className="text-center" style={{ margin: "90px 0px 40px" }}>
      {cFL(props.category)} Headlines
    </h1>
    {loading ? <Spinner /> : null}
    <InfiniteScroll
      dataLength={articles.length}
      next={fetchMoreData}
      hasMore={articles.length !== totalResults}
      loader={<Spinner />}
    >
    <div className="row">
      {articles.map((article) => {
          return (
            <div className="col-md-6 col-lg-4 col-xl-3" key="{article.url}">
              <div className="card-group">
                <NewsItem
                  key={article.url}
                  title={article.title}
                  description={article.description}
                  imageUrl={article.urlToImage}
                  newsUrl={article.url}
                  source={article.source.name}
                  author={article.author}
                  date={article.publishedAt}
                />
              </div>
            </div>
          );
        })}
    </div>
    </InfiniteScroll>
   
    </div>
  
);
}
        

News.defaultProps = {
  country: "in",
  pageSize: 24,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};
