package main

import (
	"context"
	"fmt"
	"net/http"
	"os"

	"github.com/joho/godotenv"
	"github.com/sashabaranov/go-openai"
)

var mclient *Mongo
var gptclient *openai.Client
var prompt string

func enableCORS(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Allow all origins
		w.Header().Set("Access-Control-Allow-Origin", "*")

		// Allow common HTTP methods
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")

		// Allow common headers
		w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, Authorization")

		// Handle preflight requests
		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		next.ServeHTTP(w, r)
	})
}

func main() {
	if err := godotenv.Load(".env"); err != nil {
		panic("no .env file found")
	}
	mclient = InitializeMongo()
	defer func() {
		if err := mclient.Client.Disconnect(context.Background()); err != nil {
			panic(err)
		}
	}()

	if err := mclient.Client.Ping(context.Background(), nil); err != nil {
		panic(err)
	}

	gptkey := os.Getenv("OPENAI_API_KEY")
	gptclient = openai.NewClient(gptkey)
	prompt = os.Getenv("GPT_PROMPT")

	mux := http.NewServeMux()

	mux.HandleFunc("GET /", func(w http.ResponseWriter, r *http.Request) {
		fmt.Println("here")
		w.Write([]byte("Hello, world!"))
	})

	mux.HandleFunc("GET /graphs", GETGraphs)
	mux.HandleFunc("POST /graphs", POSTGraphs)
	mux.HandleFunc("POST /ratings", POSTRating)

	handler := enableCORS(mux)

	fmt.Println("Running on :3000")
	if err := http.ListenAndServe(":3000", handler); err != nil {
		panic(err)
	}
}
