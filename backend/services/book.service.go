package services

import (
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"os"
	"unsafe"
)

type Ebook struct {
	Title       string `json:"title"`
	URL         string `json:"url"`
	TxtURL      string `json:"txt_url"`
	SummaryPath string `json:"summary_path"`
}

type EbookCollection map[string]Ebook

type BookResponse struct {
	BookKey  string `json:"book_key,omitempty"`
	Title    string `json:"title,omitempty"`
	Author   string `json:"author,omitempty"`
	ImageURL string `json:"image_url,omitempty"`
	Summary  string `json:"summary,omitempty"`
	Content  string `json:"content,omitempty"`
}

// GetBooks get paginated book list
func GetBooks(page int, limit int) ([]BookResponse, error) {

	localDatabasePath := "init_scripts/db.json"
	jsonFile, _ := os.Open(localDatabasePath)
	var data EbookCollection

	decoder := json.NewDecoder(jsonFile)
	if err := decoder.Decode(&data); err != nil {
		log.Fatalf("Error decoding JSON: %v", err)
	}

	var books []BookResponse
	for key, val := range data {
		content, _ := os.ReadFile("init_scripts/" + val.SummaryPath)
		var book BookResponse
		book.Content = string(content)
		book.Title = val.Title
		book.BookKey = key
		books = append(books, book)
	}

	fmt.Printf("Memory in bytes size %v", unsafe.Sizeof(books))

	return books, nil

}

func GetBookById(bookId string) (*BookResponse, error) {
	localDatabasePath := "init_scripts/db.json"
	jsonFile, _ := os.Open(localDatabasePath)
	var data EbookCollection

	decoder := json.NewDecoder(jsonFile)
	if err := decoder.Decode(&data); err != nil {
		log.Fatalf("Error decoding JSON: %v", err)
	}

	if bookMetadata, ok := data[bookId]; ok {
		content, _ := os.ReadFile("init_scripts/" + bookMetadata.SummaryPath)
		var book BookResponse
		book.Content = string(content)
		book.Title = bookMetadata.Title
		book.BookKey = bookId
		return &book, nil
	}

	return nil, errors.New("Book not found")
}
