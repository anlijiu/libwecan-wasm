cmake_minimum_required(VERSION 3.0)
project(libwecan)

if(MSVC)
  set(CMAKE_C_FLAGS "/Ox /W3 /wd4996")
else()
  set(CMAKE_C_FLAGS "-O3 -Wall")
endif()

file(GLOB SOURCES src/*.c src/**/*.c)

include_directories(src)

add_library(wecan STATIC ${SOURCES})
# target_link_libraries(wecan)

add_executable(test_wecan EXCLUDE_FROM_ALL example/test.c)
target_link_libraries(test_wecan wecan)
