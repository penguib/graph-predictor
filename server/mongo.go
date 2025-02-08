package main

import (
	"context"
	"log"
	"os"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Mongo struct {
	Client   *mongo.Client
	Database *mongo.Database

	Graphs *mongo.Collection
}

func InitializeMongo() *Mongo {
	uri := os.Getenv("MONGODB_URI")
	if uri == "" {
		log.Fatal("Set your 'MONGODB_URI' environment variable. " +
			"See: " +
			"www.mongodb.com/docs/drivers/go/current/usage-examples/#environment-variable")
	}

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	clientOptions := options.Client().
		ApplyURI(uri).
		SetServerSelectionTimeout(5 * time.Second).
		SetConnectTimeout(5 * time.Second)

	client, err := mongo.Connect(ctx, clientOptions)

	if err := client.Ping(ctx, nil); err != nil {
		panic(err)
	}

	if err != nil {
		panic(err)
	}

	db := client.Database("GP")

	return &Mongo{
		Client:   client,
		Database: db,
		Graphs:   db.Collection("graphs"),
	}
}
