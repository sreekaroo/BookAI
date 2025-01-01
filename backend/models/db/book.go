package models

import (
	"github.com/kamva/mgm/v3"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Book struct {
	mgm.DefaultModel `bson:",inline"`
	EbookNumber      string             `json:"ebookNumber" bson:"ebookNumber"`
	Title            string             `json:"title" bson:"title"`
	Content          string             `json:"content" bson:"content"`
	Overview         string             `json:"overview,omitempty" bson:"overview,omitempty"`
	Author           primitive.ObjectID `json:"author,omitempty" bson:"author,omitempty"`
	ImageUrl         string             `json:"imageUrl,omitempty" bson:"imageUrl,omitempty"`
	SourceUrl        string             `json:"sourceUrl,omitempty" bson:"sourceUrl,omitempty"`
}

func NewBook(ebookNumber string, title string, content string) *Book {
	return &Book{
		EbookNumber: ebookNumber,
		Title:       title,
		Content:     content,
	}
}

func (model *Book) CollectionName() string {
	return "books"
}

// You can override Collection functions or CRUD hooks
// https://github.com/Kamva/mgm#a-models-hooks
// https://github.com/Kamva/mgm#collections
