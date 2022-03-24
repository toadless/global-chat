.ONESHELL: # Make should use 1 shell so directories work as intended
.DELETE_ON_ERROR: # Fail fast if a command fails

ROOT_DIR := $(PWD)

all: clean backend after

clean:
	@echo 'Cleaning up before building...'
	cd $(ROOT_DIR)
	rm -rf build/
	mkdir build/

backend: clean
	@echo 'Building the server'
	cd backend
	npx tsc

after:
	@echo 'Server built! Wrote to dist/'