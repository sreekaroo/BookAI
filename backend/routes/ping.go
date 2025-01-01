package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/sreekaroo/BookAI/backend/controllers"
)

func PingRoute(router *gin.RouterGroup) {
	auth := router.Group("/ping")
	{
		auth.GET(
			"",
			controllers.Ping,
		)
	}
}
