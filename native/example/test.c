#include <string.h>
#include "libwecan.h"

int main(int argc, char ** argv) {

    uint8_t data[64] = {0};
    bzero(data, 64);
    insert(data, 1, 1, 1, MOTOROLA);
    insert(data, 12, 8, 15, MOTOROLA);
    insert(data, 20, 8, 15, MOTOROLA);

    for(int i = 0; i < 63; ++i) {
        printf("%x, ", data[i]);
    }
}
