package main

import (
	"encoding/json"
	"log"
	"net/http"
	"net/url"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/gregjones/httpcache"
)

var omdbAPIKey string
var reqClient = &http.Client{
	Timeout:   10 * time.Second,
	Transport: httpcache.NewMemoryCacheTransport(),
}

// OmdbReq Formats what we use to generate the Request URL to OMDB API
type OmdbReq struct {
	title     string
	mediatype string
}

// Rating Formats each DB rating, e.g. IMDB & Rotten Tomatoes
type Rating struct {
	Source string
	Value  string
}

// OmdbResp Formats repsonse from OMDB API
type OmdbResp struct {
	Error   string
	Title   string
	Year    string
	Type    string
	Ratings []Rating
	ImdbID  string `json:"imdbID"`
}

func getOmdbURL(o OmdbReq) string {

	reqURL := "https://www.omdbapi.com/?r=json&plot=short&apikey="
	reqURL += omdbAPIKey

	// Required title
	reqURL += "&t="
	reqURL += url.QueryEscape(o.title)

	// Conditional type param
	if o.mediatype != "" {
		reqURL += "&type="
		reqURL += url.QueryEscape(o.mediatype)
	}

	//reqURL := reqURL + "&type="
	//reqURL := reqURL + mType

	// apiKey, t = title, plot = short,
	// r = json, type= movie|episode|series
	// plot = short

	return reqURL
}

func getJSON(url string, target interface{}) error {
	r, err := reqClient.Get(url)
	if err != nil {
		return err
	}
	defer r.Body.Close()

	return json.NewDecoder(r.Body).Decode(target)
}

func main() {
	port := os.Getenv("PORT")
	omdbAPIKey = os.Getenv("OMDB_KEY")

	if port == "" {
		log.Fatal("env PORT must be set")
	}

	if omdbAPIKey == "" {
		log.Fatal("env OMDB_KEY must be set")
	}

	// Set ENV key global to the package
	//omdbAPIKey = apiKey

	router := gin.Default()

	router.GET("/details", func(c *gin.Context) {

		mTitle := c.Query("title")
		mType := c.Query("type")

		if mTitle == "" {
			c.JSON(422, gin.H{"error": "Missing title parameter"})
			return
		}

		reqStruct := OmdbReq{mTitle, mType}
		reqURL := getOmdbURL(reqStruct)

		log.Print(reqURL)

		response := new(OmdbResp) // or &Foo{}
		errP := getJSON(reqURL, response)

		if errP != nil {
			log.Fatal(errP)
			c.JSON(500, gin.H{"error": "Failed to parse response from remote service"})
			return
		}

		c.JSON(http.StatusOK, gin.H{"result": response})

	})

	router.Run(":" + port)
}
