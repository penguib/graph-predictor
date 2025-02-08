package main

import (
	"context"
	"fmt"
	"strings"

	"github.com/sashabaranov/go-openai"
)

func QueryGPT(g *Graph) (string, error) {
	points := strings.Replace(fmt.Sprint(g.Points), " ", ",", -1)
	parsed := fmt.Sprintf(prompt, g.DescriptionX, g.DescriptionY, points)

	resp, err := gptclient.CreateChatCompletion(
		context.Background(),
		openai.ChatCompletionRequest{
			Model: openai.GPT4oMini,
			Messages: []openai.ChatCompletionMessage{
				{
					Role:    openai.ChatMessageRoleUser,
					Content: parsed,
				},
			},
		},
	)

	if err != nil {
		fmt.Printf("ChatCompletion error: %v\n", err)
		return "", err
	}

	return resp.Choices[0].Message.Content, nil
}
