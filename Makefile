NODE_MODULES_BIN=node_modules/.bin
DST_DIR=dst

.PHONY: test

install:
	npm install

cleaninstall:
	npm ci

test:
	$(NODE_MODULES_BIN)/ava

lint:
	$(NODE_MODULES_BIN)/standard

lintfix:
	$(NODE_MODULES_BIN)/standard --fix

wrangler:
	$(NODE_MODULES_BIN)/wrangler $(ARGS)
