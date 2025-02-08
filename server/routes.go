package main

import (
	"context"
	"encoding/json"
	"net/http"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Graph struct {
	ID              primitive.ObjectID `bson:"_id,omitempty"`
	DescriptionX    string             `json:"description_x" bson:"description_x"`
	DescriptionY    string             `json:"description_y" bson:"description_y"`
	Points          [][]int64          `bson:"points"`
	GeneratedPoints [][]int64          `json:"generated_points,omitempty" bson:"generated_points,omitempty"`
	Rating          int                `json:"rating,omitempty" bson:"rating,omitempty"`
	Image           string             `json:"image" bson:"image"`
}

type Rating struct {
	ID     string `json:"id"`
	Rating int    `json:"rating"`
}

type GPTResponse struct {
	Reasoning string
	Points    [][]int64
}

type ClientResponse struct {
	ID    string
	Graph *GPTResponse
}

func GETGraphs(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var graphs []Graph
	options := options.Find().SetLimit(25).SetSort(bson.M{"_id": -1})
	cursor, err := mclient.Graphs.Find(context.Background(), bson.M{}, options)
	if err != nil {
		WriteError(w, "error fetching graphs", http.StatusInternalServerError)
		return
	}

	defer cursor.Close(context.Background())

	if err = cursor.All(context.Background(), &graphs); err != nil {
		WriteError(w, err.Error(), http.StatusInternalServerError)
		return
	}

	if err = json.NewEncoder(w).Encode(graphs); err != nil {
		WriteError(w, "error writing bytes", http.StatusInternalServerError)
		return
	}
}

func POSTGraphs(w http.ResponseWriter, r *http.Request) {
	decoder := json.NewDecoder(r.Body)
	var graph Graph
	if err := decoder.Decode(&graph); err != nil {
		WriteError(w, "bad request", http.StatusBadRequest)
		return
	}

	objID := primitive.NewObjectID()
	graph.ID = objID

	gptRes, err := QueryGPT(&graph)
	if err != nil {
		WriteError(w, err.Error(), http.StatusInternalServerError)
		return
	}

	var jsonRes GPTResponse
	if err := json.Unmarshal([]byte(gptRes), &jsonRes); err != nil {
		WriteError(w, "error decoding gpt response", http.StatusInternalServerError)
		return
	}

	graph.GeneratedPoints = jsonRes.Points

	_, err = mclient.Graphs.InsertOne(context.Background(), graph)
	if err != nil {
		WriteError(w, "error writing to database", http.StatusInternalServerError)
		return
	}

	response := ClientResponse{
		ID:    objID.Hex(),
		Graph: &jsonRes,
	}

	w.Header().Set("Content-Type", "application/json")
	if err = json.NewEncoder(w).Encode(&response); err != nil {
		WriteError(w, "error writing bytes", http.StatusInternalServerError)
		return
	}
}

func POSTRating(w http.ResponseWriter, r *http.Request) {
	decoder := json.NewDecoder(r.Body)
	var rating Rating
	if err := decoder.Decode(&rating); err != nil {
		WriteError(w, "bad request", http.StatusBadRequest)
		return
	}

	objID, err := primitive.ObjectIDFromHex(rating.ID)
	if err != nil {
		WriteError(w, "bad id", http.StatusBadRequest)
		return
	}

	filter := bson.M{
		"_id": objID,
	}
	update := bson.M{
		"$set": bson.M{
			"rating": rating.Rating,
		},
	}
	_, err = mclient.Graphs.UpdateOne(context.Background(), filter, update)
	if err != nil {
		WriteError(w, err.Error(), http.StatusInternalServerError)
		return
	}
}
