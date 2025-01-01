package middlewares

import (
	"github.com/gin-gonic/gin"
	"github.com/sreekaroo/BookAI/backend/models"
	"net/http"
)

func AppRecovery() func(c *gin.Context, recovered interface{}) {
	return func(c *gin.Context, recovered interface{}) {
		if err, ok := recovered.(string); ok {
			models.SendErrorResponse(c, http.StatusInternalServerError, err)
			return
		}
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"success": false}) // recovery failed
	}
}
