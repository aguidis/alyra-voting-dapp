#!make

# Executables: local only
TRUFFLE = truffle
NPM = npm

# Misc
.DEFAULT_GOAL = help

## —— React Box Makefile ——————————————————————————————————————————
help: ## Outputs this help screen
	@grep -E '(^[a-zA-Z0-9_-]+:.*?##.*$$)|(^##)' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}{printf "\033[32m%-30s\033[0m %s\n", $$1, $$2}' | sed -e 's/\[32m##/[33m/'

install: ## Install node_modules in root folder and client subfolder
	$(NPM) ci
	cd client && $(NPM) ci

## —— Truffle —————————————————————————————————————————————————————
compile: ## Compile smart contracts located in contracts folder
	$(TRUFFLE) compile

migrate-ganache: ## Deploy contracts locally (You need to have a running Ganache node)
	$(TRUFFLE) migrate --network develop

migrate-ropsten: ## Deploy contracts locally
	$(TRUFFLE) migrate --network ropsten

## —— Dapp ————————————————————————————————————————————————————————
run: ## Start local server
	$(NPM) run start --prefix client

build: ## Prepare assets for production
	$(NPM) run build --prefix client
