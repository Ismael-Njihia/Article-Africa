import React,{useEffect, useState} from 'react'
import { useGetArticlesQuery } from '../slices/ArticlesApiSlice';
import { useGetCategoriesQuery } from '../slices/CategoryApiSlice';
import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { htmlToText } from 'html-to-text';
import '../App.css'
import Spinner from  '../components2/Spinner'
import { toast } from 'react-toastify';


const Homepage = () => {
    const { data, error, isLoading } = useGetArticlesQuery();
    const {data: categories, error: articleError, isLoading: articleIsLoading} = useGetCategoriesQuery();
    const [screenwidth, setScreenwidth] = useState(window.innerWidth);

    const handleResize = () => {
      setScreenwidth(window.innerWidth);
    }

    useEffect(() => {
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      }
    },[])
    
     if (isLoading) {
      return (
        <div className='spinnerDiv'>
           <Spinner />
         </div>
       );
     }
   
  return (
    <>
    {
      error && toast.error(error.message)
    }
    {
      articleError && toast.error(articleError.message)
    }
   
    <div className='appContainer' >
      <div className='leftDiv'>
        
        <Row xs={1} md={3} lg={4}>
          {data &&
            data.map((article) => {
              //Parse the HTML content to find and replace image links
              const parsedBody = article.body.replace(
                /<img src="([^"]+)" alt="([^"]+)"(.*?)>/g,
                (match, src, alt) =>`<img src=${src} alt=${alt} style="width:70%;height:auto;"/>`
              )


              const text = htmlToText(parsedBody, {
                wordwrap: false,
                ignoreHref: true,
                ignoreImage: true,
              });
              //limit the words based on the screen size
              //if the screen size is less than 768px, limit the words to 125

              const shortText = screenwidth < 768 ? text.length > 150 ? text.substring(0,190) + '...' : text : text.length > 55 ? text.substring(0,55) + '...' : text;

              //check if the article tittle is greater than 15 characters
              //if yes, the small screen will display only 55 characters
              //else, the screen will display 37 characters
              const articleTitle = screenwidth < 768 ? article.title.length > 15 ? article.title.substring(0, 75) + "..." : article.title : article.title.length > 15 ? article.title.substring(0, 30) + "..." : article.title;

              
              return (
                <Col key={article._id}>
                  <Link to={`/article/${article._id}`} style={{ textDecoration: "none" }}>
                    <div className="article-container" style={{ marginBottom: "10px" }}>
                      {/* Render the Image coming from the backend */}
                      <div className="article-image" style={{ height: "160px", overflow: "hidden" }}>
                        <img src={article.image} alt={article.title} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} />
                      </div>
                       <p className="articleTitleSmall">{articleTitle}</p> 
                      <div className="shortArticleText">{shortText}</div>
                    </div>
                  </Link>
                </Col>
              );
            })
          }
        </Row>
      </div>
      <div className='rightDiv'>
        {articleIsLoading && <div>Loading...</div>}
        <h4>Topics</h4>

        <div className='categoriesDiv'>
          {categories &&
            categories.map((category) => {
              return(
                <div key={category._id}>
                  <Link to={`/category/${category.name}`}>
                    <h5 className='categoryLinks'>{category.name}</h5>
                  </Link>
                </div>
              )

            })
          }
        </div>
        
        
      </div>
    </div>
    </>
  )
}

export default Homepage