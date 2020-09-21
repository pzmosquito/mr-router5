image := mr-router5
container := mr-router5

.PHONY: build
build:
	@docker build --force-rm -t $(image) .

.PHONY: dev
dev:
	@docker run -it --rm -v `pwd`:/usr/app --name $(container) $(image)

.PHONY: stop
stop:
	@docker kill $(container)

.PHONY: shell
shell:
	@docker exec -it $(container) sh

.PHONY: clean
clean:
	@docker rmi $(image)
