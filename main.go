package main

import (
	"io"
	"log"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
)

var omdbApiKey string

type OmdbReq struct {
	title     string
	mediatype string
}

func GetOmdbUrl(o OmdbReq) string {

	reqURL := "https://www.omdbapi.com/?r=json&plot=short&apiKey="
	reqURL += omdbApiKey

	// Required title
	reqURL += "&title="
	reqURL += o.title

	// Conditional type param
	if o.mediatype != "" {
		reqURL += "&type="
		reqURL += o.mediatype
	}

	//reqURL := reqURL + "&type="
	//reqURL := reqURL + mType

	// apiKey, t = title, plot = short,
	// r = json, type= movie|episode|series
	// plot = short

	return reqURL
}

func main() {
	port := os.Getenv("PORT")
	apiKey := os.Getenv("OMDB_KEY")

	if port == "" {
		log.Fatal("$PORT must be set")
	}

	if apiKey == "" {
		log.Fatal("$OMDB_KEY must be set")
	}

	// Set global
	omdbApiKey = apiKey

	router := gin.Default()
	//router.Use(gin.Logger())

	router.GET("/details", func(c *gin.Context) {

		mTitle := c.Query("title")
		mType := c.Query("type")

		if mTitle == "" {
			c.JSON(422, gin.H{"Error": "Missing title parameter"})
			return
		}

		reqStruct := OmdbReq{mTitle, mType}
		reqURL := GetOmdbUrl(reqStruct)

		response, err := http.Get(reqURL)

		if err != nil {
			log.Fatal(err)
			c.JSON(500, gin.H{"Error": "Failed to contact remote service"})
			return
		}

		defer response.Body.Close()

		_, errP := io.Copy(os.Stdout, response.Body)

		if errP != nil {
			log.Fatal(err)
			c.JSON(500, gin.H{"Error": "Failed to parse response from remote service"})
			return
		}

		c.JSON(http.StatusOK, gin.H{"result": response})

	})

	router.Run(":" + port)
}
