package main

import (
	"log"
	"math"
	"time"
)

func main() {
	log.Println("Starting program")

	for {

		// Use 100% CPU for 5 seconds
		startTime := time.Now()
		log.Println("Starting CPU-intensive work")
		for time.Since(startTime) < 5*time.Second {
			// Perform a computationally expensive call:
			// the square root of a big number!
			math.Sqrt(999999999)
		}

		// Use less CPU for 5 seconds
		startTime = time.Now()
		log.Println("Starting CPU-light work")
		for time.Since(startTime) < 5*time.Second {
			time.Sleep(1 * time.Second)
		}
	}
}
