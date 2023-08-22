package main

import (
	"fmt"
	"net/http"

	log "github.com/cihub/seelog"
	"github.com/gorilla/mux"
)

func main() {
	r := mux.NewRouter()

	port := 3333

	r.NotFoundHandler = http.HandlerFunc(index)
	r.PathPrefix("/static/").Handler(http.StripPrefix("/static/", http.FileServer(http.Dir("build/static/"))))
	r.PathPrefix("/public/").Handler(http.StripPrefix("/public/", http.FileServer(http.Dir("public/"))))
	r.HandleFunc("/", index)

	var handler http.Handler = r

	log.Infof("Starting server on port: %d", port)
	http.ListenAndServe(fmt.Sprintf(":%d", port), handler)
}

func index(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "./build/index.html")
}
