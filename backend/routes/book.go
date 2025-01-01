package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/sreekaroo/BookAI/backend/controllers"
)

func BookRoute(router *gin.RouterGroup, handlers ...gin.HandlerFunc) {
	books := router.Group("/books", handlers...)
	{
		books.GET(
			"",
			controllers.GetBooks,
		)
		books.GET(
			"/:id",
			controllers.GetOneBook,
		)
	}
}
