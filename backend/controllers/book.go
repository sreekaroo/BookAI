package controllers

import (
	"github.com/gin-gonic/gin"
	"github.com/sreekaroo/BookAI/backend/models"
	"github.com/sreekaroo/BookAI/backend/services"
	"net/http"
	"strconv"
)

// GetBooks godoc
// @Summary      Get Books
// @Description  gets user books with pagination
// @Tags         notes
// @Accept       json
// @Produce      json
// @Param        page  query    string  false  "Switch page by 'page'"
// @Success      200  {object}  models.Response
// @Failure      400  {object}  models.Response
// @Router       /notes [get]
// @Security     ApiKeyAuth
func GetBooks(c *gin.Context) {
	response := &models.Response{
		StatusCode: http.StatusBadRequest,
		Success:    false,
	}

	pageQuery := c.DefaultQuery("page", "0")
	page, _ := strconv.Atoi(pageQuery)
	limit := 5

	books, _ := services.GetBooks(page, limit)
	hasPrev := page > 0
	hasNext := len(books) > limit

	if hasNext {
		books = books[:limit]
	}

	response.StatusCode = http.StatusOK
	response.Success = true
	response.Data = gin.H{"books": books, "prev": hasPrev, "next": hasNext}
	response.SendResponse(c)
}

// GetOneBook godoc
// @Summary      Get a book
// @Description  get book by id
// @Tags         books
// @Accept       json
// @Produce      json
// @Param        id   path      string  true  "Book ID"
// @Success      200  {object}  models.Response
// @Failure      400  {object}  models.Response
// @Router       /books/{id} [get]
// @Security     ApiKeyAuth
func GetOneBook(c *gin.Context) {
	response := &models.Response{
		StatusCode: http.StatusBadRequest,
		Success:    false,
	}

	paramId := c.Param("id")

	book, err := services.GetBookById(paramId)
	if err != nil {
		response.Message = err.Error()
		response.SendResponse(c)
		return
	}

	response.StatusCode = http.StatusOK
	response.Success = true
	response.Data = gin.H{"book": book}
	response.SendResponse(c)
}
