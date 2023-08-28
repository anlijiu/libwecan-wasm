cmake_minimum_required(VERSION 3.0)

project(LIBWECAN_JS)

set(CMAKE_C_FLAGS "-O3 -Wall")

add_subdirectory(native)

include_directories(native/src)

# add_library(libwecan src/main.c)
add_executable(libwecan src/main.c)
target_link_libraries(libwecan wecan)

set (exported_function_list
  _reset_frame
  _get_frame
  _extract
  _insert
  _insert_s
  _malloc
  _free
)

list(JOIN exported_function_list "," exported_functions)

set (linker_flag_list
  -O3 
  -sSINGLE_FILE=1 
  -sFILESYSTEM=0 
  -sRESERVED_FUNCTION_POINTERS=16 
  -sMODULARIZE=1 
  -sEXPORT_NAME=moduleFactory
  --memory-init-file 0 
  -sEXPORTED_FUNCTIONS=${exported_functions}
  -sEXPORTED_RUNTIME_METHODS=ccall,cwrap,addFunction,removeFunction
  -sMALLOC=emmalloc
)

list(JOIN linker_flag_list " " linker_flags)

# include(CMakePrintHelpers)
# cmake_print_variables(linker_flags)

if(EMSCRIPTEN)
  set(CMAKE_EXE_LINKER_FLAGS ${linker_flags})
endif()
