NODE_MODULES_BIN=node_modules/.bin
DST_DIR=dst

install:
	npm install

clean:
	rm -rf $(DST_DIR) && mkdir -pv $(DST_DIR)

build:
	$(NODE_MODULES_BIN)/tsc --outDir $(DST_DIR) -d --declarationMap --sourceMap --strict

test: build
	$(NODE_MODULES_BIN)/ava

cleanbuild: clean build
cleantest: cleanbuild test

lint:
	$(NODE_MODULES_BIN)/ts-standard

lintfix:
	$(NODE_MODULES_BIN)/ts-standard --fix
