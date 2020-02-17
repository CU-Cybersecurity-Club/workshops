#include <stdio.h>
#include <stdlib.h>

#define XOR_BYTE 0x4C

void encrypt_file(char *filename, char xor_byte) {
	int old_byte = 0x0;
	FILE * const f = fopen(filename, "r+"); // Open for reading and writing

	if ( NULL == f ) {
		printf("Unable to open '%s'. Skipping file...", filename);
		return;
	}

	while ( EOF != (old_byte = fgetc(f)) ) {
		// Overwrite byte with XOR_BYTE ^ byte
		const int new_byte = xor_byte ^ old_byte;
		fseek(f, -1, SEEK_CUR);
		fputc(new_byte, f);
	}
}

int main(int argc, char **argv) {
	for ( int ii = 1; ii < argc; ++ii ) {
		encrypt_file(argv[ii], XOR_BYTE);
	}
}
