FROM alpine:latest

MAINTAINER Steven Kissack <stevokk@hotmail.com>

WORKDIR "/opt"

ADD .docker_build/go-netflixplusplus /opt/bin/go-netflixplusplus
ADD ./templates /opt/templates
ADD ./static /opt/static

CMD ["/opt/bin/go-netflixplusplus"]

