NAME = xorware

ALL = all
CC = gcc
CFLAGS = -Wall -Wextra

.PHONY = all xorware_0 xorware_1 clean

all: xorware_0 xorware_1

xorware_0: xorware.c
	$(CC) $(CFLAGS) -O0 $^ -o build/$@

xorware_1: xorware.c
	$(CC) $(CFLAGS) -O1 $^ -o build/$@

clean:
	rm build/*
