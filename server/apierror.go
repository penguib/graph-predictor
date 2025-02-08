package main

import (
	"encoding/json"
	"net/http"
)

type ApiError struct {
	Error string
	Code  int
}

func WriteError(w http.ResponseWriter, err string, code int) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(code)
	apierr := ApiError{
		Error: err,
		Code:  code,
	}
	if err := json.NewEncoder(w).Encode(apierr); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}
