import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from './Spinner';

export class News extends Component {

  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page:1
    };
  }

  async componentDidMount() {
// let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=a98db098da0b47fb8cc23ec88e1ac083";
// this.setState({loading: true});
// let data = await fetch(url);
// let parsedData = await data.json();
// this.setState({articles: parsedData.articles, totalArticles: parsedData.totalResults, loading: false});
let data = await fetch("https://free-news.p.rapidapi.com/v1/search?q=breaking%20news&lang=en&page_size=20", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "free-news.p.rapidapi.com",
		"x-rapidapi-key": "4245620b7emsh1e5935ed4a833e8p1795cajsn9ddb54fac144"
	}
})
let parsedData = await data.json();
this.setState({articles: parsedData.articles, totalArticles: parsedData.total_hits, loading: false});
// .then(response => {
// 	console.log(response);
// })
// .catch(err => {
// 	console.error(err);
// });
  }

handleNextClick = async () => {
    console.log("Next Clicked");
    let url = `https://free-news.p.rapidapi.com/v1/search?q=breaking%20news&lang=en&page=${this.state.page+1}&page_size=20`;
this.setState({loading: true});
let data = await fetch(url, {
    "method": "GET",
    "headers": {
        "x-rapidapi-host": "free-news.p.rapidapi.com",
        "x-rapidapi-key": "4245620b7emsh1e5935ed4a833e8p1795cajsn9ddb54fac144"
    }})
let parsedData = await data.json();
this.setState({page: this.state.page+1, articles: parsedData.articles, loading: false});

}
handlePrevClick = async () => {
    console.log("Next Clicked");
    let url = `https://free-news.p.rapidapi.com/v1/search?q=breaking%20news&lang=en&page=${this.state.page-1}&page_size=20`;
this.setState({loading: true});
let data = await fetch(url, {
    "method": "GET",
    "headers": {
        "x-rapidapi-host": "free-news.p.rapidapi.com",
        "x-rapidapi-key": "4245620b7emsh1e5935ed4a833e8p1795cajsn9ddb54fac144"
    }})
let parsedData = await data.json();
this.setState({page: this.state.page-1, articles: parsedData.articles, loading: false});

    
}
  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center my-4">Headlines</h1>
        {this.state.loading ? <Spinner /> : null}
        <div className="row">
          {!this.state.loading && this.state.articles.map((article) => {
            console.log(article);
            return (
              <div className="col-md-3" key="{article.link}">
                <NewsItem
                  key={article.link}
                  title={article.title}
                  description={article.summary}
                  imageUrl={article.media}
                  newsUrl={article.link}
                  author={article.author}
                  date={article.published_date}
                />
              </div>
            );
          })}
        </div>
        <div class="container d-flex justify-content-between my-3">
        <button disabled={this.state.page<2} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
        <button disabled={this.state.page+1>Math.ceil(this.state.totalArticles/20)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    );
  }
}

export default News;
