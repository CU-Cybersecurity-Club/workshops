NAME = helloworld

ALL = helloworld_c helloworld_cpp
CC = gcc
CXX = g++
CFLAGS = -O0 -Wall -Wextra
CXXFLAGS = -O0 -Wall -Wextra

.PHONY = all clean

all: $(ALL)

helloworld_c: helloworld.c
	$(CC) $(CFLAGS) $^ -o build/$@

helloworld_cpp: helloworld.cpp
	$(CXX) $(CXXFLAGS) $^ -o build/$@

*.c:
*.h:

clean:
	rm ./build/*
