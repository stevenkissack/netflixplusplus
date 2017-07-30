FROM alpine:latest

MAINTAINER Steven Kissack <stevokk@hotmail.com>

WORKDIR "/opt"

ADD .docker_build/netflixplusplus /opt/bin/netflixplusplus
ADD ./templates /opt/templates

CMD ["/opt/bin/netflixplusplus"]

